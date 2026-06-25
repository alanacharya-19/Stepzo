import { ScrollView, Platform } from 'react-native';
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

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1">
      <HomeHeader />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 120 : 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <UserProgressCard />
        <ActivitySummary />
        <TerritoryOverview />
        <AchievementsCarousel />
        <QuickActions />
        <ActiveChallenge />
        <WeeklySummary />

        <ThemedText
          className="text-center text-xs mt-8 mb-2"
          themeColor="textSecondary"
        >
          Stepzo v1.0.0 — Stay active
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}
