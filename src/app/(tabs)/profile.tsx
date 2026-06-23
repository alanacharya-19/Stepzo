import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">👤 Profile</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.sub}>
        Your personal stats and settings
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
