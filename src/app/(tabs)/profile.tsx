import { useState, useEffect } from 'react';
import { ScrollView, Platform, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_KEY = "@stepzo_user_data";
const MOCK_USER = { name: 'Alan', avatarInitial: 'A', email: 'alan@email.com' };
const LABEL_MAP: Record<string, string> = { gender: 'Gender', age: 'Age', height: 'Height', weight: 'Weight', frequency: 'Running Frequency', place: 'Terrain' };

const ALL_TIME_STATS = [
  { label: 'Total Runs', value: '42', unit: 'runs', icon: require('@/assets/logo/running.png'), color: '#B7FF3C' },
  { label: 'Distance', value: '186', unit: 'km', icon: require('@/assets/logo/footsteps.png'), color: '#3B82F6' },
  { label: 'Time', value: '1,420', unit: 'min', icon: require('@/assets/logo/time.png'), color: '#A855F7' },
  { label: 'Calories', value: '12,800', unit: 'kcal', icon: require('@/assets/logo/calories.png'), color: '#FF7A00' },
  { label: 'Avg Pace', value: '5:22', unit: '/km', icon: require('@/assets/logo/achivement.png'), color: '#30D158' },
  { label: 'Best Run', value: '10.2', unit: 'km', icon: require('@/assets/logo/level-up.png'), color: '#FFD60A' },
];

const MENU_ITEMS = [
  { label: 'Account', icon: 'person-outline', bg: '#3B82F6' },
  { label: 'Achievements', icon: 'trophy-outline', bg: '#FFD60A' },
  { label: 'Goals', icon: 'flag-outline', bg: '#30D158' },
  { label: 'Notifications', icon: 'notifications-outline', bg: '#A855F7' },
  { label: 'Privacy', icon: 'lock-closed-outline', bg: '#FF7A00' },
  { label: 'Help & Support', icon: 'help-circle-outline', bg: '#0EA5E9' },
  { label: 'About', icon: 'information-circle-outline', bg: '#8B5CF6' },
];

export default function ProfileScreen() {
  const theme = useTheme();
  const [userData, setUserData] = useState<Record<string, string>>({});

  useEffect(() => {
    AsyncStorage.getItem(USER_DATA_KEY).then((data) => { if (data) setUserData(JSON.parse(data)); });
  }, []);

  const entries = Object.entries(userData).filter(([_, v]) => v);

  return (
    <ThemedView className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 120 : 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile */}
        <View className="mx-5 mt-14 rounded-3xl p-5" style={{ backgroundColor: theme.card }}>
          <View className="flex-row justify-end mb-1">
            <Pressable className="w-9 h-9 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
              <Ionicons name="settings-outline" size={20} color={theme.textSecondary} />
            </Pressable>
          </View>
          <View className="flex-row items-center">
            <View className="w-20 h-20 rounded-full items-center justify-center" style={{ backgroundColor: theme.primary }}>
              <ThemedText className="text-3xl font-bold text-white">{MOCK_USER.avatarInitial}</ThemedText>
            </View>
            <View className="flex-1 ml-4">
              <ThemedText className="text-xl font-bold">{MOCK_USER.name}</ThemedText>
              <ThemedText className="text-[13px] mt-0.5" style={{ color: theme.textSecondary }}>{MOCK_USER.email}</ThemedText>
              <Pressable className="mt-2.5 px-4 py-2 rounded-xl self-start" style={{ backgroundColor: '#8B5CF6' }} onPress={() => router.push('/onboarding')}>
                <ThemedText className="text-[13px] font-bold text-white">Edit Profile</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Your Info */}
        {entries.length > 0 && (
          <View className="mx-5 mt-4 rounded-3xl p-5" style={{ backgroundColor: theme.card }}>
            <View className="flex-row items-center mb-3">
              <View className="w-1 h-5 rounded-full mr-2.5" style={{ backgroundColor: theme.primary }} />
              <ThemedText className="text-lg font-bold flex-1">Your Info</ThemedText>
            </View>
            {entries.map(([key, val], i) => (
              <View key={key} className="flex-row items-center py-2.5" style={{ borderBottomWidth: i < entries.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.04)' }}>
                <ThemedText className="flex-1 text-[14px]" style={{ color: theme.textSecondary }}>{LABEL_MAP[key] || key}</ThemedText>
                <ThemedText className="text-[14px] font-semibold">{val}</ThemedText>
              </View>
            ))}
          </View>
        )}

        {/* Activity Overview */}
        <View className="mx-5 mt-4 rounded-3xl p-5" style={{ backgroundColor: theme.card }}>
          <View className="flex-row items-center mb-4">
            <View className="w-1 h-5 rounded-full mr-2.5" style={{ backgroundColor: theme.primary }} />
            <ThemedText className="text-lg font-bold flex-1">Activity Overview</ThemedText>
            <ThemedText className="text-[12px]" style={{ color: theme.textSecondary }}>All time</ThemedText>
          </View>
          <View className="flex-row flex-wrap">
            {ALL_TIME_STATS.map((s) => (
              <View key={s.label} className="w-1/3 items-center py-2">
                <View className="w-10 h-10 rounded-2xl items-center justify-center mb-2" style={{ backgroundColor: `${s.color}18` }}>
                  <Image source={s.icon} style={{ width: 22, height: 22 }} />
                </View>
                <ThemedText className="text-lg font-extrabold" style={{ color: s.color }}>{s.value}</ThemedText>
                <ThemedText className="text-[10px] mt-0.5 font-medium" style={{ color: theme.textSecondary }}>{s.unit}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Menu */}
        <View className="mx-5 mt-4 rounded-3xl overflow-hidden" style={{ backgroundColor: theme.card }}>
          {MENU_ITEMS.map((item, i) => (
            <Pressable key={item.label} className="flex-row items-center px-5 py-3.5" style={{ borderBottomWidth: i < MENU_ITEMS.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.04)' }}>
              <View className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: `${item.bg}20` }}>
                <Ionicons name={item.icon as any} size={18} color={item.bg} />
              </View>
              <ThemedText className="flex-1 ml-3.5 text-[15px]">{item.label}</ThemedText>
              <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
            </Pressable>
          ))}
        </View>

        {/* Logout */}
        <Pressable onPress={async () => { await AsyncStorage.removeItem('@stepzo_onboarding_done'); router.replace('/login'); }} className="mx-5 mt-5 rounded-3xl py-4 flex-row items-center justify-center gap-2" style={{ backgroundColor: theme.card }}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <ThemedText className="text-[15px] font-semibold" style={{ color: '#EF4444' }}>Log Out</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}
