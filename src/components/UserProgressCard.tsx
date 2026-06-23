import { View, StyleSheet } from 'react-native';
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
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <View style={styles.topRow}>
        <View style={styles.levelBadge}>
          <ThemedText style={styles.levelNumber}>{MOCK.level}</ThemedText>
        </View>
        <View style={styles.levelInfo}>
          <ThemedText type="default" style={styles.levelLabel}>
            Level {MOCK.level}
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.xpLabel}>
            {percent}% to Level {MOCK.level + 1}
          </ThemedText>
        </View>
        <View style={[styles.rankBadge, { borderColor: theme.primary }]}>
          <ThemedText style={[styles.rankNumber, { color: theme.primary }]}>
            #{MOCK.rank}
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.rankLabel}>
            Global
          </ThemedText>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBg, { backgroundColor: theme.backgroundSelected }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${percent}%`,
                backgroundColor: theme.primary,
              },
            ]}
          />
        </View>
        <View style={styles.glowDots}>
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: progress > (i + 1) * 0.25 ? theme.primary : theme.backgroundSelected,
                },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <ThemedText style={[styles.statValue, { color: theme.primary }]}>
            {MOCK.xp.toLocaleString()}
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.statLabel}>
            Total XP
          </ThemedText>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <ThemedText style={[styles.statValue, { color: theme.secondary }]}>
            {MOCK.xpToNext - MOCK.xp}
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.statLabel}>
            XP to next level
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 212, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: '#00D4FF',
  },
  levelInfo: {
    flex: 1,
    marginLeft: 14,
  },
  levelLabel: {
    fontSize: 18,
    fontWeight: '700',
  },
  xpLabel: {
    fontSize: 13,
    marginTop: 2,
  },
  rankBadge: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '800',
  },
  rankLabel: {
    fontSize: 10,
    marginTop: 1,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 18,
    height: 8,
  },
  progressBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  glowDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
    paddingHorizontal: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});
