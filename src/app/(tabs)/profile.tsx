import { useState, useEffect } from 'react';
import { ScrollView, Platform, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UK = "@stepzo_user_data";
const U = { n: 'Alan', a: 'A', e: 'alan@email.com' };

const stats = [
  { l: 'Total Runs', v: '42', u: 'runs', i: require('@/assets/logo/running.png'), c: '#B7FF3C' },
  { l: 'Distance', v: '186', u: 'km', i: require('@/assets/logo/footsteps.png'), c: '#3B82F6' },
  { l: 'Time', v: '1,420', u: 'min', i: require('@/assets/logo/time.png'), c: '#A855F7' },
  { l: 'Calories', v: '12,800', u: 'kcal', i: require('@/assets/logo/calories.png'), c: '#FF7A00' },
  { l: 'Avg Pace', v: '5:22', u: '/km', i: require('@/assets/logo/achivement.png'), c: '#30D158' },
  { l: 'Best Run', v: '10.2', u: 'km', i: require('@/assets/logo/level-up.png'), c: '#FFD60A' },
];

const menu = [
  { l: 'Account', i: 'person-outline', c: '#3B82F6' },
  { l: 'Achievements', i: 'trophy-outline', c: '#FFD60A' },
  { l: 'Goals', i: 'flag-outline', c: '#30D158' },
  { l: 'Notifications', i: 'notifications-outline', c: '#A855F7' },
  { l: 'Privacy', i: 'lock-closed-outline', c: '#FF7A00' },
  { l: 'Help & Support', i: 'help-circle-outline', c: '#0EA5E9' },
  { l: 'About', i: 'information-circle-outline', c: '#8B5CF6' },
];

const lm: Record<string, string> = { gender: 'Gender', age: 'Age', height: 'Height', weight: 'Weight', frequency: 'Running Frequency', place: 'Terrain' };

export default function ProfileScreen() {
  const t = useTheme();
  const [ud, setUd] = useState<Record<string, string>>({});

  useEffect(() => { AsyncStorage.getItem(UK).then(d => { if (d) setUd(JSON.parse(d)); }); }, []);

  const en = Object.entries(ud).filter(([_, v]) => v);

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 120 : 100 }} showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View className="mx-6 mt-14 rounded-2xl p-5" style={{ backgroundColor: t.card }}>
          <View className="flex-row justify-end mb-1">
            <Pressable className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
              <Ionicons name="settings-outline" size={20} color={t.textSecondary} />
            </Pressable>
          </View>
          <View className="flex-row items-center">
            <View className="w-20 h-20 rounded-full items-center justify-center" style={{ backgroundColor: t.primary }}>
              <ThemedText className="text-3xl font-bold text-white">{U.a}</ThemedText>
            </View>
            <View className="flex-1 ml-4">
              <ThemedText className="text-xl font-bold">{U.n}</ThemedText>
              <ThemedText className="text-[13px] mt-0.5" style={{ color: t.textSecondary }}>{U.e}</ThemedText>
              <Pressable className="mt-2.5 px-4 py-2 rounded-xl self-start" style={{ backgroundColor: '#8B5CF6' }} onPress={() => router.push('/onboarding')}>
                <ThemedText className="text-[13px] font-bold text-white">Edit Profile</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Your Info */}
        {en.length > 0 && (
          <View className="mx-6 mt-4 rounded-2xl p-5" style={{ backgroundColor: t.card }}>
            <ThemedText className="text-[15px] font-bold mb-3">Your Info</ThemedText>
            {en.map(([k, v], i) => (
              <View key={k} className="flex-row items-center py-2.5" style={{ borderBottomWidth: i < en.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.03)' }}>
                <ThemedText className="flex-1 text-[13px]" style={{ color: t.textSecondary }}>{lm[k] || k}</ThemedText>
                <ThemedText className="text-[13px] font-semibold">{v}</ThemedText>
              </View>
            ))}
          </View>
        )}

        {/* Activity Overview */}
        <View className="mx-6 mt-4 rounded-2xl p-5" style={{ backgroundColor: t.card }}>
          <View className="flex-row items-center mb-4">
            <ThemedText className="text-[15px] font-bold flex-1">Activity Overview</ThemedText>
            <ThemedText className="text-[12px]" style={{ color: t.textSecondary }}>All time</ThemedText>
          </View>
          <View className="flex-row flex-wrap">
            {stats.map((s) => (
              <View key={s.l} className="w-1/3 items-center py-2">
                <View className="w-9 h-9 rounded-xl items-center justify-center mb-2" style={{ backgroundColor: `${s.c}15` }}>
                  <Image source={s.i} style={{ width: 20, height: 20 }} />
                </View>
                <ThemedText className="text-[17px] font-bold" style={{ color: s.c }}>{s.v}</ThemedText>
                <ThemedText className="text-[9px] mt-0.5 font-medium" style={{ color: t.textSecondary }}>{s.u}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Menu */}
        <View className="mx-6 mt-4 rounded-2xl overflow-hidden" style={{ backgroundColor: t.card }}>
          {menu.map((item, i) => (
            <Pressable key={item.l} className="flex-row items-center px-5 py-3.5" style={{ borderBottomWidth: i < menu.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.03)' }}>
              <View className="w-8 h-8 rounded-xl items-center justify-center" style={{ backgroundColor: `${item.c}15` }}>
                <Ionicons name={item.i as any} size={16} color={item.c} />
              </View>
              <ThemedText className="flex-1 ml-3 text-[14px]">{item.l}</ThemedText>
              <Ionicons name="chevron-forward" size={16} color={t.textSecondary} />
            </Pressable>
          ))}
        </View>

        {/* Logout */}
        <Pressable onPress={async () => { await AsyncStorage.removeItem('@stepzo_onboarding_done'); router.replace('/login'); }} className="mx-6 mt-5 rounded-2xl py-3.5 flex-row items-center justify-center gap-2" style={{ backgroundColor: t.card }}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <ThemedText className="text-[14px] font-semibold" style={{ color: '#EF4444' }}>Log Out</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}
