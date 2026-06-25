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
        <View className="flex-row items-start">
          <View className="flex-row items-center flex-1 gap-3">
            <ThemedText className="text-2xl">🔥</ThemedText>
            <View>
              <ThemedText className="text-base font-bold">{MOCK.title}</ThemedText>
              <ThemedText className="text-[13px] mt-0.5" style={{ color: theme.textSecondary }}>
                {MOCK.description}
              </ThemedText>
            </View>
          </View>
          <View className="rounded-xl px-3 py-1.5" style={{ backgroundColor: 'rgba(255,215,0,0.12)' }}>
            <ThemedText className="text-[12px] font-bold" style={{ color: theme.warning }}>
              {MOCK.reward}
            </ThemedText>
          </View>
        </View>

        <View className="mt-4">
          <View className="flex-row items-baseline gap-1 mb-2.5">
            <ThemedText className="text-xl font-extrabold" style={{ color: theme.primary }}>
              {MOCK.current}/{MOCK.target}
            </ThemedText>
            <ThemedText className="text-[13px]" style={{ color: theme.textSecondary }}>
              {MOCK.unit}
            </ThemedText>
          </View>
          <View className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.backgroundSelected }}>
            <LinearGradient
              colors={['#00D4FF', '#0088FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="h-full rounded-full"
              style={{ width: `${percent}%` }}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
