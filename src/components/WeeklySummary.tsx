import { View } from 'react-native';
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
      <View className="w-6 h-20 justify-end items-center">
        <View
          className="w-full rounded-[6]"
          style={{
            height: `${Math.max(barHeight, 2)}%`,
            minHeight: 3,
            backgroundColor: isToday ? theme.primary : theme.backgroundSelected,
            opacity: item.value > 0 ? 1 : 0.3,
          }}
        />
      </View>
      <ThemedText
        className="text-[11px] mt-1.5 font-semibold"
        style={isToday ? { color: theme.primary } : { color: theme.textSecondary }}
      >
        {item.day}
      </ThemedText>
      {item.value > 0 && (
        <ThemedText className="text-[9px] mt-0.5" style={{ color: theme.textSecondary }}>
          {item.value}km
        </ThemedText>
      )}
    </View>
  );
}

export function WeeklySummary() {
  const maxVal = Math.max(...WEEKLY_DATA.map((d) => d.value), 0.1);

  return (
    <View className="mt-6 px-5">
      <ThemedText className="text-lg font-bold mb-4">📈 Weekly Summary</ThemedText>
      <View className="flex-row justify-between items-end h-[120]">
        {WEEKLY_DATA.map((item, i) => (
          <Bar key={item.day} item={item} maxVal={maxVal} index={i} />
        ))}
      </View>
    </View>
  );
}
