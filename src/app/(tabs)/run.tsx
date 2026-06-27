import { View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';

export default function RunScreen() {
  const theme = useTheme();

  return (
    <ThemedView className="flex-1 items-center justify-center px-5">
      <View className="w-28 h-28 rounded-full items-center justify-center mb-6" style={{ backgroundColor: 'rgba(183,255,60,0.1)' }}>
        <Image source={require('@/assets/logo/running.png')} style={{ width: 48, height: 48, tintColor: theme.primary }} />
      </View>
      <ThemedText className="text-2xl font-bold mb-2">Ready to Run?</ThemedText>
      <ThemedText className="text-sm text-center leading-5" style={{ color: theme.textSecondary }}>Start a new run and track your progress in real-time.</ThemedText>
      <LinearGradient colors={['#22C55E', '#0D9488']} className="mt-8 w-full rounded-2xl overflow-hidden" style={{ maxWidth: 240 }}>
        <Pressable className="py-4 items-center">
          <ThemedText className="text-[17px] font-bold text-white">Start Run</ThemedText>
        </Pressable>
      </LinearGradient>
    </ThemedView>
  );
}
