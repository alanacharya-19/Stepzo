import { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import MapView, { Polyline } from 'react-native-maps';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';
import { loadRuns } from '@/utils/storage';
import type { RunData, RunPoint } from '@/types';

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

function calcSplits(pts: RunPoint[]): { km: number; time: number; pace: number }[] {
  if (pts.length < 2) return [];
  const splits: { km: number; time: number; pace: number }[] = [];
  let cumDist = 0;
  let lastKm = 0;
  let startT = pts[0].timestamp;
  for (let i = 1; i < pts.length; i++) {
    cumDist += haversine({ lat: pts[i - 1].latitude, lng: pts[i - 1].longitude }, { lat: pts[i].latitude, lng: pts[i].longitude });
    const km = cumDist / 1000;
    if (km >= lastKm + 1) {
      const elapsed = (pts[i].timestamp - startT) / 1000;
      const pace = elapsed / (km - lastKm) / 60;
      splits.push({ km: Math.floor(km), time: elapsed, pace });
      startT = pts[i].timestamp;
      lastKm = Math.floor(km);
    }
  }
  return splits;
}

export default function RunDetailScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [run, setRun] = useState<RunData | null>(null);
  const shotRef = useRef<ViewShot>(null);

  useEffect(() => {
    loadRuns().then((runs) => {
      const found = runs.find((r) => r.id === id);
      if (found) setRun(found);
    });
  }, [id]);

  const handleShare = async () => {
    if (!shotRef.current) return;
    try {
      const uri = await (shotRef.current as any).capture?.();
      if (uri && (await Sharing.isAvailableAsync())) {
        await Sharing.shareAsync(uri, { mimeType: 'image/png' });
      }
    } catch {}
  };

  if (!run) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  const coords = run.coords.map((c) => ({ latitude: c.latitude, longitude: c.longitude }));
  const latSum = run.coords.reduce((s, c) => s + c.latitude, 0);
  const lngSum = run.coords.reduce((s, c) => s + c.longitude, 0);
  const avgLat = latSum / run.coords.length;
  const avgLng = lngSum / run.coords.length;
  const splits = calcSplits(run.coords);

  return (
    <ThemedView className="flex-1">
      <View style={{ height: 300 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{ latitude: avgLat, longitude: avgLng, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
          scrollEnabled={false}
          zoomEnabled={false}
          userInterfaceStyle="dark"
        >
          {coords.length > 1 && (
            <Polyline coordinates={coords} strokeColor={theme.primary} strokeWidth={4} lineJoin="round" lineCap="round" />
          )}
        </MapView>
        <Pressable onPress={() => router.back()} className="absolute top-14 left-5 w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(11,16,32,0.8)' }}>
          <Ionicons name="chevron-back" size={22} color="#FFF" />
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-6 pt-5" showsVerticalScrollIndicator={false}>
        <ViewShot ref={shotRef} options={{ format: 'png', quality: 1 }} style={{ flex: 1 }}>
          <View className="flex-row items-center mb-1">
            <ThemedText className="text-[20px] font-bold flex-1">{run.title}</ThemedText>
          </View>
          <ThemedText className="text-[13px] mb-5" style={{ color: theme.textSecondary }}>{run.date}</ThemedText>

          <View className="flex-row rounded-2xl py-4 px-3" style={{ backgroundColor: theme.card }}>
            {[
              { label: 'Distance', value: `${run.distance.toFixed(2)} km` },
              { label: 'Duration', value: fmtTime(run.duration) },
              { label: 'Avg Pace', value: `${Math.floor(60 / (run.pace || 1))}:${(Math.floor((60 / (run.pace || 1)) % 1 * 60)).toString().padStart(2, '0')}` },
            ].map((s, i) => (
              <View key={s.label} className="flex-1 items-center" style={{ borderRightWidth: i < 2 ? 1 : 0, borderRightColor: 'rgba(255,255,255,0.06)' }}>
                <ThemedText className="text-[10px] mb-1.5" style={{ color: theme.textSecondary }}>{s.label}</ThemedText>
                <ThemedText className="text-[14px] font-bold text-white">{s.value}</ThemedText>
              </View>
            ))}
          </View>

          {splits.length > 0 && (
            <View className="mt-5 rounded-2xl overflow-hidden" style={{ backgroundColor: theme.card }}>
              <View className="px-5 pt-4 pb-2">
                <ThemedText className="text-[15px] font-bold">Splits</ThemedText>
              </View>
              {splits.map((s, i) => (
                <View key={i} className="flex-row items-center px-5 py-3" style={{ borderBottomWidth: i < splits.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.03)' }}>
                  <View className="w-8 h-8 rounded-full items-center justify-center mr-3" style={{ backgroundColor: `${theme.primary}12` }}>
                    <ThemedText className="text-[11px] font-bold" style={{ color: theme.primary }}>{s.km}</ThemedText>
                  </View>
                  <View className="flex-1">
                    <ThemedText className="text-[13px] font-semibold">Kilometer {s.km}</ThemedText>
                    <ThemedText className="text-[10px]" style={{ color: theme.textSecondary }}>{fmtTime(s.time)}</ThemedText>
                  </View>
                  <ThemedText className="text-[13px] font-semibold">{Math.floor(s.pace)}:{Math.floor((s.pace % 1) * 60).toString().padStart(2, '0')} /km</ThemedText>
                </View>
              ))}
            </View>
          )}
        </ViewShot>

        <Pressable onPress={handleShare} className="mt-5 flex-row items-center justify-center gap-2 rounded-2xl py-3.5" style={{ backgroundColor: theme.card }}>
          <Ionicons name="share-outline" size={18} color={theme.primary} />
          <ThemedText className="text-[14px] font-semibold" style={{ color: theme.primary }}>Share Run</ThemedText>
        </Pressable>

        <View className="h-8" />
      </ScrollView>
    </ThemedView>
  );
}
