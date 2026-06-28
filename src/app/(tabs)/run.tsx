import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Pressable } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';
import type { RunPoint, RunData } from '@/types';
import { saveRun } from '@/utils/storage';

function haversine(c1: { lat: number; lng: number }, c2: { lat: number; lng: number }) {
  const R = 6371000;
  const dLat = (c2.lat - c1.lat) * Math.PI / 180;
  const dLng = (c2.lng - c1.lng) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function fmtPace(kmh: number) {
  if (kmh <= 0) return '0:00';
  const minPerKm = 60 / kmh;
  const m = Math.floor(minPerKm);
  const sec = Math.floor((minPerKm - m) * 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function runTitle() {
  const h = new Date().getHours();
  if (h < 12) return 'Morning Run';
  if (h < 17) return 'Afternoon Run';
  if (h < 21) return 'Evening Run';
  return 'Night Run';
}

function speakSplit(km: number, seconds: number) {
  const m = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  Speech.speak(`Kilometer ${km} in ${m} minutes ${sec} seconds`, { rate: 0.85 });
}

type RunState = 'idle' | 'running' | 'paused' | 'stopped';

export default function RunScreen() {
  const theme = useTheme();
  const mapRef = useRef<MapView>(null);
  const watchRef = useRef<Location.LocationSubscription | null>(null);
  const startTimeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const distRef = useRef(0);
  const prevRef = useRef<{ lat: number; lng: number } | null>(null);
  const coordsRef = useRef<RunPoint[]>([]);
  const pauseOffsetRef = useRef(0);
  const pauseStartRef = useRef(0);
  const lastKmRef = useRef(0);

  const stateRef = useRef<RunState>('idle');
  const elapsedRef = useRef(0);

  const [state, setState] = useState<RunState>('idle');
  const [coords, setCoords] = useState<RunPoint[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [pace, setPace] = useState(0);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      const sec = (Date.now() - startTimeRef.current - pauseOffsetRef.current) / 1000;
      elapsedRef.current = sec;
      setElapsed(sec);
      const km = distRef.current / 1000;
      setDistance(km);
      setPace(sec > 0 ? km / (sec / 3600) : 0);
    }, 1000);
  };

  const startWatcher = async () => {
    watchRef.current = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 3, timeInterval: 3000 },
      (loc) => {
        const { latitude, longitude } = loc.coords;
        const pt: RunPoint = { latitude, longitude, timestamp: Date.now() };
        coordsRef.current.push(pt);
        setCoords([...coordsRef.current]);
        if (prevRef.current) {
          const seg = haversine(prevRef.current, { lat: latitude, lng: longitude });
          distRef.current += seg;
          const totalKm = distRef.current / 1000;
          const kmMark = Math.floor(totalKm);
          if (kmMark > lastKmRef.current) {
            lastKmRef.current = kmMark;
            const splitSec = (Date.now() - startTimeRef.current - pauseOffsetRef.current) / 1000;
            speakSplit(kmMark, splitSec);
          }
        }
        prevRef.current = { lat: latitude, lng: longitude };
        if (mapRef.current) {
          mapRef.current.animateToRegion({ latitude, longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 }, 1000);
        }
        setInitialRegion((prev) => ({ ...prev, latitude, longitude }));
      }
    );
  };

  const startRun = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    setState('running');
    stateRef.current = 'running';
    setCoords([]);
    setElapsed(0);
    setDistance(0);
    setPace(0);
    distRef.current = 0;
    prevRef.current = null;
    coordsRef.current = [];
    pauseOffsetRef.current = 0;
    lastKmRef.current = 0;
    startTimeRef.current = Date.now();

    startTimer();
    await startWatcher();
  };

  const pauseRun = useCallback(() => {
    if (watchRef.current) watchRef.current.remove();
    watchRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    pauseStartRef.current = Date.now();
    setState('paused');
    stateRef.current = 'paused';
  }, []);

  const resumeRun = useCallback(async () => {
    pauseOffsetRef.current += Date.now() - pauseStartRef.current;
    startTimer();
    await startWatcher();
    setState('running');
    stateRef.current = 'running';
  }, []);

  const saveCurrentRun = useCallback(() => {
    const pts = coordsRef.current;
    if (pts.length < 2) return;
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const mn = now.getMinutes().toString().padStart(2, '0');
    const d = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const sec = elapsedRef.current;
    const distKm = distRef.current / 1000;
    const run: RunData = {
      id: Date.now().toString(),
      title: pts.length > 10 ? runTitle() : 'Quick Walk',
      date: `${d} at ${h}:${mn}`,
      distance: distKm,
      duration: sec,
      pace: sec > 0 ? distKm / (sec / 3600) : 0,
      coords: pts,
    };
    saveRun(run);
  }, []);

  const stopRun = useCallback(() => {
    if (watchRef.current) watchRef.current.remove();
    if (timerRef.current) clearInterval(timerRef.current);
    watchRef.current = null;
    timerRef.current = null;

    saveCurrentRun();
    setState('stopped');
    stateRef.current = 'stopped';
  }, [saveCurrentRun]);

  const resetRun = useCallback(() => {
    setCoords([]);
    setElapsed(0);
    setDistance(0);
    setPace(0);
    distRef.current = 0;
    prevRef.current = null;
    coordsRef.current = [];
    pauseOffsetRef.current = 0;
    lastKmRef.current = 0;
    setState('idle');
  }, []);

  useEffect(() => {
    return () => {
      if (watchRef.current) watchRef.current.remove();
      if (timerRef.current) clearInterval(timerRef.current);
      if (stateRef.current === 'running' || stateRef.current === 'paused') {
        saveCurrentRun();
      }
    };
  }, [saveCurrentRun]);

  if (state === 'idle') {
    return (
      <ThemedView className="flex-1 items-center justify-center px-8">
        <View className="w-24 h-24 rounded-2xl items-center justify-center mb-6" style={{ backgroundColor: `${theme.primary}12` }}>
          <Image source={require('@/assets/logo/running.png')} style={{ width: 44, height: 44, tintColor: theme.primary }} />
        </View>
        <ThemedText className="text-[26px] font-bold tracking-tight mb-2">Ready to Run?</ThemedText>
        <ThemedText className="text-[14px] text-center leading-6" style={{ color: theme.textSecondary, maxWidth: 260 }}>
          Start tracking your run and see your progress in real-time.
        </ThemedText>
        <Pressable
          onPress={startRun}
          className="mt-10 w-full py-3.5 rounded-xl items-center"
          style={{ maxWidth: 220, backgroundColor: theme.primary }}
        >
          <ThemedText className="text-[16px] font-bold" style={{ color: '#0B1020' }}>Start Run</ThemedText>
        </Pressable>
        <View className="flex-row gap-6 mt-8">
          {[{ v: '5.2', u: 'km', l: 'Best' }, { v: '28', u: 'min', l: 'Last' }, { v: '340', u: 'kcal', l: 'Avg' }].map((s) => (
            <View key={s.l} className="items-center">
              <ThemedText className="text-[18px] font-bold text-white">{s.v}</ThemedText>
              <ThemedText className="text-[10px] mt-1" style={{ color: theme.textSecondary }}>{s.u}</ThemedText>
              <ThemedText className="text-[10px] font-medium" style={{ color: theme.textSecondary }}>{s.l}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1">
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton={false}
        userInterfaceStyle="dark"
      >
        {coords.length > 1 && (
          <Polyline coordinates={coords} strokeColor={theme.primary} strokeWidth={4} lineJoin="round" lineCap="round" />
        )}
      </MapView>

      {/* Stats pill */}
      <View className="absolute top-16 left-6 right-6 flex-row rounded-2xl py-4 px-5" style={{ backgroundColor: 'rgba(11,16,32,0.88)' }}>
        {[
          { label: 'Time', value: fmtTime(elapsed), icon: 'time-outline' as const },
          { label: 'Distance', value: `${distance.toFixed(1)}`, unit: 'km', icon: 'map-outline' as const },
          { label: 'Pace', value: fmtPace(pace), unit: '/km', icon: 'speedometer-outline' as const },
        ].map((s, i) => (
          <View key={s.label} className="flex-1 items-center" style={{ borderRightWidth: i < 2 ? 1 : 0, borderRightColor: 'rgba(255,255,255,0.06)' }}>
            <View className="flex-row items-center gap-1 mb-1">
              <Ionicons name={s.icon} size={12} color={theme.textSecondary} />
              <ThemedText className="text-[10px]" style={{ color: theme.textSecondary }}>{s.label}</ThemedText>
            </View>
            <ThemedText className="text-[20px] font-bold tracking-tight text-white">{s.value}</ThemedText>
            {s.unit && <ThemedText className="text-[9px]" style={{ color: theme.textSecondary }}>{s.unit}</ThemedText>}
          </View>
        ))}
      </View>

      {/* Pause overlay */}
      {state === 'paused' && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,16,32,0.75)', alignItems: 'center', justifyContent: 'center' }}>
          <View className="w-20 h-20 rounded-2xl items-center justify-center mb-4" style={{ backgroundColor: `${theme.primary}12` }}>
            <Ionicons name="pause" size={36} color={theme.primary} />
          </View>
          <ThemedText className="text-[22px] font-bold mb-1">Run Paused</ThemedText>
          <ThemedText className="text-[13px] mb-8" style={{ color: theme.textSecondary }}>Take a breather, then pick up where you left off</ThemedText>
          <Pressable onPress={resumeRun} className="w-16 h-16 rounded-full items-center justify-center" style={{ backgroundColor: theme.primary }}>
            <Ionicons name="play" size={28} color="#0B1020" />
          </Pressable>
        </View>
      )}

      {/* Bottom controls */}
      {state === 'running' && (
        <View className="absolute left-0 right-0 items-center" style={{ bottom: 140 }}>
          <View className="flex-row items-center gap-6">
            <Pressable onPress={pauseRun} className="w-16 h-16 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <Ionicons name="pause" size={28} color="#FFF" />
            </Pressable>
            <Pressable onPress={stopRun} className="w-16 h-16 rounded-full items-center justify-center" style={{ backgroundColor: '#EF4444' }}>
              <Ionicons name="stop" size={28} color="#FFF" />
            </Pressable>
          </View>
        </View>
      )}

      {/* Run summary */}
      {state === 'stopped' && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,16,32,0.85)', alignItems: 'center', justifyContent: 'center' }}>
          <View className="w-full px-8">
            <View className="items-center mb-8">
              <View className="w-16 h-16 rounded-2xl items-center justify-center mb-4" style={{ backgroundColor: `${theme.primary}12` }}>
                <Ionicons name="checkmark-circle" size={32} color={theme.primary} />
              </View>
              <ThemedText className="text-[22px] font-bold">Run Complete</ThemedText>
              <ThemedText className="text-[13px] mt-1" style={{ color: theme.textSecondary }}>Great effort! Here's your summary</ThemedText>
            </View>
            <View className="flex-row rounded-2xl py-5 px-4" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
              {[
                { label: 'Time', value: fmtTime(elapsed) },
                { label: 'Distance', value: `${distance.toFixed(2)} km` },
                { label: 'Pace', value: fmtPace(pace) },
              ].map((s, i) => (
                <View key={s.label} className="flex-1 items-center" style={{ borderRightWidth: i < 2 ? 1 : 0, borderRightColor: 'rgba(255,255,255,0.06)' }}>
                  <ThemedText className="text-[10px] mb-1.5" style={{ color: theme.textSecondary }}>{s.label}</ThemedText>
                  <ThemedText className="text-[18px] font-bold text-white">{s.value}</ThemedText>
                </View>
              ))}
            </View>
            <Pressable onPress={resetRun} className="mt-8 w-full py-3.5 rounded-xl items-center" style={{ backgroundColor: theme.primary }}>
              <ThemedText className="text-[16px] font-bold" style={{ color: '#0B1020' }}>Done</ThemedText>
            </Pressable>
          </View>
        </View>
      )}
    </ThemedView>
  );
}
