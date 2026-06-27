import { View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';

export default function RunScreen() {
  const theme = useTheme();

  return (
    <ThemedView className="flex-1 items-center justify-center px-8">
      <View className="w-24 h-24 rounded-2xl items-center justify-center mb-6" style={{ backgroundColor: `${theme.primary}12` }}>
        <Image source={require('@/assets/logo/running.png')} style={{ width: 44, height: 44, tintColor: theme.primary }} />
      </View>
      <ThemedText className="text-[26px] font-bold tracking-tight mb-2">Ready to Run?</ThemedText>
      <ThemedText className="text-[14px] text-center leading-6" style={{ color: theme.textSecondary, maxWidth: 260 }}>Start tracking your run and see your progress in real-time.</ThemedText>
      <LinearGradient colors={[theme.primaryLight, theme.primary, theme.primaryDark]} className="mt-10 w-full rounded-xl overflow-hidden" style={{ maxWidth: 220 }}>
        <Pressable className="py-3.5 items-center">
          <ThemedText className="text-[16px] font-bold" style={{ color: '#0B1020' }}>Start Run</ThemedText>
        </Pressable>
      </LinearGradient>
      <View className="flex-row gap-6 mt-8">
        {[{ v: '5.2', u: 'km', l: 'Best' }, { v: '28', u: 'min', l: 'Last' }, { v: '340', u: 'kcal', l: 'Avg' }].map((s) => (
          <View key={s.l} className="items-center">
            <ThemedText className="text-[18px] font-bold text-white">{s.v}</ThemedText>
            <ThemedText className="text-[10px] mt-1" style={{ color: theme.textSecondary }}>{s.u}</ThemedText>
            <ThemedText className="text-[10px] font-medium" style={{ color: theme.textSecondary }}>{s.l}</ThemedText>
          </View>
        ))}
      </View>
    </ThemedView>
  );
}
