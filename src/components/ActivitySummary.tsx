import { View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

type ActivityItem = {
  emoji: string;
  label: string;
  value: string;
  unit: string;
  color: string;
};

const ACTIVITIES: ActivityItem[] = [
  { emoji: '🏃', label: 'Distance', value: '3.2', unit: 'km', color: '#00D4FF' },
  { emoji: '⏱️', label: 'Time', value: '28', unit: 'min', color: '#00FF88' },
  { emoji: '🔥', label: 'Calories', value: '210', unit: 'kcal', color: '#FF6B35' },
  { emoji: '👣', label: 'Steps', value: '4,200', unit: 'steps', color: '#FFD700' },
];

function MiniCard({ item }: { item: ActivityItem }) {
  const theme = useTheme();

  return (
    <View className="flex-1 rounded-2xl border p-3 items-center" style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}>
      <ThemedText className="text-[22px] mb-1.5">{item.emoji}</ThemedText>
      <ThemedText className="text-lg font-extrabold" style={{ color: item.color }}>{item.value}</ThemedText>
      <ThemedText className="text-[11px] mt-0.5" style={{ color: theme.textSecondary }}>{item.unit}</ThemedText>
      <ThemedText className="text-[11px] mt-0.5 font-medium" style={{ color: theme.textSecondary }}>{item.label}</ThemedText>
    </View>
  );
}

export function ActivitySummary() {
  const theme = useTheme();
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <View className="mt-6 px-5">
      <View className="flex-row justify-between items-center mb-3">
        <ThemedText className="text-lg font-bold">Today's Activity</ThemedText>
        <ThemedText className="text-[13px]" style={{ color: theme.textSecondary }}>{today}</ThemedText>
      </View>
      <View className="flex-row gap-2.5">
        {ACTIVITIES.map((item) => (
          <MiniCard key={item.label} item={item} />
        ))}
      </View>
    </View>
  );
}
