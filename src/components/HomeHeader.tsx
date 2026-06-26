import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';

const MOCK_USER = {
  name: 'Alan',
  avatarInitial: 'A',
};

export function HomeHeader() {
  const theme = useTheme();

  return (
    <View className="flex-row items-center px-5 pt-2 pb-3 mt-[30]">
      <View className="w-12 h-12 rounded-full items-center justify-center" style={{ backgroundColor: theme.primary }}>
        <ThemedText className="text-xl font-bold text-white">{MOCK_USER.avatarInitial}</ThemedText>
      </View>

      <View className="flex-1 ml-3.5">
        <ThemedText className="text-lg font-semibold">
          Hello, {MOCK_USER.name}
        </ThemedText>
        <ThemedText className="text-[13px] mt-0.5" style={{ color: theme.textSecondary }}>
          Ready to crush your goals?
        </ThemedText>
      </View>

      <Pressable className="w-11 h-11 rounded-full items-center justify-center">
        <ThemedText className="text-[22px]">🔔</ThemedText>
        <View
          className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2"
          style={{ backgroundColor: theme.accent, borderColor: theme.background }}
        />
      </Pressable>
    </View>
  );
}
