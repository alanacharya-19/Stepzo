import { View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';

const MOCK = {
  level: 7,
  xp: 3420,
  xpToNext: 4750,
  rank: 128,
};

export function UserProgressCard() {
  const theme = useTheme();
  const progress = MOCK.xp / MOCK.xpToNext;
  const percent = Math.round(progress * 100);

  return (
    <View className="mx-5 mt-2 rounded-3xl overflow-hidden" style={{ backgroundColor: theme.card }}>
      <LinearGradient
        colors={['rgba(0,212,255,0.08)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-5 pt-5 pb-4"
      >
        <View className="flex-row items-center">
          <LinearGradient
            colors={['#00D4FF', '#0088FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-14 h-14 rounded-2xl items-center justify-center"
          >
            <Image source={require('@/assets/logo/level-up.png')} style={{ width: 32, height: 32 }} />
          </LinearGradient>
          <View className="flex-1 ml-4">
            <ThemedText className="text-xl font-bold">Level {MOCK.level}</ThemedText>
            <ThemedText className="text-[13px] mt-0.5" style={{ color: theme.textSecondary }}>
              {percent}% to Level {MOCK.level + 1}
            </ThemedText>
          </View>
          <View className="rounded-2xl px-3.5 py-2 items-center" style={{ backgroundColor: 'rgba(0,212,255,0.1)' }}>
            <ThemedText className="text-base font-extrabold" style={{ color: theme.primary }}>
              #{MOCK.rank}
            </ThemedText>
            <ThemedText className="text-[10px] font-semibold" style={{ color: theme.textSecondary }}>
              Global
            </ThemedText>
          </View>
        </View>
      </LinearGradient>

      <View className="px-5 pb-5">
        <View className="mt-2">
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

        <View className="flex-row mt-4 pt-4" style={{ borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' }}>
          <View className="flex-1 items-center">
            <ThemedText className="text-xl font-extrabold" style={{ color: theme.primary }}>
              {MOCK.xp.toLocaleString()}
            </ThemedText>
            <ThemedText className="text-xs mt-1" style={{ color: theme.textSecondary }}>Total XP</ThemedText>
          </View>
          <View className="w-[1px]" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
          <View className="flex-1 items-center">
            <ThemedText className="text-xl font-extrabold" style={{ color: theme.secondary }}>
              {MOCK.xpToNext - MOCK.xp}
            </ThemedText>
            <ThemedText className="text-xs mt-1" style={{ color: theme.textSecondary }}>XP to next level</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}
