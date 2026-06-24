import { View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

const SUGGESTION = {
  text: 'You are 1.5 km away from your next territory zone. Go for a short run today to capture it!',
  action: 'Start Run',
};

export function SmartSuggestion() {
  const theme = useTheme();

  return (
    <View className="mx-5 mt-6 rounded-3xl overflow-hidden" style={{ borderWidth: 1, borderColor: 'rgba(0,212,255,0.2)' }}>
      <LinearGradient
        colors={['rgba(0,212,255,0.08)', 'rgba(0,136,255,0.03)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-5"
      >
        <View className="flex-row items-center gap-2.5 mb-3">
          <View className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(0,212,255,0.15)' }}>
            <ThemedText className="text-lg">💡</ThemedText>
          </View>
          <ThemedText className="text-sm font-bold" style={{ color: theme.primary }}>
            Smart Suggestion
          </ThemedText>
        </View>

        <ThemedText className="text-sm leading-[22] font-medium opacity-90">
          {SUGGESTION.text}
        </ThemedText>

        <LinearGradient
          colors={['#00D4FF', '#0088FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="self-start mt-4 rounded-xl px-5 py-2.5"
        >
          <ThemedText className="text-sm font-bold text-white">{SUGGESTION.action}</ThemedText>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
}
