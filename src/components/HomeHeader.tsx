import { View, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';

export function HomeHeader() {
  const theme = useTheme();

  return (
    <View className="flex-row items-center px-6 pt-14 pb-4">
      <View className="flex-1">
        <ThemedText className="text-[28px] font-bold tracking-tight">Hello, Alan</ThemedText>
        <ThemedText className="text-[14px] mt-1" style={{ color: theme.textSecondary }}>Ready to crush your goals?</ThemedText>
      </View>
      <Pressable className="w-10 h-10 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
        <Ionicons name="notifications-outline" size={22} color={theme.textSecondary} />
      </Pressable>
    </View>
  );
}
