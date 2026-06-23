import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

const SUGGESTION = {
  text: 'You are 1.5 km away from your next territory zone. Go for a short run today to capture it!',
  action: 'Start Run',
};

export function SmartSuggestion() {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.primary,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.iconRow}>
          <ThemedText style={styles.bulb}>💡</ThemedText>
          <ThemedText style={[styles.aiLabel, { color: theme.primary }]}>
            Suggestion
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.text}>{SUGGESTION.text}</ThemedText>

      <Pressable
        style={[styles.actionBtn, { backgroundColor: theme.primary }]}
      >
        <ThemedText style={styles.actionText}>{SUGGESTION.action}</ThemedText>
      </Pressable>
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
    alignItems: 'center',
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bulb: {
    fontSize: 22,
  },
  aiLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    opacity: 0.9,
  },
  actionBtn: {
    alignSelf: 'flex-start',
    marginTop: 14,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
