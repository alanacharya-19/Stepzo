import { ScrollView, Platform, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MOCK_USER = {
  name: 'Alan',
  avatarInitial: 'A',
  memberSince: 'Jan 2025',
  runs: 42,
  distance: '186',
  time: '1,420',
  calories: '12,800',
};

const MENU_ITEMS = [
  { label: 'Account', icon: 'person-outline', route: '' },
  { label: 'Achievements', icon: 'trophy-outline', route: '' },
  { label: 'Goals', icon: 'flag-outline', route: '' },
  { label: 'Notifications', icon: 'notifications-outline', route: '' },
  { label: 'Privacy', icon: 'lock-closed-outline', route: '' },
  { label: 'Help & Support', icon: 'help-circle-outline', route: '' },
  { label: 'About', icon: 'information-circle-outline', route: '' },
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
        {/* Profile Header */}
        <View className="items-center pt-16 pb-6 px-5">
          <View className="w-full flex-row justify-end px-2 mb-2">
            <Pressable className="w-10 h-10 rounded-full items-center justify-center" style={{ backgroundColor: theme.card }}>
              <Ionicons name="settings-outline" size={22} color={theme.textSecondary} />
            </Pressable>
          </View>
          <View className="w-20 h-20 rounded-full items-center justify-center mb-4" style={{ backgroundColor: theme.primary }}>
            <ThemedText className="text-3xl font-bold text-white">{MOCK_USER.avatarInitial}</ThemedText>
          </View>
          <ThemedText className="text-2xl font-bold">{MOCK_USER.name}</ThemedText>
          <ThemedText className="text-[13px] mt-1" style={{ color: theme.textSecondary }}>
            Member since {MOCK_USER.memberSince}
          </ThemedText>
        </View>

        {/* Stats Row */}
        <View className="mx-5 rounded-3xl p-4" style={{ backgroundColor: theme.card }}>
          <View className="flex-row">
            <View className="flex-1 items-center py-2">
              <ThemedText className="text-xl font-extrabold" style={{ color: '#B7FF3C' }}>{MOCK_USER.runs}</ThemedText>
              <ThemedText className="text-[10px] mt-1" style={{ color: theme.textSecondary }}>Runs</ThemedText>
            </View>
            <View className="w-px" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
            <View className="flex-1 items-center py-2">
              <ThemedText className="text-xl font-extrabold" style={{ color: '#3B82F6' }}>{MOCK_USER.distance}</ThemedText>
              <ThemedText className="text-[10px] mt-1" style={{ color: theme.textSecondary }}>km</ThemedText>
            </View>
            <View className="w-px" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
            <View className="flex-1 items-center py-2">
              <ThemedText className="text-xl font-extrabold" style={{ color: '#A855F7' }}>{MOCK_USER.time}</ThemedText>
              <ThemedText className="text-[10px] mt-1" style={{ color: theme.textSecondary }}>min</ThemedText>
            </View>
            <View className="w-px" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
            <View className="flex-1 items-center py-2">
              <ThemedText className="text-xl font-extrabold" style={{ color: '#FF7A00' }}>{MOCK_USER.calories}</ThemedText>
              <ThemedText className="text-[10px] mt-1" style={{ color: theme.textSecondary }}>kcal</ThemedText>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="mx-5 mt-5 rounded-3xl overflow-hidden" style={{ backgroundColor: theme.card }}>
          {MENU_ITEMS.map((item, i) => (
            <Pressable
              key={item.label}
              className="flex-row items-center px-5 py-4"
              style={{ borderBottomWidth: i < MENU_ITEMS.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.04)' }}
            >
              <Ionicons name={item.icon as any} size={22} color={theme.textSecondary} />
              <ThemedText className="flex-1 ml-4 text-[15px]">{item.label}</ThemedText>
              <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
            </Pressable>
          ))}
        </View>

        {/* Logout */}
        <Pressable
          onPress={handleLogout}
          className="mx-5 mt-6 rounded-3xl py-4 items-center"
          style={{ backgroundColor: theme.card }}
        >
          <ThemedText className="text-[15px] font-semibold" style={{ color: '#EF4444' }}>Log Out</ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}
