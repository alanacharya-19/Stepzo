import { View, Pressable } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

type Action = {
  emoji: string;
  label: string;
  color: string;
  primary?: boolean;
};

const ACTIONS: Action[] = [
  { emoji: '🏃', label: 'Start Run', color: '#00D4FF', primary: true },
  { emoji: '🗺️', label: 'View Map', color: '#00FF88' },
  { emoji: '🏆', label: 'Leaderboard', color: '#FF6B35' },
  { emoji: '📊', label: 'Stats', color: '#FFD700' },
];

function ActionButton({ item }: { item: Action }) {
  const theme = useTheme();

  return (
    <Pressable
      className="flex-1 rounded-2xl border p-4 items-center gap-2"
      style={{
        backgroundColor: item.primary ? item.color : theme.backgroundSelected,
        borderColor: item.primary ? 'transparent' : theme.cardBorder,
      }}
    >
      <ThemedText className="text-[26px]">{item.emoji}</ThemedText>
      <ThemedText
        className="text-xs font-bold"
        style={{ color: item.primary ? '#FFFFFF' : theme.text }}
      >
        {item.label}
      </ThemedText>
    </Pressable>
  );
}

export function QuickActions() {
  return (
    <View className="mt-6 px-5">
      <ThemedText className="text-lg font-bold mb-3">Quick Actions</ThemedText>
      <View className="flex-row gap-2.5">
        {ACTIONS.map((item) => (
          <ActionButton key={item.label} item={item} />
        ))}
      </View>
    </View>
  );
}
