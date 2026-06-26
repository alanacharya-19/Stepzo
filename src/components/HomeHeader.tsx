import { View, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
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
      <View className="flex-1">
        <ThemedText className="text-[26px] font-bold">
          Hello, {MOCK_USER.name}
        </ThemedText>
        <ThemedText className="text-[15px] mt-1" style={{ color: theme.textSecondary }}>
          Ready to crush your goals?
        </ThemedText>
      </View>

      <Pressable className="w-11 h-11 rounded-full items-center justify-center">
        <Ionicons name="notifications-outline" size={24} color={theme.textSecondary} />
        <View
          className="absolute w-[7] h-[7] rounded-full border-[2]"
          style={{ backgroundColor: "#EF4444", borderColor: theme.background, top: 9, right: 9 }}
        />
      </Pressable>
    </View>
  );
}
