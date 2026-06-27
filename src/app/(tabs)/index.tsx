import { useState, useCallback, Fragment } from 'react';
import { ScrollView, Platform, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HomeHeader } from '@/components/HomeHeader';
import { useTheme } from '@/hooks/use-theme';
import { loadRuns } from '@/utils/storage';
import type { RunData } from '@/types';
import { router } from 'expo-router';

const runPng = require('@/assets/logo/running.png');
const walkPng = require('@/assets/logo/walking.png');
const footstepsPng = require('@/assets/logo/footsteps.png');
const timePng = require('@/assets/logo/time.png');
const calPng = require('@/assets/logo/calories.png');

function SectionHeader({ title, right }: { title: string; right?: string }) {
  const theme = useTheme();
  return (
    <View className="flex-row items-center mb-4 px-6">
      <ThemedText className="text-[17px] font-bold flex-1">{title}</ThemedText>
      {right && <ThemedText className="text-[13px]" style={{ color: theme.primary }}>{right}</ThemedText>}
    </View>
  );
}

function ThisWeekCard({ runs }: { runs: RunData[] }) {
  const theme = useTheme();
  const distance = runs.reduce((s, r) => s + r.distance, 0);
  const duration = runs.reduce((s, r) => s + r.duration, 0);
  const cal = Math.round(distance * 65);
  const count = runs.length;
  const wkStats = [
    { label: 'Distance', value: distance.toFixed(1), unit: 'km' },
    { label: 'Time', value: `${Math.floor(duration / 60)}`, unit: 'min' },
    { label: 'Calories', value: cal.toLocaleString(), unit: 'kcal' },
    { label: 'Activities', value: `${count}`, unit: 'runs' },
  ];
  return (
    <View className="mx-6 rounded-2xl p-5" style={{ backgroundColor: theme.card }}>
      <View className="flex-row items-center mb-5">
        <ThemedText className="text-[15px] font-bold flex-1">This Week</ThemedText>
        <ThemedText className="text-[12px]" style={{ color: theme.textSecondary }}>
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </ThemedText>
      </View>
      <View className="flex-row">
        {wkStats.map((s) => (
          <View key={s.label} className="flex-1 items-center">
            <ThemedText className="text-[22px] font-semibold tracking-tight text-white">{s.value}</ThemedText>
            <ThemedText className="text-[10px] mt-1.5" style={{ color: theme.textSecondary }}>{s.unit}</ThemedText>
            <ThemedText className="text-[10px] mt-0.5 font-medium" style={{ color: theme.textSecondary }}>{s.label}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

function ConcentricRings({ rings }: { rings: { color: string; progress: number }[] }) {
  const size = 130;
  const sw = 10;
  const gap = 3;
  const radii = rings.map((_, i) => (size - sw) / 2 - i * (sw + gap));
  return (
    <Svg width={size} height={size}>
      {rings.map((r, i) => {
        const rad = radii[i];
        const circ = 2 * Math.PI * rad;
        const off = circ * (1 - Math.min(r.progress, 1));
        return (
          <Fragment key={i}>
            <Circle cx={size / 2} cy={size / 2} r={rad} stroke="rgba(255,255,255,0.04)" strokeWidth={sw} fill="none" />
            <Circle cx={size / 2} cy={size / 2} r={rad} stroke={r.color} strokeWidth={sw} fill="none" strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" rotation="-90" origin={`${size / 2}, ${size / 2}`} />
          </Fragment>
        );
      })}
    </Svg>
  );
}

function TodayCard({ runs }: { runs: RunData[] }) {
  const theme = useTheme();
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const todayRuns = runs.filter((r) => {
    const rd = new Date(Number(r.id));
    const now = new Date();
    return rd.toDateString() === now.toDateString();
  });
  const steps = Math.round(todayRuns.reduce((s, r) => s + r.distance, 0) * 1300);
  const activeMin = Math.round(todayRuns.reduce((s, r) => s + r.duration, 0) / 60);
  const cals = Math.round(todayRuns.reduce((s, r) => s + r.distance, 0) * 65);

  const rings = [
    { label: 'Steps', value: steps.toLocaleString(), goal: '10,000', unit: 'steps', p: Math.min(steps / 10000, 1), c: '#B7FF3C', icon: footstepsPng },
    { label: 'Active Time', value: `${activeMin}`, goal: '45', unit: 'min', p: Math.min(activeMin / 45, 1), c: '#007AFF', icon: timePng },
    { label: 'Calories', value: `${cals}`, goal: '500', unit: 'kcal', p: Math.min(cals / 500, 1), c: '#FF7A00', icon: calPng },
  ];

  return (
    <View className="mx-6 mt-4 rounded-2xl p-5" style={{ backgroundColor: theme.card }}>
      <View className="flex-row items-center mb-4">
        <ThemedText className="text-[15px] font-bold flex-1">Today</ThemedText>
        <ThemedText className="text-[12px]" style={{ color: theme.textSecondary }}>{today}</ThemedText>
      </View>
      <View className="flex-row items-center">
        <View className="mr-5"><ConcentricRings rings={rings.map(r => ({ color: r.c, progress: r.p }))} /></View>
        <View className="flex-1 gap-3">
          {rings.map((r) => (
            <View key={r.label} className="flex-row items-center">
              <View className="w-8 h-8 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: `${r.c}15` }}>
                <Image source={r.icon} style={{ width: 18, height: 18 }} />
              </View>
              <View className="flex-1">
                <ThemedText className="text-[12px] font-semibold">{r.label}</ThemedText>
                <ThemedText className="text-[10px] mt-0.5" style={{ color: theme.textSecondary }}>{r.value} / {r.goal} {r.unit}</ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function RecentCard({ runs, onSelect }: { runs: RunData[]; onSelect: (id: string) => void }) {
  const theme = useTheme();
  if (runs.length === 0) {
    return (
      <View className="mx-6 mt-4 rounded-2xl p-6 items-center" style={{ backgroundColor: theme.card }}>
        <ThemedText className="text-[14px]" style={{ color: theme.textSecondary }}>No runs yet. Start your first run!</ThemedText>
      </View>
    );
  }
  return (
    <View className="mx-6 mt-4 rounded-2xl overflow-hidden" style={{ backgroundColor: theme.card }}>
      <View className="flex-row items-center px-5 pt-5 pb-2">
        <ThemedText className="text-[15px] font-bold flex-1">Recent Activities</ThemedText>
      </View>
      {runs.slice(0, 10).map((a, i) => (
        <Pressable key={a.id} onPress={() => onSelect(a.id)} className="flex-row items-center px-5 py-3.5" style={{ borderBottomWidth: i < Math.min(runs.length, 10) - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.03)' }}>
          <View className="w-9 h-9 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: `${theme.primary}12` }}>
            <Image source={a.distance > 2 ? runPng : walkPng} style={{ width: 20, height: 20 }} />
          </View>
          <View className="flex-1">
            <ThemedText className="text-[14px] font-semibold">{a.title}</ThemedText>
            <View className="flex-row items-center gap-3 mt-0.5">
              <ThemedText className="text-[11px]" themeColor="textSecondary">{a.distance.toFixed(1)} km</ThemedText>
              <ThemedText className="text-[11px]" themeColor="textSecondary">{Math.round(a.duration / 60)} min</ThemedText>
            </View>
          </View>
          <ThemedText className="text-[11px]" style={{ color: theme.textSecondary }}>{a.date}</ThemedText>
        </Pressable>
      ))}
    </View>
  );
}

export default function HomeScreen() {
  const [runs, setRuns] = useState<RunData[]>([]);

  useFocusEffect(useCallback(() => {
    loadRuns().then(setRuns);
  }, []));

  return (
    <ThemedView className="flex-1">
      <HomeHeader />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 120 : 100 }} showsVerticalScrollIndicator={false}>
        <ThisWeekCard runs={runs} />
        <TodayCard runs={runs} />
        <RecentCard runs={runs} onSelect={(id) => router.push(`/run-detail/${id}`)} />
        <ThemedText className="text-center text-[11px] mt-8 mb-2" themeColor="textSecondary">Stepzo v1.0.0</ThemedText>
      </ScrollView>
    </ThemedView>
  );
}
