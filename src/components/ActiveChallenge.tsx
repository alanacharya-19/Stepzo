import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

const MOCK = {
  title: 'Weekly Challenge',
  description: 'Run 15 km this week',
  current: 6.2,
  target: 15,
  unit: 'km',
  reward: '+500 XP',
};

export function ActiveChallenge() {
  const theme = useTheme();
  const progress = MOCK.current / MOCK.target;
  const percent = Math.round(progress * 100);

  return (
    <View className="mx-5 mt-6 rounded-3xl overflow-hidden" style={{ backgroundColor: theme.card }}>
      <LinearGradient
        colors={['rgba(255,215,0,0.06)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-5"
      >
        <View className="flex-row items-center gap-2.5 mb-4">
          <View className="w-1 h-5 rounded-full" style={{ backgroundColor: theme.warning }} />
          <ThemedText className="text-lg font-bold flex-1">🔥 {MOCK.title}</ThemedText>
          <View className="rounded-xl px-3 py-1.5" style={{ backgroundColor: 'rgba(255,215,0,0.12)' }}>
            <ThemedText className="text-[12px] font-bold" style={{ color: theme.warning }}>
              {MOCK.reward}
            </ThemedText>
          </View>
        </View>

        <ThemedText className="text-sm" style={{ color: theme.textSecondary }}>
          {MOCK.description}
        </ThemedText>

        <View className="mt-4">
          <View className="flex-row items-baseline gap-1.5 mb-3">
            <ThemedText className="text-2xl font-extrabold" style={{ color: theme.primary }}>
              {MOCK.current}
            </ThemedText>
            <ThemedText className="text-sm" style={{ color: theme.textSecondary }}>
              / {MOCK.target} {MOCK.unit}
            </ThemedText>
          </View>
          <View className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: theme.backgroundSelected }}>
            <LinearGradient
              colors={['#00D4FF', '#0088FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="h-full rounded-full"
              style={{ width: `${percent}%` }}
            />
          </View>
          <View className="flex-row justify-between mt-1.5">
            <ThemedText className="text-[11px]" style={{ color: theme.textSecondary }}>Progress</ThemedText>
            <ThemedText className="text-[11px] font-bold" style={{ color: theme.primary }}>{percent}%</ThemedText>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
