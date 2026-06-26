import { ScrollView, Platform, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MOCK_USER = {
  name: 'Alan',
  avatarInitial: 'A',
  email: 'alan@email.com',
};

const ALL_TIME_STATS = [
  { label: 'Total Runs', value: '42', unit: 'runs', icon: require('@/assets/logo/running.png'), color: '#B7FF3C' },
  { label: 'Distance', value: '186', unit: 'km', icon: require('@/assets/logo/footsteps.png'), color: '#3B82F6' },
  { label: 'Time', value: '1,420', unit: 'min', icon: require('@/assets/logo/time.png'), color: '#A855F7' },
  { label: 'Calories', value: '12,800', unit: 'kcal', icon: require('@/assets/logo/calories.png'), color: '#FF7A00' },
  { label: 'Avg Pace', value: '5:22', unit: '/km', icon: require('@/assets/logo/achivement.png'), color: '#30D158' },
  { label: 'Best Run', value: '10.2', unit: 'km', icon: require('@/assets/logo/level-up.png'), color: '#FFD60A' },
];

const MENU_ICONS: Record<string, { bg: string }> = {
  'person-outline': { bg: '#3B82F6' },
  'trophy-outline': { bg: '#FFD60A' },
  'flag-outline': { bg: '#30D158' },
  'notifications-outline': { bg: '#A855F7' },
  'lock-closed-outline': { bg: '#FF7A00' },
  'help-circle-outline': { bg: '#0EA5E9' },
  'information-circle-outline': { bg: '#8B5CF6' },
};

const MENU_ITEMS = [
  { label: 'Account', icon: 'person-outline' },
  { label: 'Achievements', icon: 'trophy-outline' },
  { label: 'Goals', icon: 'flag-outline' },
  { label: 'Notifications', icon: 'notifications-outline' },
  { label: 'Privacy', icon: 'lock-closed-outline' },
  { label: 'Help & Support', icon: 'help-circle-outline' },
  { label: 'About', icon: 'information-circle-outline' },
];

export default function ProfileScreen() {
  const theme = useTheme();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@stepzo_onboarding_done');
    router.replace('/login');
  };

  return (
    <ThemedView className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 120 : 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Decorative top gradient */}
        <View className="absolute top-0 left-0 right-0 h-48" style={{ overflow: 'hidden' }}>
          <LinearGradient
            colors={['rgba(183,255,60,0.12)', 'transparent']}
            locations={[0, 1]}
            style={{ flex: 1 }}
          />
        </View>

        {/* Profile Card */}
        <View className="mx-5 mt-14 rounded-3xl p-5" style={{ backgroundColor: theme.card }}>
          <View className="flex-row justify-end mb-1">
            <Pressable className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
              <Ionicons name="settings-outline" size={22} color={theme.textSecondary} />
            </Pressable>
          </View>
          <View className="flex-row items-center">
            <View className="w-20 h-20 rounded-full items-center justify-center" style={{ backgroundColor: theme.primary }}>
              <ThemedText className="text-3xl font-bold text-white">{MOCK_USER.avatarInitial}</ThemedText>
            </View>
            <View className="flex-1 ml-4">
              <ThemedText className="text-xl font-bold">{MOCK_USER.name}</ThemedText>
              <ThemedText className="text-[13px] mt-0.5" style={{ color: theme.textSecondary }}>{MOCK_USER.email}</ThemedText>
              <Pressable className="mt-2.5 px-4 py-2 rounded-xl self-start" style={{ backgroundColor: '#8B5CF6' }}>
                <ThemedText className="text-[13px] font-bold text-white">Edit Profile</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Activity Overview */}
        <View className="mx-5 mt-5 rounded-3xl overflow-hidden" style={{ backgroundColor: theme.card }}>
          <View className="flex-row items-center gap-2.5 px-5 pt-5 pb-3">
            <View className="w-1 h-5 rounded-full" style={{ backgroundColor: theme.primary }} />
            <ThemedText className="text-lg font-bold flex-1">Activity Overview</ThemedText>
            <ThemedText className="text-[12px]" style={{ color: theme.textSecondary }}>All time</ThemedText>
          </View>
          <View className="px-3 pb-2">
            <View className="flex-row flex-wrap">
              {ALL_TIME_STATS.map((s) => (
                <View key={s.label} className="w-1/3 px-2 py-3">
                  <View className="w-10 h-10 rounded-2xl items-center justify-center mb-2.5" style={{ backgroundColor: `${s.color}18` }}>
                    <Image source={s.icon} style={{ width: 22, height: 22 }} />
                  </View>
                  <ThemedText className="text-xl font-extrabold" style={{ color: s.color }}>{s.value}</ThemedText>
                  <ThemedText className="text-[10px] mt-0.5 font-medium" style={{ color: theme.textSecondary }}>{s.unit}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Menu */}
        <View className="mx-5 mt-5 rounded-3xl overflow-hidden" style={{ backgroundColor: theme.card }}>
          {MENU_ITEMS.map((item, i) => {
            const meta = MENU_ICONS[item.icon];
            return (
              <Pressable
                key={item.label}
                className="flex-row items-center px-5 py-4"
                style={{ borderBottomWidth: i < MENU_ITEMS.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.04)' }}
              >
                <View className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: `${meta.bg}20` }}>
                  <Ionicons name={item.icon as any} size={18} color={meta.bg} />
                </View>
                <ThemedText className="flex-1 ml-3.5 text-[15px]">{item.label}</ThemedText>
                <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
              </Pressable>
            );
          })}
        </View>

        {/* Logout */}
        <Pressable
          onPress={handleLogout}
          className="mx-5 mt-6 rounded-3xl py-4 items-center flex-row justify-center gap-2"
          style={{ backgroundColor: theme.card }}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <ThemedText className="text-[15px] font-semibold" style={{ color: '#EF4444' }}>Log Out</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}
