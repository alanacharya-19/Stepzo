import { View } from 'react-native';
import { Image } from 'expo-image';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

type ActivityItem = {
  icon: any;
  label: string;
  value: string;
  unit: string;
  tint: string;
};

const ACTIVITIES: ActivityItem[] = [
  { icon: require('@/assets/logo/running.png'), label: 'Distance', value: '3.2', unit: 'km', tint: '#3B82F6' },
  { icon: require('@/assets/logo/time.png'), label: 'Time', value: '28', unit: 'min', tint: '#A855F7' },
  { icon: require('@/assets/logo/calories.png'), label: 'Calories', value: '210', unit: 'kcal', tint: '#FF7A00' },
  { icon: require('@/assets/logo/footsteps.png'), label: 'Steps', value: '4,200', unit: 'steps', tint: '#B7FF3C' },
];

function MiniCard({ item }: { item: ActivityItem }) {
  const theme = useTheme();

  return (
    <View className="flex-1 rounded-2xl overflow-hidden" style={{ backgroundColor: theme.card }}>
      <View className="h-1" style={{ backgroundColor: item.tint }} />
      <View className="p-3 items-center">
        <View className="w-10 h-10 rounded-xl items-center justify-center mb-2" style={{ backgroundColor: `${item.tint}18` }}>
          <Image source={item.icon} style={{ width: 22, height: 22 }} />
        </View>
        <ThemedText className="text-lg font-extrabold" style={{ color: item.tint }}>{item.value}</ThemedText>
        <ThemedText className="text-[10px] mt-0.5" style={{ color: theme.textSecondary }}>{item.unit}</ThemedText>
        <ThemedText className="text-[10px] mt-1 font-medium" style={{ color: theme.textSecondary }}>{item.label}</ThemedText>
      </View>
    </View>
  );
}

export function ActivitySummary() {
  const theme = useTheme();
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <View className="mt-6 px-5">
      <View className="flex-row items-center gap-2.5 mb-4">
        <View className="w-1 h-5 rounded-full" style={{ backgroundColor: theme.primary }} />
        <ThemedText className="text-lg font-bold flex-1">Today's Activity</ThemedText>
        <ThemedText className="text-[12px]" style={{ color: theme.textSecondary }}>{today}</ThemedText>
      </View>
      <View className="flex-row gap-2.5">
        {ACTIVITIES.map((item) => (
          <MiniCard key={item.label} item={item} />
        ))}
      </View>
    </View>
  );
}
