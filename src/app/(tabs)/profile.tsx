import { useState, useEffect, useCallback } from 'react';
import { ScrollView, Platform, View, Pressable, TextInput, Modal } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadRuns } from '@/utils/storage';
import { loadGoals, saveGoals } from '@/utils/goals';
import { loadEarned, ALL_ACHIEVEMENTS } from '@/utils/achievements';
import type { RunData } from '@/types';

const UK = "@stepzo_user_data";
const U = { n: 'Alan', a: 'A', e: 'alan@email.com' };
const lm: Record<string, string> = { gender: 'Gender', age: 'Age', height: 'Height', weight: 'Weight', frequency: 'Running Frequency', place: 'Terrain' };

const menu = [
  { l: 'Analytics', i: 'bar-chart-outline', c: '#B7FF3C', action: 'analytics' },
  { l: 'Account', i: 'person-outline', c: '#3B82F6', action: '' },
  { l: 'Notifications', i: 'notifications-outline', c: '#A855F7', action: '' },
  { l: 'Privacy', i: 'lock-closed-outline', c: '#FF7A00', action: '' },
  { l: 'Help & Support', i: 'help-circle-outline', c: '#0EA5E9', action: '' },
  { l: 'About', i: 'information-circle-outline', c: '#8B5CF6', action: '' },
];

function fmtPace(kmh: number) {
  if (kmh <= 0) return '0:00';
  const minPerKm = 60 / kmh;
  const m = Math.floor(minPerKm);
  const sec = Math.floor((minPerKm - m) * 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function ProfileScreen() {
  const t = useTheme();
  const [ud, setUd] = useState<Record<string, string>>({});
  const [runs, setRuns] = useState<RunData[]>([]);
  const [earned, setEarned] = useState<string[]>([]);
  const [weeklyTarget, setWeeklyTarget] = useState('15');
  const [monthlyTarget, setMonthlyTarget] = useState('60');
  const [goalModal, setGoalModal] = useState(false);

  useEffect(() => { AsyncStorage.getItem(UK).then(d => { if (d) setUd(JSON.parse(d)); }); }, []);

  useFocusEffect(useCallback(() => {
    (async () => {
      const r = await loadRuns();
      setRuns(r);
      setEarned(await loadEarned());
      const g = await loadGoals();
      setWeeklyTarget(String(g.weeklyDistance));
      setMonthlyTarget(String(g.monthlyDistance));
    })();
  }, []));

  const handleSaveGoals = async () => {
    await saveGoals({ weeklyDistance: Math.max(1, Number(weeklyTarget) || 15), monthlyDistance: Math.max(1, Number(monthlyTarget) || 60) });
    setGoalModal(false);
  };

  const en = Object.entries(ud).filter(([_, v]) => v);
  const totalDist = runs.reduce((s, r) => s + r.distance, 0);
  const totalDuration = runs.reduce((s, r) => s + r.duration, 0);
  const totalCal = Math.round(totalDist * 65);
  const bestRun = Math.max(...runs.map((r) => r.distance), 0);
  const avgPace = totalDuration > 0 ? (totalDist / (totalDuration / 3600)) : 0;

  const stats = [
    { l: 'Total Runs', v: `${runs.length}`, u: 'runs', i: require('@/assets/logo/running.png'), c: '#B7FF3C' },
    { l: 'Distance', v: totalDist.toFixed(0), u: 'km', i: require('@/assets/logo/footsteps.png'), c: '#3B82F6' },
    { l: 'Time', v: `${Math.floor(totalDuration / 60)}`, u: 'min', i: require('@/assets/logo/time.png'), c: '#A855F7' },
    { l: 'Calories', v: totalCal.toLocaleString(), u: 'kcal', i: require('@/assets/logo/calories.png'), c: '#FF7A00' },
    { l: 'Avg Pace', v: fmtPace(avgPace), u: '/km', i: require('@/assets/logo/achivement.png'), c: '#30D158' },
    { l: 'Best Run', v: bestRun.toFixed(1), u: 'km', i: require('@/assets/logo/level-up.png'), c: '#FFD60A' },
  ];

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 120 : 100 }} showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View className="mx-6 mt-14 rounded-2xl p-5" style={{ backgroundColor: t.card }}>
          <View className="flex-row justify-end mb-1">
            <Pressable className="w-9 h-9 rounded-xl items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
              <Ionicons name="settings-outline" size={20} color={t.textSecondary} />
            </Pressable>
          </View>
          <View className="flex-row items-center">
            <View className="w-20 h-20 rounded-full items-center justify-center" style={{ backgroundColor: t.primary }}>
              <ThemedText className="text-3xl font-bold text-white">{U.a}</ThemedText>
            </View>
            <View className="flex-1 ml-4">
              <ThemedText className="text-xl font-bold">{U.n}</ThemedText>
              <ThemedText className="text-[13px] mt-0.5" style={{ color: t.textSecondary }}>{U.e}</ThemedText>
              <Pressable className="mt-2.5 px-4 py-2 rounded-xl self-start" style={{ backgroundColor: '#8B5CF6' }} onPress={() => router.push('/onboarding')}>
                <ThemedText className="text-[13px] font-bold text-white">Edit Profile</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Your Info */}
        {en.length > 0 && (
          <View className="mx-6 mt-4 rounded-2xl p-5" style={{ backgroundColor: t.card }}>
            <ThemedText className="text-[15px] font-bold mb-3">Your Info</ThemedText>
            {en.map(([k, v], i) => (
              <View key={k} className="flex-row items-center py-2.5" style={{ borderBottomWidth: i < en.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.03)' }}>
                <ThemedText className="flex-1 text-[13px]" style={{ color: t.textSecondary }}>{lm[k] || k}</ThemedText>
                <ThemedText className="text-[13px] font-semibold">{v}</ThemedText>
              </View>
            ))}
          </View>
        )}

        {/* Activity Overview */}
        <View className="mx-6 mt-4 rounded-2xl p-5" style={{ backgroundColor: t.card }}>
          <View className="flex-row items-center mb-4">
            <ThemedText className="text-[15px] font-bold flex-1">Activity Overview</ThemedText>
            <ThemedText className="text-[12px]" style={{ color: t.textSecondary }}>All time</ThemedText>
          </View>
          <View className="flex-row flex-wrap">
            {stats.map((s) => (
              <View key={s.l} className="w-1/3 items-center py-2">
                <View className="w-9 h-9 rounded-xl items-center justify-center mb-2" style={{ backgroundColor: `${s.c}15` }}>
                  <Image source={s.i} style={{ width: 20, height: 20 }} />
                </View>
                <ThemedText className="text-[17px] font-bold" style={{ color: s.c }}>{s.v}</ThemedText>
                <ThemedText className="text-[9px] mt-0.5 font-medium" style={{ color: t.textSecondary }}>{s.u}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Goals */}
        <View className="mx-6 mt-4 rounded-2xl p-5" style={{ backgroundColor: t.card }}>
          <View className="flex-row items-center mb-3">
            <ThemedText className="text-[15px] font-bold flex-1">Goals</ThemedText>
            <Pressable onPress={() => setGoalModal(true)}>
              <ThemedText className="text-[13px]" style={{ color: t.primary }}>Edit</ThemedText>
            </Pressable>
          </View>
          <ThemedText className="text-[13px]" style={{ color: t.textSecondary }}>Weekly target: {weeklyTarget} km</ThemedText>
          <ThemedText className="text-[13px]" style={{ color: t.textSecondary }}>Monthly target: {monthlyTarget} km</ThemedText>
        </View>

        {/* Achievements */}
        <View className="mx-6 mt-4 rounded-2xl p-5" style={{ backgroundColor: t.card }}>
          <ThemedText className="text-[15px] font-bold mb-4">Achievements</ThemedText>
          <View className="flex-row flex-wrap">
            {ALL_ACHIEVEMENTS.map((a) => {
              const unlocked = earned.includes(a.id);
              return (
                <View key={a.id} className="w-1/4 items-center mb-4">
                  <View className="w-12 h-12 rounded-xl items-center justify-center mb-1.5" style={{ backgroundColor: unlocked ? `${t.primary}18` : 'rgba(255,255,255,0.03)' }}>
                    <Ionicons name={(a.icon === 'footsteps' ? 'walk' : a.icon === 'flame' ? 'flame' : a.icon === 'calendar' ? 'calendar' : a.icon === 'map' ? 'map' : a.icon === 'repeat' ? 'repeat' : 'trophy') as any} size={22} color={unlocked ? t.primary : 'rgba(255,255,255,0.2)'} />
                  </View>
                  <ThemedText className="text-[9px] font-semibold text-center" style={{ color: unlocked ? t.text : t.textDisabled }}>{a.title}</ThemedText>
                </View>
              );
            })}
          </View>
        </View>

        {/* Menu */}
        <View className="mx-6 mt-4 rounded-2xl overflow-hidden" style={{ backgroundColor: t.card }}>
          {menu.map((item, i) => (
            <Pressable key={item.l} onPress={() => { if (item.action === 'analytics') router.push('/charts'); }} className="flex-row items-center px-5 py-3.5" style={{ borderBottomWidth: i < menu.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.03)' }}>
              <View className="w-8 h-8 rounded-xl items-center justify-center" style={{ backgroundColor: `${item.c}15` }}>
                <Ionicons name={item.i as any} size={16} color={item.c} />
              </View>
              <ThemedText className="flex-1 ml-3 text-[14px]">{item.l}</ThemedText>
              <Ionicons name="chevron-forward" size={16} color={t.textSecondary} />
            </Pressable>
          ))}
        </View>

        {/* Logout */}
        <Pressable onPress={async () => { await AsyncStorage.removeItem('@stepzo_onboarding_done'); router.replace('/login'); }} className="mx-6 mt-5 rounded-2xl py-3.5 flex-row items-center justify-center gap-2" style={{ backgroundColor: t.card }}>
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <ThemedText className="text-[14px] font-semibold" style={{ color: '#EF4444' }}>Log Out</ThemedText>
        </Pressable>
      </ScrollView>

      {/* Goals Modal */}
      <Modal visible={goalModal} transparent animationType="fade" onRequestClose={() => setGoalModal(false)}>
        <Pressable className="flex-1 items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onPress={() => setGoalModal(false)}>
          <Pressable className="w-[85%] rounded-2xl p-6" style={{ backgroundColor: t.card }} onPress={() => {}}>
            <ThemedText className="text-[18px] font-bold mb-1">Set Goals</ThemedText>
            <ThemedText className="text-[13px] mb-5" style={{ color: t.textSecondary }}>Set your weekly and monthly distance targets</ThemedText>
            <ThemedText className="text-[13px] font-semibold mb-1.5">Weekly Distance (km)</ThemedText>
            <TextInput className="h-[48] rounded-xl border px-4 text-[15px] mb-4" style={{ backgroundColor: t.inputBackground, borderColor: t.inputBorder, color: t.text }} value={weeklyTarget} onChangeText={setWeeklyTarget} keyboardType="numeric" placeholderTextColor={t.textSecondary} />
            <ThemedText className="text-[13px] font-semibold mb-1.5">Monthly Distance (km)</ThemedText>
            <TextInput className="h-[48] rounded-xl border px-4 text-[15px] mb-6" style={{ backgroundColor: t.inputBackground, borderColor: t.inputBorder, color: t.text }} value={monthlyTarget} onChangeText={setMonthlyTarget} keyboardType="numeric" placeholderTextColor={t.textSecondary} />
            <Pressable className="h-[48] rounded-xl items-center justify-center" style={{ backgroundColor: t.primary }} onPress={handleSaveGoals}>
              <ThemedText className="text-[16px] font-bold" style={{ color: '#0B1020' }}>Save Goals</ThemedText>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </ThemedView>
  );
}
