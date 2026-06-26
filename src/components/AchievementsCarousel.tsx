import { View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

type Achievement = {
  icon: any;
  title: string;
  unlocked: boolean;
  progress?: number;
};

const ACHIEVEMENTS: Achievement[] = [
  { icon: require('@/assets/logo/running.png'), title: '5km Runner', unlocked: true },
  { icon: require('@/assets/logo/streak.png'), title: '7 Day Streak', unlocked: true },
  { icon: require('@/assets/logo/achivement.png'), title: 'First Capture', unlocked: true },
  { icon: require('@/assets/logo/level-up.png'), title: 'Speed Runner', unlocked: false, progress: 60 },
  { icon: require('@/assets/logo/running.png'), title: 'Marathon', unlocked: false, progress: 25 },
  { icon: require('@/assets/logo/time.png'), title: 'Night Owl', unlocked: true },
];

function BadgeCard({ item }: { item: Achievement }) {
  const theme = useTheme();

  return (
    <View
      className="w-[108] rounded-2xl border p-3.5 items-center"
      style={{
        backgroundColor: item.unlocked ? theme.card : theme.backgroundTertiary,
        borderColor: item.unlocked ? theme.border : 'transparent',
        opacity: item.unlocked ? 1 : 0.5,
      }}
    >
      <Image source={item.icon} style={{ width: 30, height: 30 }} className="mb-2" />
      <ThemedText className="text-[11px] font-semibold text-center leading-[14]" numberOfLines={2}>
        {item.title}
      </ThemedText>
      {!item.unlocked && item.progress !== undefined && (
        <View className="w-full h-1 rounded-full mt-2.5 overflow-hidden" style={{ backgroundColor: theme.background }}>
          <View className="h-full rounded-full" style={{ width: `${item.progress}%`, backgroundColor: theme.primary }} />
        </View>
      )}
      {item.unlocked && (
        <ThemedText className="text-[11px] font-bold mt-1.5" style={{ color: theme.secondary }}>✓ Unlocked</ThemedText>
      )}
    </View>
  );
}

export function AchievementsCarousel() {
  const theme = useTheme();

  return (
    <View className="mt-6">
      <View className="flex-row items-center gap-2.5 px-5 mb-4">
        <View className="w-1 h-5 rounded-full" style={{ backgroundColor: theme.secondary }} />
        <ThemedText className="text-lg font-bold flex-1">Achievements</ThemedText>
        <ThemedText className="text-[12px]" style={{ color: theme.textSecondary }}>See all</ThemedText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-5"
        contentContainerStyle={{ gap: 10 }}
      >
        {ACHIEVEMENTS.map((item) => (
          <BadgeCard key={item.title} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}
