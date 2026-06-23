import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';

const MOCK_USER = {
  name: 'Alan',
  level: 7,
  title: 'Runner',
  avatarInitial: 'A',
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function HomeHeader() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Pressable style={[styles.avatar, { backgroundColor: theme.primary }]}>
        <ThemedText style={styles.avatarText}>{MOCK_USER.avatarInitial}</ThemedText>
      </Pressable>

      <View style={styles.center}>
        <ThemedText type="default" style={styles.greeting}>
          {getGreeting()}, {MOCK_USER.name}
        </ThemedText>
        <ThemedText
          themeColor="textSecondary"
          style={styles.level}
        >
          Level {MOCK_USER.level} {MOCK_USER.title}
        </ThemedText>
      </View>

      <Pressable style={styles.bellButton}>
        <ThemedText style={styles.bellIcon}>🔔</ThemedText>
        <View style={[styles.badge, { backgroundColor: theme.accent }]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  center: {
    flex: 1,
    marginLeft: 14,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
  },
  level: {
    fontSize: 13,
    marginTop: 1,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    fontSize: 22,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
