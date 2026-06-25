import { View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

type Action = {
  icon?: any;
  emoji: string;
  label: string;
  color: string;
  primary?: boolean;
};

const ACTIONS: Action[] = [
  { icon: require('@/assets/logo/running.png'), emoji: '🏃', label: 'Start Run', color: '#00D4FF', primary: true },
  { emoji: '🗺️', label: 'View Map', color: '#00FF88' },
  { emoji: '🏆', label: 'Leaderboard', color: '#FF6B35' },
  { emoji: '📊', label: 'Stats', color: '#FFD700' },
];

export function QuickActions() {
  const theme = useTheme();

  return (
    <View className="mt-6 px-5">
      <View className="flex-row items-center gap-2.5 mb-4">
        <View className="w-1 h-5 rounded-full" style={{ backgroundColor: theme.primary }} />
        <ThemedText className="text-lg font-bold">Quick Actions</ThemedText>
      </View>
      <View className="flex-row gap-2.5">
        {ACTIONS.map((item) => (
          item.primary ? (
            <LinearGradient
              key={item.label}
              colors={['#00D4FF', '#0088FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="flex-1 rounded-2xl py-4 items-center gap-1.5"
            >
              <Image source={item.icon!} style={{ width: 24, height: 24 }} />
              <ThemedText className="text-[12px] font-bold text-white">{item.label}</ThemedText>
            </LinearGradient>
          ) : (
            <Pressable
              key={item.label}
              className="flex-1 rounded-2xl border py-4 items-center gap-1.5"
              style={{ backgroundColor: theme.backgroundSelected, borderColor: theme.cardBorder }}
            >
              <ThemedText className="text-xl">{item.emoji}</ThemedText>
              <ThemedText className="text-[12px] font-semibold" style={{ color: theme.text }}>{item.label}</ThemedText>
            </Pressable>
          )
        ))}
      </View>
    </View>
  );
}
