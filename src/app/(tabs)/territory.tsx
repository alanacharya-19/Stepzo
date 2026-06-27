import { useState, useEffect } from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';

const { height: SCREEN_H } = Dimensions.get('window');

const RECENT_RUNS = [
  { id: '1', title: 'Morning Run', distance: '5.2', time: '28', date: 'Today', type: 'run' },
  { id: '2', title: 'Evening Walk', distance: '3.8', time: '20', date: 'Yesterday', type: 'walk' },
  { id: '3', title: 'Afternoon Run', distance: '6.1', time: '33', date: 'Jun 23', type: 'run' },
  { id: '4', title: 'Night Walk', distance: '2.4', time: '15', date: 'Jun 21', type: 'walk' },
];

const runPng = require('@/assets/logo/running.png');
const walkPng = require('@/assets/logo/walking.png');

export default function TerritoryScreen() {
  const theme = useTheme();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [permitted, setPermitted] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      setPermitted(true);
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
    })();
  }, []);

  const region = location
    ? { latitude: location.lat, longitude: location.lng, latitudeDelta: 0.01, longitudeDelta: 0.01 }
    : { latitude: 40.7128, longitude: -74.006, latitudeDelta: 0.05, longitudeDelta: 0.05 };

  return (
    <ThemedView className="flex-1">
      <View style={{ height: SCREEN_H * 0.55 }}>
        <MapView style={{ flex: 1 }} initialRegion={region} showsUserLocation={permitted} showsMyLocationButton={permitted} userInterfaceStyle="dark">
          {location && <Marker coordinate={{ latitude: location.lat, longitude: location.lng }} title="You" />}
        </MapView>
      </View>

      <View className="flex-1 rounded-t-3xl -mt-5 px-5 pt-5" style={{ backgroundColor: theme.background }}>
        <View className="flex-row items-center mb-4">
          <View className="w-1 h-5 rounded-full mr-2.5" style={{ backgroundColor: theme.primary }} />
          <ThemedText className="text-lg font-bold flex-1">Recent Activities</ThemedText>
          <Pressable>
            <ThemedText className="text-[13px] font-semibold" style={{ color: theme.primary }}>See All</ThemedText>
          </Pressable>
        </View>
        {RECENT_RUNS.map((r, i) => {
          const icon = r.type === 'run' ? runPng : walkPng;
          const tint = r.type === 'run' ? '#B7FF3C' : '#30D158';
          return (
            <View key={r.id} className="flex-row items-center py-3.5" style={{ borderBottomWidth: i < RECENT_RUNS.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.04)' }}>
              <View className="w-9 h-9 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: `${tint}18` }}>
                <Image source={icon} style={{ width: 20, height: 20 }} />
              </View>
              <View className="flex-1">
                <ThemedText className="text-[14px] font-semibold">{r.title}</ThemedText>
                <View className="flex-row items-center gap-3 mt-0.5">
                  <ThemedText className="text-[11px]" themeColor="textSecondary">{r.distance} km</ThemedText>
                  <ThemedText className="text-[11px]" themeColor="textSecondary">{r.time} min</ThemedText>
                </View>
              </View>
              <ThemedText className="text-[11px]" style={{ color: theme.textSecondary }}>{r.date}</ThemedText>
            </View>
          );
        })}
      </View>
    </ThemedView>
  );
}
