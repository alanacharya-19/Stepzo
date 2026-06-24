import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

type DayData = {
  day: string;
  value: number;
};

const WEEKLY_DATA: DayData[] = [
  { day: 'Mon', value: 2.0 },
  { day: 'Tue', value: 3.0 },
  { day: 'Wed', value: 0 },
  { day: 'Thu', value: 5.0 },
  { day: 'Fri', value: 2.0 },
  { day: 'Sat', value: 0 },
  { day: 'Sun', value: 0 },
];

function Bar({ item, maxVal, index }: { item: DayData; maxVal: number; index: number }) {
  const theme = useTheme();
  const todayIndex = (new Date().getDay() + 6) % 7;
  const isToday = index === todayIndex;
  const barHeight = maxVal > 0 ? (item.value / maxVal) * 100 : 0;

  return (
    <View className="flex-1 items-center justify-end">
      <View className="w-full items-center justify-end" style={{ height: 90 }}>
        {item.value > 0 && (
          <ThemedText className="text-[9px] mb-1.5 font-medium" style={{ color: theme.textSecondary }}>
            {item.value}
          </ThemedText>
        )}
        {isToday && item.value > 0 ? (
          <LinearGradient
            colors={['#00D4FF', '#0088FF']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="w-[70%] rounded-t-md rounded-b-sm"
            style={{ height: `${Math.max(barHeight, 4)}%` }}
          />
        ) : (
          <View
            className="w-[70%] rounded-t-md rounded-b-sm"
            style={{
              height: `${Math.max(barHeight, 2)}%`,
              backgroundColor: theme.backgroundSelected,
              opacity: item.value > 0 ? 0.8 : 0.2,
            }}
          />
        )}
      </View>
      <ThemedText
        className="text-[10px] mt-2 font-semibold"
        style={isToday ? { color: theme.primary } : { color: theme.textSecondary }}
      >
        {item.day}
      </ThemedText>
    </View>
  );
}

export function WeeklySummary() {
  const theme = useTheme();
  const maxVal = Math.max(...WEEKLY_DATA.map((d) => d.value), 0.1);

  return (
    <View className="mx-5 mt-6 rounded-3xl p-5" style={{ backgroundColor: theme.card }}>
      <View className="flex-row items-center gap-2.5 mb-5">
        <View className="w-1 h-5 rounded-full" style={{ backgroundColor: theme.primary }} />
        <ThemedText className="text-lg font-bold">📈 Weekly Summary</ThemedText>
      </View>
      <View className="flex-row justify-between items-end">
        {WEEKLY_DATA.map((item, i) => (
          <Bar key={item.day} item={item} maxVal={maxVal} index={i} />
        ))}
      </View>
    </View>
  );
}
