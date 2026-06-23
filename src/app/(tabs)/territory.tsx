import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function TerritoryScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">🗺️ Territory</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.sub}>
        Explore and capture zones
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sub: {
    marginTop: 8,
  },
});
