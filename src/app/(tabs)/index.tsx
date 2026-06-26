import { ScrollView, Platform, View, Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HomeHeader } from '@/components/HomeHeader';
import { useTheme } from '@/hooks/use-theme';
function ThisWeekCard() {
  const theme = useTheme();

  const stats = [
    { label: 'Distance', value: '18.5', unit: 'km', color: '#3B82F6' },
    { label: 'Time', value: '142', unit: 'min', color: '#A855F7' },
    { label: 'Calories', value: '1,240', unit: 'kcal', color: '#FF7A00' },
    { label: 'Activities', value: '6', unit: 'runs', color: '#B7FF3C' },
  ];

  return (
    <View className="mx-5 rounded-3xl overflow-hidden" style={{ backgroundColor: theme.card }}>
      <View className="flex-row items-center gap-2.5 px-5 pt-5 pb-3">
        <View className="w-1 h-5 rounded-full" style={{ backgroundColor: theme.primary }} />
        <ThemedText className="text-lg font-bold flex-1">This Week</ThemedText>
        <ThemedText className="text-[12px]" style={{ color: theme.textSecondary }}>Mar 23 - 29</ThemedText>
      </View>
      <View className="flex-row px-3 pb-5">
        {stats.map((s) => (
          <View key={s.label} className="flex-1 items-center py-3">
            <ThemedText className="text-xl font-extrabold" style={{ color: s.color }}>{s.value}</ThemedText>
            <ThemedText className="text-[10px] mt-0.5" style={{ color: theme.textSecondary }}>{s.unit}</ThemedText>
            <ThemedText className="text-[11px] mt-1 font-medium" style={{ color: theme.textSecondary }}>{s.label}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const RING_SIZE = 80;
const STROKE = 8;
const RADIUS = (RING_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function Ring({ progress, color, bg }: { progress: number; color: string; bg: string }) {
  const offset = CIRCUMFERENCE * (1 - Math.min(progress, 1));
  return (
    <Svg width={RING_SIZE} height={RING_SIZE}>
      <Circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RADIUS} stroke={bg} strokeWidth={STROKE} fill="none" />
      <Circle
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RADIUS}
        stroke={color}
        strokeWidth={STROKE}
        fill="none"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        strokeLinecap="round"
        rotation="-90"
        origin={`${RING_SIZE / 2}, ${RING_SIZE / 2}`}
      />
    </Svg>
  );
}

function ActivityRingsCard() {
  const theme = useTheme();

  const rings = [
    { label: 'Move', value: '520', goal: '600', unit: 'cal', progress: 520 / 600, color: '#FF3B30' },
    { label: 'Exercise', value: '32', goal: '30', unit: 'min', progress: 32 / 30, color: '#30D158' },
    { label: 'Stand', value: '10', goal: '12', unit: 'hrs', progress: 10 / 12, color: '#007AFF' },
  ];

  return (
    <View className="mx-5 mt-4 rounded-3xl overflow-hidden" style={{ backgroundColor: theme.card }}>
      <View className="flex-row items-center gap-2.5 px-5 pt-5 pb-3">
        <View className="w-1 h-5 rounded-full" style={{ backgroundColor: theme.primary }} />
        <ThemedText className="text-lg font-bold flex-1">Activity Rings</ThemedText>
      </View>
      <View className="flex-row items-center justify-evenly px-3 pb-6">
        {rings.map((r) => (
          <View key={r.label} className="items-center">
            <Ring progress={r.progress} color={r.color} bg="rgba(255,255,255,0.06)" />
            <ThemedText className="text-[13px] font-bold mt-2" style={{ color: r.color }}>{r.value}</ThemedText>
            <ThemedText className="text-[10px]" style={{ color: theme.textSecondary }}>{r.label}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const RECENT_ACTIVITIES = [
  { day: 'Today', date: 'Jun 26', distance: '5.2', time: '28', pace: '5:23', kcal: '340' },
  { day: 'Yesterday', date: 'Jun 25', distance: '3.8', time: '20', pace: '5:16', kcal: '248' },
  { day: 'Mon', date: 'Jun 23', distance: '6.1', time: '33', pace: '5:25', kcal: '398' },
  { day: 'Sat', date: 'Jun 21', distance: '4.5', time: '24', pace: '5:20', kcal: '294' },
];

function RecentActivities() {
  const theme = useTheme();

  return (
    <View className="mx-5 mt-4 rounded-3xl overflow-hidden" style={{ backgroundColor: theme.card }}>
      <View className="flex-row items-center gap-2.5 px-5 pt-5 pb-3">
        <View className="w-1 h-5 rounded-full" style={{ backgroundColor: theme.primary }} />
        <ThemedText className="text-lg font-bold flex-1">Recent Activities</ThemedText>
        <Pressable>
          <ThemedText className="text-[13px] font-semibold" style={{ color: theme.primary }}>See All</ThemedText>
        </Pressable>
      </View>
      {RECENT_ACTIVITIES.map((a, i) => (
        <View
          key={a.day}
          className="flex-row items-center mx-4 py-3.5"
          style={{ borderBottomWidth: i < RECENT_ACTIVITIES.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.04)' }}
        >
          <View className="flex-1">
            <ThemedText className="text-[15px] font-semibold">{a.day}</ThemedText>
            <ThemedText className="text-[11px] mt-0.5" style={{ color: theme.textSecondary }}>{a.date}</ThemedText>
          </View>
          <View className="items-center mx-4">
            <ThemedText className="text-[15px] font-bold" style={{ color: '#3B82F6' }}>{a.distance}</ThemedText>
            <ThemedText className="text-[9px]" style={{ color: theme.textSecondary }}>km</ThemedText>
          </View>
          <View className="items-center mx-4">
            <ThemedText className="text-[15px] font-bold" style={{ color: '#A855F7' }}>{a.time}</ThemedText>
            <ThemedText className="text-[9px]" style={{ color: theme.textSecondary }}>min</ThemedText>
          </View>
          <View className="items-center mx-4">
            <ThemedText className="text-[15px] font-bold" style={{ color: '#FF7A00' }}>{a.kcal}</ThemedText>
            <ThemedText className="text-[9px]" style={{ color: theme.textSecondary }}>kcal</ThemedText>
          </View>
        </View>
      ))}
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1">
      <HomeHeader />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 120 : 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <ThisWeekCard />
        <ActivityRingsCard />
        <RecentActivities />

        <ThemedText
          className="text-center text-xs mt-8 mb-2"
          themeColor="textSecondary"
        >
          Stepzo v1.0.0 — Stay active
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}
