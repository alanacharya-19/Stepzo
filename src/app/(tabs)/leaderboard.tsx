import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function LeaderboardScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ThemedText className="text-[32px] font-semibold">🏆 Leaderboard</ThemedText>
      <ThemedText className="text-sm mt-2" themeColor="textSecondary">
        See how you rank globally
      </ThemedText>
    </ThemedView>
  );
}
