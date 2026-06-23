import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

const MOCK = {
  ownedPercent: 12,
  capturedToday: 3,
  lostToday: 1,
  zones: [
    [1, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 0, 0],
  ],
};

function MiniMap() {
  const theme = useTheme();

  return (
    <View style={styles.miniMap}>
      {MOCK.zones.map((row, ri) => (
        <View key={ri} style={styles.mapRow}>
          {row.map((cell, ci) => (
            <View
              key={ci}
              style={[
                styles.mapCell,
                {
                  backgroundColor: cell ? theme.primary : theme.backgroundSelected,
                  opacity: cell ? 0.8 : 0.4,
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

export function TerritoryOverview() {
  const theme = useTheme();

  return (
    <Pressable
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}
    >
      <View style={styles.header}>
        <ThemedText style={styles.title}>🗺️ Territory</ThemedText>
        <ThemedText style={[styles.tapHint, { color: theme.primary }]}>
          Tap to explore →
        </ThemedText>
      </View>

      <View style={styles.content}>
        <MiniMap />

        <View style={styles.stats}>
          <View style={styles.statRow}>
            <View style={[styles.dotCol, { backgroundColor: theme.primary }]} />
            <ThemedText themeColor="textSecondary" style={styles.statText}>
              Territory owned:{' '}
              <ThemedText style={{ color: theme.primary, fontWeight: '700' }}>
                {MOCK.ownedPercent}%
              </ThemedText>
            </ThemedText>
          </View>
          <View style={styles.statRow}>
            <View style={[styles.dotCol, { backgroundColor: theme.secondary }]} />
            <ThemedText themeColor="textSecondary" style={styles.statText}>
              New zones today:{' '}
              <ThemedText style={{ color: theme.secondary, fontWeight: '700' }}>
                +{MOCK.capturedToday}
              </ThemedText>
            </ThemedText>
          </View>
          <View style={styles.statRow}>
            <View style={[styles.dotCol, { backgroundColor: theme.danger }]} />
            <ThemedText themeColor="textSecondary" style={styles.statText}>
              Zones lost:{' '}
              <ThemedText style={{ color: theme.danger, fontWeight: '700' }}>
                -{MOCK.lostToday}
              </ThemedText>
            </ThemedText>
          </View>
        </View>
      </View>
    </Pressable>
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
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  tapHint: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flexDirection: 'row',
    gap: 20,
  },
  miniMap: {
    width: 120,
    height: 120,
    gap: 3,
  },
  mapRow: {
    flexDirection: 'row',
    gap: 3,
    flex: 1,
  },
  mapCell: {
    flex: 1,
    borderRadius: 4,
  },
  stats: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dotCol: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statText: {
    fontSize: 13,
    flex: 1,
  },
});
