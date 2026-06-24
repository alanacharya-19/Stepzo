import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function RunScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ThemedText className="text-[32px] font-semibold">🏃 Run</ThemedText>
      <ThemedText className="text-sm mt-2" themeColor="textSecondary">
        Start your next run here
      </ThemedText>
    </ThemedView>
  );
}
