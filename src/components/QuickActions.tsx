import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

type Action = {
  emoji: string;
  label: string;
  color: string;
  primary?: boolean;
};

const ACTIONS: Action[] = [
  { emoji: '🏃', label: 'Start Run', color: '#00D4FF', primary: true },
  { emoji: '🗺️', label: 'View Map', color: '#00FF88' },
  { emoji: '🏆', label: 'Leaderboard', color: '#FF6B35' },
  { emoji: '📊', label: 'Stats', color: '#FFD700' },
];

function ActionButton({ item }: { item: Action }) {
  const theme = useTheme();

  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: item.primary
            ? item.color
            : theme.backgroundSelected,
          borderColor: item.primary ? 'transparent' : theme.cardBorder,
        },
      ]}
    >
      <ThemedText style={styles.emoji}>{item.emoji}</ThemedText>
      <ThemedText
        style={[
          styles.label,
          { color: item.primary ? '#FFFFFF' : theme.text },
        ]}
      >
        {item.label}
      </ThemedText>
    </Pressable>
  );
}

export function QuickActions() {
  return (
    <View style={styles.section}>
      <ThemedText style={styles.title}>Quick Actions</ThemedText>
      <View style={styles.grid}>
        {ACTIONS.map((item) => (
          <ActionButton key={item.label} item={item} />
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  emoji: {
    fontSize: 26,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
});
