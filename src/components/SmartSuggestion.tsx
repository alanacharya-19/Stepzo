import { View, Pressable } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

const SUGGESTION = {
  text: 'You are 1.5 km away from your next territory zone. Go for a short run today to capture it!',
  action: 'Start Run',
};

export function SmartSuggestion() {
  const theme = useTheme();

  return (
    <View className="mx-5 mt-6 rounded-2xl border p-5" style={{ backgroundColor: theme.card, borderColor: theme.primary }}>
      <View className="flex-row items-center gap-2 mb-3">
        <ThemedText className="text-[22px]">💡</ThemedText>
        <ThemedText className="text-sm font-bold" style={{ color: theme.primary }}>
          Suggestion
        </ThemedText>
      </View>

      <ThemedText className="text-sm leading-[22] font-medium opacity-90">
        {SUGGESTION.text}
      </ThemedText>

      <Pressable
        className="self-start mt-3.5 rounded-xl px-5 py-2.5"
        style={{ backgroundColor: theme.primary }}
      >
        <ThemedText className="text-sm font-bold text-white">{SUGGESTION.action}</ThemedText>
      </Pressable>
    </View>
  );
}
