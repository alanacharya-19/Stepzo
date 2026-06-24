import { View, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

type Achievement = {
  emoji: string;
  title: string;
  unlocked: boolean;
  progress?: number;
};

const ACHIEVEMENTS: Achievement[] = [
  { emoji: '🥇', title: '5km Runner', unlocked: true },
  { emoji: '🔥', title: '7 Day Streak', unlocked: true },
  { emoji: '🗺️', title: 'First Capture', unlocked: true },
  { emoji: '⚡', title: 'Speed Runner', unlocked: false, progress: 60 },
  { emoji: '🏅', title: 'Marathon', unlocked: false, progress: 25 },
  { emoji: '🌟', title: 'Night Owl', unlocked: true },
];

function BadgeCard({ item }: { item: Achievement }) {
  const theme = useTheme();

  return (
    <View
      className="w-[110] rounded-2xl border p-3.5 items-center"
      style={{
        backgroundColor: item.unlocked ? theme.card : theme.backgroundSelected,
        borderColor: item.unlocked ? theme.cardBorder : 'transparent',
        opacity: item.unlocked ? 1 : 0.5,
      }}
    >
      <ThemedText className="text-[32px] mb-2">{item.emoji}</ThemedText>
      <ThemedText className="text-xs font-semibold text-center leading-4" numberOfLines={2}>
        {item.title}
      </ThemedText>
      {!item.unlocked && item.progress !== undefined && (
        <View className="w-full h-1 rounded mt-2 overflow-hidden" style={{ backgroundColor: theme.background }}>
          <View className="h-full rounded" style={{ width: `${item.progress}%`, backgroundColor: theme.primary }} />
        </View>
      )}
      {item.unlocked && (
        <ThemedText className="text-sm font-bold mt-1.5" style={{ color: theme.secondary }}>✓</ThemedText>
      )}
    </View>
  );
}

export function AchievementsCarousel() {
  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-5 mb-3">
        <ThemedText className="text-lg font-bold">🏆 Achievements</ThemedText>
        <ThemedText className="text-[13px]" themeColor="textSecondary">See all</ThemedText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-5"
        contentContainerStyle={{ gap: 12 }}
      >
        {ACHIEVEMENTS.map((item) => (
          <BadgeCard key={item.title} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}
