import { View, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
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
    <View className="w-[108] rounded-2xl overflow-hidden" style={{ backgroundColor: item.unlocked ? theme.card : theme.backgroundSelected, opacity: item.unlocked ? 1 : 0.55 }}>
      {item.unlocked && (
        <LinearGradient
          colors={['rgba(0,255,136,0.1)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="items-center pt-4 pb-3 px-3"
        >
          <View className="w-10 h-10 rounded-xl items-center justify-center mb-2.5" style={{ backgroundColor: `${theme.secondary}20` }}>
            <Image source={item.icon} style={{ width: 24, height: 24 }} />
          </View>
          <ThemedText className="text-[11px] font-semibold text-center leading-[14]" numberOfLines={2}>
            {item.title}
          </ThemedText>
          <ThemedText className="text-[10px] font-bold mt-2" style={{ color: theme.secondary }}>Unlocked</ThemedText>
        </LinearGradient>
      )}
      {!item.unlocked && (
        <View className="items-center pt-4 pb-3 px-3">
          <View className="w-10 h-10 rounded-xl items-center justify-center mb-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <Image source={item.icon} style={{ width: 24, height: 24 }} />
          </View>
          <ThemedText className="text-[11px] font-semibold text-center leading-[14]" numberOfLines={2}>
            {item.title}
          </ThemedText>
          {item.progress !== undefined && (
            <View className="w-full mt-2.5">
              <View className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <View className="h-full rounded-full" style={{ width: `${item.progress}%`, backgroundColor: theme.primary }} />
              </View>
              <ThemedText className="text-[9px] mt-1 text-center font-medium" style={{ color: theme.textSecondary }}>
                {item.progress}%
              </ThemedText>
            </View>
          )}
        </View>
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
