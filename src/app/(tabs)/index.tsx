import { useState, useCallback, Fragment } from 'react';
import { ScrollView, Platform, View, Pressable, TextInput, Modal, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { HomeHeader } from '@/components/HomeHeader';
import { useTheme } from '@/hooks/use-theme';
import { loadRuns, deleteRun } from '@/utils/storage';
import { loadGoals, saveGoals, calcWeeklyDistance, calcMonthlyDistance, calcStreak } from '@/utils/goals';
import { checkAchievements, ALL_ACHIEVEMENTS } from '@/utils/achievements';
import type { RunData } from '@/types';
import { router } from 'expo-router';
import { CelebrationOverlay } from '@/components/CelebrationOverlay';
import { AnimatedNumber } from '@/components/AnimatedNumber';

const runPng = require('@/assets/logo/running.png');
const walkPng = require('@/assets/logo/walking.png');
const footstepsPng = require('@/assets/logo/footsteps.png');
const timePng = require('@/assets/logo/time.png');
const calPng = require('@/assets/logo/calories.png');
const streakPng = require('@/assets/logo/streak.png');

function ThisWeekCard({ runs }: { runs: RunData[] }) {
  const theme = useTheme();
  const distance = runs.reduce((s, r) => s + r.distance, 0);
  const duration = runs.reduce((s, r) => s + r.duration, 0);
  const cal = Math.round(distance * 65);
  const count = runs.length;
  const wkStats = [
    { label: 'Distance', value: distance, decimals: 1, unit: 'km' },
    { label: 'Time', value: Math.floor(duration / 60), decimals: 0, unit: 'min' },
    { label: 'Calories', value: cal, decimals: 0, unit: 'kcal' },
    { label: 'Activities', value: count, decimals: 0, unit: 'runs' },
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
            <AnimatedNumber value={s.value} decimals={s.decimals} style={{ fontSize: 22, fontWeight: '600', letterSpacing: -0.3, color: '#FFFFFF' }} />
            <ThemedText className="text-[10px] mt-1.5" style={{ color: theme.textSecondary }}>{s.unit}</ThemedText>
            <ThemedText className="text-[10px] mt-0.5 font-medium" style={{ color: theme.textSecondary }}>{s.label}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

function StreakBadge({ streak }: { streak: number }) {
  const theme = useTheme();
  return (
    <View className="mx-6 mt-4 rounded-2xl p-4 flex-row items-center" style={{ backgroundColor: theme.card }}>
      <View className="w-10 h-10 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: `${theme.primary}12` }}>
        <Image source={streakPng} style={{ width: 22, height: 22 }} />
      </View>
      <View className="flex-1">
        <ThemedText className="text-[15px] font-bold">Running Streak</ThemedText>
        <ThemedText className="text-[11px] mt-0.5" style={{ color: theme.textSecondary }}>
          {streak > 0 ? `You've run ${streak} day${streak > 1 ? 's' : ''} in a row!` : 'Start a streak today'}
        </ThemedText>
      </View>
      <View className="items-center">
        <AnimatedNumber value={streak} style={{ fontSize: 22, fontWeight: '700', color: theme.primary }} />
        <ThemedText className="text-[9px]" style={{ color: theme.textSecondary }}>days</ThemedText>
      </View>
    </View>
  );
}

function GoalProgress({ label, current, target, color }: { label: string; current: number; target: number; color: string }) {
  const theme = useTheme();
  const pct = Math.min(current / target, 1);
  return (
    <View className="mb-3">
      <View className="flex-row items-center mb-1.5">
        <ThemedText className="text-[13px] font-semibold flex-1">{label}</ThemedText>
        <ThemedText className="text-[12px]" style={{ color: theme.textSecondary }}>{current.toFixed(1)} / {target} km</ThemedText>
      </View>
      <View className="h-2.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
        <View className="h-full rounded-full" style={{ width: `${Math.min(pct * 100, 100)}%`, backgroundColor: pct >= 1 ? '#22C55E' : color }} />
      </View>
    </View>
  );
}

function GoalsCard({ runs, goals, onEdit }: { runs: RunData[]; goals: { weeklyDistance: number; monthlyDistance: number }; onEdit: () => void }) {
  const theme = useTheme();
  const weekly = calcWeeklyDistance(runs);
  const monthly = calcMonthlyDistance(runs);

  return (
    <View className="mx-6 mt-4 rounded-2xl p-5" style={{ backgroundColor: theme.card }}>
      <View className="flex-row items-center mb-4">
        <ThemedText className="text-[15px] font-bold flex-1">Goals</ThemedText>
        <Pressable onPress={onEdit}>
          <Ionicons name="settings-outline" size={18} color={theme.textSecondary} />
        </Pressable>
      </View>
      <GoalProgress label="Weekly Distance" current={weekly} target={goals.weeklyDistance} color="#3B82F6" />
      <GoalProgress label="Monthly Distance" current={monthly} target={goals.monthlyDistance} color="#A855F7" />
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
    { label: 'Steps', value: steps, goal: '10,000', unit: 'steps', p: Math.min(steps / 10000, 1), c: '#B7FF3C', icon: footstepsPng },
    { label: 'Active Time', value: activeMin, goal: '45', unit: 'min', p: Math.min(activeMin / 45, 1), c: '#007AFF', icon: timePng },
    { label: 'Calories', value: cals, goal: '500', unit: 'kcal', p: Math.min(cals / 500, 1), c: '#FF7A00', icon: calPng },
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
                <View className="flex-row items-center mt-0.5">
                  <AnimatedNumber value={r.value} style={{ fontSize: 10, color: theme.textSecondary }} />
                  <ThemedText className="text-[10px]" style={{ color: theme.textSecondary }}> / {r.goal} {r.unit}</ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function RecentCard({ runs, onSelect, onDelete }: { runs: RunData[]; onSelect: (id: string) => void; onDelete: (id: string) => void }) {
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
        <Pressable key={a.id} onPress={() => onSelect(a.id)} onLongPress={() => { Alert.alert('Delete Run', `Delete "${a.title}"?`, [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => onDelete(a.id) }]); }} className="flex-row items-center px-5 py-3.5" style={{ borderBottomWidth: i < Math.min(runs.length, 10) - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.03)' }}>
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
  const theme = useTheme();
  const [runs, setRuns] = useState<RunData[]>([]);
  const [streak, setStreak] = useState(0);
  const [goals, setGoals] = useState({ weeklyDistance: 15, monthlyDistance: 60 });
  const [goalModal, setGoalModal] = useState(false);
  const [weeklyTarget, setWeeklyTarget] = useState('15');
  const [monthlyTarget, setMonthlyTarget] = useState('60');
  const [celebration, setCelebration] = useState<{ title: string; subtitle: string } | null>(null);

  useFocusEffect(useCallback(() => {
    (async () => {
      const r = await loadRuns();
      setRuns(r);
      setStreak(calcStreak(r));
      const g = await loadGoals();
      setGoals(g);
      setWeeklyTarget(String(g.weeklyDistance));
      setMonthlyTarget(String(g.monthlyDistance));
      const newA = await checkAchievements(r);
      if (newA.length > 0) {
        const a = ALL_ACHIEVEMENTS.find((a) => a.id === newA[0]);
        if (a) setCelebration({ title: a.title, subtitle: a.subtitle });
      }
    })();
  }, []));

  const handleSaveGoals = async () => {
    const w = Math.max(1, Number(weeklyTarget) || 15);
    const m = Math.max(1, Number(monthlyTarget) || 60);
    await saveGoals({ weeklyDistance: w, monthlyDistance: m });
    setGoalModal(false);
  };

  return (
    <ThemedView className="flex-1">
      <HomeHeader />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 120 : 100 }} showsVerticalScrollIndicator={false}>
        <ThisWeekCard runs={runs} />
        <StreakBadge streak={streak} />
        <GoalsCard runs={runs} goals={goals} onEdit={() => setGoalModal(true)} />
        <TodayCard runs={runs} />
        <RecentCard runs={runs} onSelect={(id) => router.push(`/run-detail/${id}`)} onDelete={async (id) => { await deleteRun(id); setRuns((prev) => prev.filter((r) => r.id !== id)); }} />
        <ThemedText className="text-center text-[11px] mt-8 mb-2" themeColor="textSecondary">Stepzo v1.0.0</ThemedText>
      </ScrollView>

      <Modal visible={goalModal} transparent animationType="fade" onRequestClose={() => setGoalModal(false)}>
        <Pressable className="flex-1 items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onPress={() => setGoalModal(false)}>
          <Pressable className="w-[85%] rounded-2xl p-6" style={{ backgroundColor: theme.card }} onPress={() => {}}>
            <ThemedText className="text-[18px] font-bold mb-1">Set Goals</ThemedText>
            <ThemedText className="text-[13px] mb-5" style={{ color: theme.textSecondary }}>Set your weekly and monthly distance targets</ThemedText>

            <ThemedText className="text-[13px] font-semibold mb-1.5">Weekly Distance (km)</ThemedText>
            <TextInput
              className="h-[48] rounded-xl border px-4 text-[15px] mb-4"
              style={{ backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }}
              value={weeklyTarget}
              onChangeText={setWeeklyTarget}
              keyboardType="numeric"
              placeholderTextColor={theme.textSecondary}
            />

            <ThemedText className="text-[13px] font-semibold mb-1.5">Monthly Distance (km)</ThemedText>
            <TextInput
              className="h-[48] rounded-xl border px-4 text-[15px] mb-6"
              style={{ backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }}
              value={monthlyTarget}
              onChangeText={setMonthlyTarget}
              keyboardType="numeric"
              placeholderTextColor={theme.textSecondary}
            />

            <Pressable className="h-[48] rounded-xl items-center justify-center" style={{ backgroundColor: theme.primary }} onPress={handleSaveGoals}>
              <ThemedText className="text-[16px] font-bold" style={{ color: '#0B1020' }}>Save Goals</ThemedText>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      <CelebrationOverlay
        title={celebration?.title ?? ''}
        subtitle={celebration?.subtitle ?? ''}
        visible={celebration !== null}
        onDismiss={() => setCelebration(null)}
      />
    </ThemedView>
  );
}
