import { useState, useEffect, useRef } from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from "@expo/vector-icons";
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
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locState, setLocState] = useState<'loading' | 'noPermission' | 'deviceDisabled' | 'ready'>('loading');
  const [requesting, setRequesting] = useState(false);

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
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocState('noPermission');
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
        </MapView>

        {overlayState && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,16,32,0.75)', alignItems: 'center', justifyContent: 'center' }}>
            <View className="items-center px-8">
              <View className="w-16 h-16 rounded-2xl items-center justify-center mb-4" style={{ backgroundColor: `${theme.primary}12` }}>
                <Ionicons name={overlayContent.icon} size={28} color={theme.primary} />
              </View>
              <ThemedText className="text-[18px] font-bold mb-1.5">{overlayContent.title}</ThemedText>
              <ThemedText className="text-[13px] text-center leading-5 mb-6" style={{ color: theme.textSecondary }}>{overlayContent.desc}</ThemedText>
              <Pressable
                onPress={requestLocation}
                disabled={requesting}
                className="px-8 py-3.5 rounded-xl"
                style={{ backgroundColor: theme.primary, opacity: requesting ? 0.6 : 1 }}
              >
                <ThemedText className="text-[15px] font-bold" style={{ color: '#0B1020' }}>{requesting ? 'Please wait...' : overlayContent.btn}</ThemedText>
              </Pressable>
            </View>
          </View>
        )}
      </View>
      <View className="flex-1 rounded-t-3xl -mt-5 px-6 pt-6" style={{ backgroundColor: theme.background }}>
        <View className="flex-row items-center mb-5">
          <ThemedText className="text-[17px] font-bold flex-1">Recent Activities</ThemedText>
          <Pressable>
            <ThemedText className="text-[13px]" style={{ color: theme.primary }}>See All</ThemedText>
          </Pressable>
        </View>
        {RECENT_RUNS.map((r, i) => {
          const icon = r.type === 'run' ? runPng : walkPng;
          const tint = r.type === 'run' ? '#B7FF3C' : '#30D158';
          return (
            <View key={r.id} className="flex-row items-center py-3" style={{ borderBottomWidth: i < RECENT_RUNS.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.03)' }}>
              <View className="w-9 h-9 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: `${tint}12` }}>
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
