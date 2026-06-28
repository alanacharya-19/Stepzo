import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Pressable, Dimensions, Linking } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';
import { loadRuns } from '@/utils/storage';
import type { RunData } from '@/types';

const { height: SCREEN_H } = Dimensions.get('window');

const runPng = require('@/assets/logo/running.png');
const walkPng = require('@/assets/logo/walking.png');

const ROUTE_COLORS = ['#B7FF3C', '#3B82F6', '#A855F7', '#FF7A00', '#30D158', '#FFD60A', '#FF3B5C', '#00D4FF'];

export default function TerritoryScreen() {
  const theme = useTheme();
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locState, setLocState] = useState<'loading' | 'noPermission' | 'denied' | 'deviceDisabled' | 'ready'>('loading');
  const [requesting, setRequesting] = useState(false);
  const [runs, setRuns] = useState<RunData[]>([]);
  const [showRoutes, setShowRoutes] = useState(true);

  useFocusEffect(useCallback(() => {
    loadRuns().then(setRuns);
  }, []));

  const getPosition = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
      setLocState('ready');
    } catch {
      setLocState('deviceDisabled');
    }
  };

  const requestLocation = async () => {
    setRequesting(true);
    try {
      setLocState('loading');
      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocState(canAskAgain ? 'noPermission' : 'denied');
        setRequesting(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
      setLocState('ready');
    } catch {
      setLocState('deviceDisabled');
    }
    setRequesting(false);
  };

  useEffect(() => { requestLocation(); }, []);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 800);
    }
  }, [location]);

  const region = location
    ? { latitude: location.lat, longitude: location.lng, latitudeDelta: 0.01, longitudeDelta: 0.01 }
    : { latitude: 40.7128, longitude: -74.006, latitudeDelta: 0.05, longitudeDelta: 0.05 };

  const overlayState = locState !== 'ready' && locState !== 'loading' ? locState : null;

  const overlayContent = overlayState === 'noPermission' ? {
    icon: 'location-outline' as const,
    title: 'Location Access',
    desc: 'Enable location to see your position on the map and track your runs.',
    btn: 'Enable Location',
  } : overlayState === 'denied' ? {
    icon: 'lock-closed-outline' as const,
    title: 'Location Access Denied',
    desc: 'You permanently denied location access. Update your settings to use this feature.',
    btn: 'Open Settings',
  } : {
    icon: 'locate-outline' as const,
    title: 'Location Services Off',
    desc: 'Turn on device location settings to use the map and track your runs.',
    btn: 'Turn On Location',
  };

  return (
    <ThemedView className="flex-1">
      <View style={{ height: SCREEN_H * 0.5 }}>
        <MapView ref={mapRef} style={{ flex: 1 }} initialRegion={region} showsUserLocation={locState === 'ready'} showsMyLocationButton={locState === 'ready'} userInterfaceStyle="dark">
          {location && <Marker coordinate={{ latitude: location.lat, longitude: location.lng }} title="You" />}
          {showRoutes && runs.map((r, i) => {
            if (r.coords.length < 2) return null;
            const coords = r.coords.map((c) => ({ latitude: c.latitude, longitude: c.longitude }));
            return (
              <Polyline
                key={r.id}
                coordinates={coords}
                strokeColor={ROUTE_COLORS[i % ROUTE_COLORS.length]}
                strokeWidth={3}
                lineJoin="round"
                lineCap="round"
                opacity={0.6}
              />
            );
          })}
        </MapView>

        {/* Route toggle */}
        {runs.length > 0 && locState === 'ready' && (
          <Pressable
            onPress={() => setShowRoutes((v) => !v)}
            className="absolute top-14 right-5 w-10 h-10 rounded-xl items-center justify-center"
            style={{ backgroundColor: showRoutes ? theme.primary : 'rgba(11,16,32,0.8)' }}
          >
            <Ionicons name="layers-outline" size={20} color={showRoutes ? '#0B1020' : '#FFF'} />
          </Pressable>
        )}

        {overlayState && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,16,32,0.75)', alignItems: 'center', justifyContent: 'center' }}>
            <View className="items-center px-8">
              <View className="w-16 h-16 rounded-2xl items-center justify-center mb-4" style={{ backgroundColor: `${theme.primary}12` }}>
                <Ionicons name={overlayContent.icon} size={28} color={theme.primary} />
              </View>
              <ThemedText className="text-[18px] font-bold mb-1.5">{overlayContent.title}</ThemedText>
              <ThemedText className="text-[13px] text-center leading-5 mb-6" style={{ color: theme.textSecondary }}>{overlayContent.desc}</ThemedText>
              <Pressable onPress={overlayState === 'denied' ? Linking.openSettings : requestLocation} disabled={requesting && overlayState !== 'denied'} className="px-8 py-3.5 rounded-xl" style={{ backgroundColor: theme.primary, opacity: requesting && overlayState !== 'denied' ? 0.6 : 1 }}>
                <ThemedText className="text-[15px] font-bold" style={{ color: '#0B1020' }}>{requesting && overlayState !== 'denied' ? 'Please wait...' : overlayContent.btn}</ThemedText>
              </Pressable>
            </View>
          </View>
        )}
      </View>
      <View className="flex-1 rounded-t-3xl -mt-5 px-6 pt-6" style={{ backgroundColor: theme.background }}>
        <View className="flex-row items-center mb-5">
          <ThemedText className="text-[17px] font-bold flex-1">Recent Activities</ThemedText>
        </View>
        {runs.length === 0 ? (
          <ThemedText className="text-[13px] text-center py-6" style={{ color: theme.textSecondary }}>No activities yet</ThemedText>
        ) : (
          runs.slice(0, 10).map((r, i) => (
            <View key={r.id} className="flex-row items-center py-3" style={{ borderBottomWidth: i < Math.min(runs.length, 10) - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.03)' }}>
              <View className="w-9 h-9 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: `${theme.primary}12` }}>
                <Image source={r.distance > 2 ? runPng : walkPng} style={{ width: 20, height: 20 }} />
              </View>
              <View className="flex-1">
                <ThemedText className="text-[14px] font-semibold">{r.title}</ThemedText>
                <View className="flex-row items-center gap-3 mt-0.5">
                  <ThemedText className="text-[11px]" themeColor="textSecondary">{r.distance.toFixed(1)} km</ThemedText>
                  <ThemedText className="text-[11px]" themeColor="textSecondary">{Math.round(r.duration / 60)} min</ThemedText>
                </View>
              </View>
              <ThemedText className="text-[11px]" style={{ color: theme.textSecondary }}>{r.date}</ThemedText>
            </View>
          ))
        )}
      </View>
    </ThemedView>
  );
}
