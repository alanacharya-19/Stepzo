import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

type ActivityItem = {
  emoji: string;
  label: string;
  value: string;
  unit: string;
  color: string;
};

const ACTIVITIES: ActivityItem[] = [
  { emoji: '🏃', label: 'Distance', value: '3.2', unit: 'km', color: '#00D4FF' },
  { emoji: '⏱️', label: 'Time', value: '28', unit: 'min', color: '#00FF88' },
  { emoji: '🔥', label: 'Calories', value: '210', unit: 'kcal', color: '#FF6B35' },
  { emoji: '👣', label: 'Steps', value: '4,200', unit: 'steps', color: '#FFD700' },
];

function MiniCard({ item }: { item: ActivityItem }) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
      <ThemedText style={styles.emoji}>{item.emoji}</ThemedText>
      <ThemedText style={[styles.value, { color: item.color }]}>{item.value}</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.unit}>
        {item.unit}
      </ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.label}>
        {item.label}
      </ThemedText>
    </View>
  );
}

export function ActivitySummary() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <ThemedText type="default" style={styles.title}>
          Today's Activity
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.date}>
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </ThemedText>
      </View>
      <View style={styles.grid}>
        {ACTIVITIES.map((item) => (
          <MiniCard key={item.label} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  date: {
    fontSize: 13,
  },
  grid: {
    flexDirection: 'row',
    gap: 10,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 22,
    marginBottom: 6,
  },
  value: {
    fontSize: 18,
    fontWeight: '800',
  },
  unit: {
    fontSize: 11,
    marginTop: 1,
  },
  label: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
});
