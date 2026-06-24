import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function TerritoryScreen() {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      <ThemedText className="text-[32px] font-semibold">🗺️ Territory</ThemedText>
      <ThemedText className="text-sm mt-2" themeColor="textSecondary">
        Explore and capture zones
      </ThemedText>
    </ThemedView>
  );
}
