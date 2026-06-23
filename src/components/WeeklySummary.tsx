import { View, StyleSheet } from 'react-native';
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
  const adjustedIndex = index === -1 ? 6 : index;

  return (
    <View style={styles.barContainer}>
      <View style={styles.barWrapper}>
        <View
          style={[
            styles.bar,
            {
              height: `${Math.max(barHeight, 2)}%`,
              backgroundColor: isToday ? theme.primary : theme.backgroundSelected,
              opacity: item.value > 0 ? 1 : 0.3,
            },
          ]}
        />
      </View>
      <ThemedText
        themeColor={isToday ? undefined : 'textSecondary'}
        style={[
          styles.dayLabel,
          isToday && { color: theme.primary, fontWeight: '700' },
        ]}
      >
        {item.day}
      </ThemedText>
      {item.value > 0 && (
        <ThemedText
          themeColor="textSecondary"
          style={styles.valueLabel}
        >
          {item.value}km
        </ThemedText>
      )}
    </View>
  );
}

export function WeeklySummary() {
  const maxVal = Math.max(...WEEKLY_DATA.map((d) => d.value), 0.1);

  return (
    <View style={styles.section}>
      <ThemedText style={styles.title}>📈 Weekly Summary</ThemedText>
      <View style={styles.chart}>
        {WEEKLY_DATA.map((item, i) => (
          <Bar key={item.day} item={item} maxVal={maxVal} index={i} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barWrapper: {
    width: 24,
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    borderRadius: 6,
    minHeight: 3,
  },
  dayLabel: {
    fontSize: 11,
    marginTop: 6,
    fontWeight: '600',
  },
  valueLabel: {
    fontSize: 9,
    marginTop: 1,
  },
});
