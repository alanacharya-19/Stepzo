import { View, StyleSheet } from 'react-native';
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
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <ThemedText style={styles.fire}>🔥</ThemedText>
          <View style={{ marginLeft: 10 }}>
            <ThemedText style={styles.title}>{MOCK.title}</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.desc}>
              {MOCK.description}
            </ThemedText>
          </View>
        </View>
        <View style={[styles.reward, { backgroundColor: 'rgba(255,215,0,0.12)' }]}>
          <ThemedText style={[styles.rewardText, { color: theme.warning }]}>
            {MOCK.reward}
          </ThemedText>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressRow}>
          <ThemedText style={[styles.progressValue, { color: theme.primary }]}>
            {MOCK.current}/{MOCK.target}
          </ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.progressUnit}>
            {MOCK.unit}
          </ThemedText>
        </View>

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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fire: {
    fontSize: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  desc: {
    fontSize: 13,
    marginTop: 1,
  },
  reward: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  rewardText: {
    fontSize: 13,
    fontWeight: '700',
  },
  progressSection: {
    marginTop: 16,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 10,
  },
  progressValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  progressUnit: {
    fontSize: 13,
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
});
