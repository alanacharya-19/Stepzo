import { View } from 'react-native';
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
    <View className="mx-5 rounded-2xl border p-5" style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}>
      <View className="flex-row items-center">
        <View className="w-14 h-14 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(0, 212, 255, 0.15)' }}>
          <ThemedText className="text-[26px] font-extrabold" style={{ color: theme.primary }}>
            {MOCK.level}
          </ThemedText>
        </View>
        <View className="flex-1 ml-3.5">
          <ThemedText className="text-lg font-bold">Level {MOCK.level}</ThemedText>
          <ThemedText className="text-[13px] mt-0.5" style={{ color: theme.textSecondary }}>
            {percent}% to Level {MOCK.level + 1}
          </ThemedText>
        </View>
        <View className="border rounded-xl px-3 py-1.5 items-center" style={{ borderColor: theme.primary }}>
          <ThemedText className="text-base font-extrabold" style={{ color: theme.primary }}>
            #{MOCK.rank}
          </ThemedText>
          <ThemedText className="text-[10px] mt-0.5 font-semibold" style={{ color: theme.textSecondary }}>
            Global
          </ThemedText>
        </View>
      </View>

      <View className="mt-[18px] h-2">
        <View className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.backgroundSelected }}>
          <View
            className="h-full rounded-full"
            style={{ width: `${percent}%`, backgroundColor: theme.primary }}
          />
        </View>
        <View className="flex-row justify-between -mt-2 px-0.5">
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: progress > (i + 1) * 0.25 ? theme.primary : theme.backgroundSelected }}
            />
          ))}
        </View>
      </View>

      <View className="flex-row mt-[18px] pt-4" style={{ borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' }}>
        <View className="flex-1 items-center">
          <ThemedText className="text-xl font-extrabold" style={{ color: theme.primary }}>
            {MOCK.xp.toLocaleString()}
          </ThemedText>
          <ThemedText className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>Total XP</ThemedText>
        </View>
        <View className="w-[1px]" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
        <View className="flex-1 items-center">
          <ThemedText className="text-xl font-extrabold" style={{ color: theme.secondary }}>
            {MOCK.xpToNext - MOCK.xp}
          </ThemedText>
          <ThemedText className="text-xs mt-0.5" style={{ color: theme.textSecondary }}>XP to next level</ThemedText>
        </View>
      </View>
    </View>
  );
}
