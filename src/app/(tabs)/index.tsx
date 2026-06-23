import { StyleSheet, ScrollView, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HomeHeader } from '@/components/HomeHeader';
import { UserProgressCard } from '@/components/UserProgressCard';
import { ActivitySummary } from '@/components/ActivitySummary';
import { TerritoryOverview } from '@/components/TerritoryOverview';
import { AchievementsCarousel } from '@/components/AchievementsCarousel';
import { QuickActions } from '@/components/QuickActions';
import { ActiveChallenge } from '@/components/ActiveChallenge';
import { WeeklySummary } from '@/components/WeeklySummary';
import { SmartSuggestion } from '@/components/SmartSuggestion';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <HomeHeader />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <UserProgressCard />
        <ActivitySummary />
        <TerritoryOverview />
        <AchievementsCarousel />
        <QuickActions />
        <ActiveChallenge />
        <WeeklySummary />
        <SmartSuggestion />

        <ThemedText
          themeColor="textSecondary"
          style={styles.footer}
        >
          Stepzo v1.0.0 — Stay active
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 32,
    marginBottom: 8,
  },
});
