import { Fragment } from 'react';
import { ScrollView, Platform, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import Svg, { Circle } from 'react-native-svg';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HomeHeader } from '@/components/HomeHeader';
import { useTheme } from '@/hooks/use-theme';

const runPng = require('@/assets/logo/running.png');
const walkPng = require('@/assets/logo/walking.png');
const footstepsPng = require('@/assets/logo/footsteps.png');
const timePng = require('@/assets/logo/time.png');
const caloriesPng = require('@/assets/logo/calories.png');

function ThisWeekCard() {
  const theme = useTheme();
  const stats = [
    { label: 'Distance', value: '18.5', unit: 'km' },
    { label: 'Time', value: '142', unit: 'min' },
    { label: 'Calories', value: '1,240', unit: 'kcal' },
    { label: 'Activities', value: '6', unit: 'runs' },
  ];

  return (
    <View className="mx-5 rounded-3xl p-5" style={{ backgroundColor: theme.card }}>
      <View className="flex-row items-center mb-4">
        <View className="w-1 h-5 rounded-full mr-2.5" style={{ backgroundColor: theme.primary }} />
        <ThemedText className="text-lg font-bold flex-1">This Week</ThemedText>
        <ThemedText className="text-[12px]" style={{ color: theme.textSecondary }}>Mar 23 - 29</ThemedText>
      </View>
      <View className="flex-row">
        {stats.map((s) => (
          <View key={s.label} className="flex-1 items-center">
            <ThemedText className="text-xl font-extrabold text-white">{s.value}</ThemedText>
            <ThemedText className="text-[10px] mt-1" style={{ color: theme.textSecondary }}>{s.unit}</ThemedText>
            <ThemedText className="text-[11px] mt-0.5 font-medium" style={{ color: theme.textSecondary }}>{s.label}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

function ConcentricRings({ rings }: { rings: { color: string; progress: number }[] }) {
  const size = 150;
  const strokew = 12;
  const gap = 4;
  const radii = rings.map((_, i) => (size - strokew) / 2 - i * (strokew + gap));

  return (
    <Svg width={size} height={size}>
      {rings.map((r, i) => {
        const rad = radii[i];
        const circ = 2 * Math.PI * rad;
        const offset = circ * (1 - Math.min(r.progress, 1));
        return (
          <Fragment key={i}>
            <Circle cx={size / 2} cy={size / 2} r={rad} stroke="rgba(255,255,255,0.05)" strokeWidth={strokew} fill="none" />
            <Circle
              cx={size / 2} cy={size / 2} r={rad} stroke={r.color} strokeWidth={strokew} fill="none"
              strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
              rotation="-90" origin={`${size / 2}, ${size / 2}`}
            />
          </Fragment>
        );
      })}
    </Svg>
  );
}

function ActivityRingsCard() {
  const theme = useTheme();
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const rings = [
    { label: 'Steps', value: '6,420', goal: '10,000', unit: 'steps', progress: 6420 / 10000, color: '#B7FF3C', icon: footstepsPng },
    { label: 'Active Time', value: '28', goal: '45', unit: 'min', progress: 28 / 45, color: '#007AFF', icon: timePng },
    { label: 'Calories', value: '340', goal: '500', unit: 'kcal', progress: 340 / 500, color: '#FF7A00', icon: caloriesPng },
  ];

  return (
    <View className="mx-5 mt-4 rounded-3xl p-5" style={{ backgroundColor: theme.card }}>
      <View className="flex-row items-center mb-5">
        <View className="w-1 h-5 rounded-full mr-2.5" style={{ backgroundColor: theme.primary }} />
        <ThemedText className="text-lg font-bold flex-1">Today</ThemedText>
        <ThemedText className="text-[12px]" style={{ color: theme.textSecondary }}>{today}</ThemedText>
      </View>
      <View className="flex-row items-center">
        <View className="mr-5">
          <ConcentricRings rings={rings} />
        </View>
        <View className="flex-1 gap-4">
          {rings.map((r) => (
            <View key={r.label} className="flex-row items-center">
              <View className="w-9 h-9 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: `${r.color}18` }}>
                <Image source={r.icon} style={{ width: 20, height: 20 }} />
              </View>
              <View className="flex-1">
                <ThemedText className="text-[13px] font-semibold">{r.label}</ThemedText>
                <ThemedText className="text-[10px] mt-0.5" style={{ color: theme.textSecondary }}>{r.value} / {r.goal} {r.unit}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const RECENT_ACTIVITIES = [
  { title: 'Morning Run', type: 'run', distance: '5.2', time: '28', date: 'Today' },
  { title: 'Evening Walk', type: 'walk', distance: '3.8', time: '20', date: 'Yesterday' },
  { title: 'Afternoon Run', type: 'run', distance: '6.1', time: '33', date: 'Jun 23' },
  { title: 'Night Walk', type: 'walk', distance: '2.4', time: '15', date: 'Jun 21' },
];

const iconMap: Record<string, { source: any; color: string }> = {
  run: { source: runPng, color: '#B7FF3C' },
  walk: { source: walkPng, color: '#30D158' },
};

function RecentActivities() {
  const theme = useTheme();

  return (
    <View className="mx-5 mt-4 rounded-3xl p-5" style={{ backgroundColor: theme.card }}>
      <View className="flex-row items-center mb-2">
        <View className="w-1 h-5 rounded-full mr-2.5" style={{ backgroundColor: theme.primary }} />
        <ThemedText className="text-lg font-bold flex-1">Recent Activities</ThemedText>
        <Pressable>
          <ThemedText className="text-[13px] font-semibold" style={{ color: theme.primary }}>See All</ThemedText>
        </Pressable>
      </View>
      {RECENT_ACTIVITIES.map((a, i) => {
        const meta = iconMap[a.type];
        return (
          <View
            key={a.title}
            className="flex-row items-center py-3.5"
            style={{ borderBottomWidth: i < RECENT_ACTIVITIES.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.04)' }}
          >
            <View className="w-9 h-9 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: `${meta.color}18` }}>
              <Image source={meta.source} style={{ width: 20, height: 20 }} />
            </View>
            <View className="flex-1">
              <ThemedText className="text-[15px] font-semibold">{a.title}</ThemedText>
              <View className="flex-row items-center gap-3 mt-0.5">
                <ThemedText className="text-[12px]" themeColor="textSecondary">{a.distance} km</ThemedText>
                <ThemedText className="text-[12px]" themeColor="textSecondary">{a.time} min</ThemedText>
              </View>
            </View>
            <ThemedText className="text-[12px]" style={{ color: theme.textSecondary }}>{a.date}</ThemedText>
          </View>
        );
      })}
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1">
      <HomeHeader />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 8, paddingBottom: Platform.OS === 'ios' ? 120 : 100 }}
        showsVerticalScrollIndicator={false}
      >
        <ThisWeekCard />
        <ActivityRingsCard />
        <RecentActivities />
        <ThemedText className="text-center text-xs mt-8 mb-2" themeColor="textSecondary">Stepzo v1.0.0 — Stay active</ThemedText>
      </ScrollView>
    </ThemedView>
  );
}
