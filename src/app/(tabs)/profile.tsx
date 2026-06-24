import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function ProfileScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ThemedText className="text-[32px] font-semibold">👤 Profile</ThemedText>
      <ThemedText className="text-sm mt-2" themeColor="textSecondary">
        Your personal stats and settings
      </ThemedText>
    </ThemedView>
  );
}
