import { View, StyleSheet, ScrollView } from 'react-native';
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
      style={[
        styles.badge,
        {
          backgroundColor: item.unlocked ? theme.card : theme.backgroundSelected,
          borderColor: item.unlocked ? theme.cardBorder : 'transparent',
          opacity: item.unlocked ? 1 : 0.5,
        },
      ]}
    >
      <ThemedText style={styles.badgeEmoji}>{item.emoji}</ThemedText>
      <ThemedText style={styles.badgeTitle} numberOfLines={2}>
        {item.title}
      </ThemedText>
      {!item.unlocked && item.progress !== undefined && (
        <View style={[styles.progressBg, { backgroundColor: theme.background }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${item.progress}%`,
                backgroundColor: theme.primary,
              },
            ]}
          />
        </View>
      )}
      {item.unlocked && (
        <ThemedText style={[styles.unlockedText, { color: theme.secondary }]}>
          ✓
        </ThemedText>
      )}
    </View>
  );
}

export function AchievementsCarousel() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>🏆 Achievements</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.seeAll}>
          See all
        </ThemedText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {ACHIEVEMENTS.map((item) => (
          <BadgeCard key={item.title} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 13,
  },
  scroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  badge: {
    width: 110,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    alignItems: 'center',
  },
  badgeEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  progressBg: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  unlockedText: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
});
