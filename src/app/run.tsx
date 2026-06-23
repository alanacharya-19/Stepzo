import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function RunScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">🏃 Run</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.sub}>
        Start your next run here
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
