import { useState, useCallback } from 'react';
import { ScrollView, View, Pressable, Dimensions } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import Svg, { Rect, Line, Circle, Text as SvgText, G } from 'react-native-svg';
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';
import { loadRuns } from '@/utils/storage';
import type { RunData } from '@/types';

const { width: W } = Dimensions.get('window');
const CHART_W = W - 64;
const CAL_SIZE = Math.floor((W - 72) / 7);

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  date.setDate(date.getDate() - ((day + 6) % 7));
  date.setHours(0, 0, 0, 0);
  return date;
}

function fmtPaceShort(kmh: number) {
  if (kmh <= 0) return '0:00';
  const minPerKm = 60 / kmh;
  return `${Math.floor(minPerKm)}:${Math.floor((minPerKm % 1) * 60).toString().padStart(2, '0')}`;
}

export default function ChartsScreen() {
  const theme = useTheme();
  const [runs, setRuns] = useState<RunData[]>([]);
  const now = new Date();

  useFocusEffect(useCallback(() => {
    loadRuns().then(setRuns);
  }, []));

  // Weekly data
  const weekData: { label: string; dist: number }[] = [];
  for (let w = 7; w >= 0; w--) {
    const mon = getMonday(new Date());
    mon.setDate(mon.getDate() - w * 7);
    const nextMon = new Date(mon);
    nextMon.setDate(nextMon.getDate() + 7);
    const dist = runs
      .filter((r) => {
        const d = new Date(Number(r.id));
        return d >= mon && d < nextMon;
      })
      .reduce((s, r) => s + r.distance, 0);
    weekData.push({ label: w === 0 ? 'This' : w === 1 ? 'Last' : `${w}w`, dist });
  }

  // Pace data
  const paceRuns = runs.filter((r) => r.pace > 0);
  const paces = paceRuns.slice(-20).map((r) => 60 / r.pace);
  const minP = paces.length > 0 ? Math.min(...paces) : 0;
  const maxP = paces.length > 0 ? Math.max(...paces) : 1;
  const paceRange = maxP - minP || 1;

  // Calendar
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const runDates = new Set(runs.map((r) => new Date(Number(r.id)).toDateString()));
  const today = now.getDate();
  const cells: { day: number; active: boolean; isToday: boolean }[] = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: 0, active: false, isToday: false });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    cells.push({ day: d, active: runDates.has(date.toDateString()), isToday: d === today });
  }

  const maxDist = Math.max(...weekData.map((d) => d.dist), 1);
  const barH = 140;
  const barW = (CHART_W - 60) / 8;

  return (
    <ThemedView className="flex-1">
      <View className="flex-row items-center px-6 pt-14 pb-4">
        <Pressable onPress={() => router.back()} className="w-10 h-10 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
          <Ionicons name="chevron-back" size={22} color={theme.textSecondary} />
        </Pressable>
        <ThemedText className="text-[22px] font-bold flex-1">Analytics</ThemedText>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {runs.length === 0 ? (
          <View className="rounded-2xl p-8 mb-4 items-center" style={{ backgroundColor: theme.card }}>
            <View className="w-14 h-14 rounded-2xl items-center justify-center mb-4" style={{ backgroundColor: `${theme.primary}12` }}>
              <Ionicons name="bar-chart-outline" size={28} color={theme.primary} />
            </View>
            <ThemedText className="text-[16px] font-bold mb-1">No Data Yet</ThemedText>
            <ThemedText className="text-[13px] text-center leading-5" style={{ color: theme.textSecondary }}>Complete a run to see your weekly trends, pace history, and activity calendar.</ThemedText>
          </View>
        ) : (
        <>
        {/* Weekly Distance */}
        <View className="rounded-2xl p-5 mb-4" style={{ backgroundColor: theme.card }}>
          <ThemedText className="text-[15px] font-bold mb-4">Weekly Distance</ThemedText>
          <Svg width={CHART_W} height={barH + 30}>
            <Line x1={0} y1={barH} x2={CHART_W} y2={barH} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
            {weekData.map((d, i) => {
              const bh = (d.dist / maxDist) * (barH - 20);
              const x = 10 + i * (barW + 6);
              return (
                <G key={i}>
                  <Rect x={x} y={barH - bh} width={barW} height={bh} rx={4} fill={d.dist > 0 ? theme.primary : 'rgba(255,255,255,0.05)'} />
                  <SvgText x={x + barW / 2} y={barH + 16} fontSize={10} fill="#7D8799" textAnchor="middle">{d.label}</SvgText>
                  {d.dist > 0 && (
                    <SvgText x={x + barW / 2} y={barH - bh - 6} fontSize={10} fill="#FFF" textAnchor="middle" fontWeight="600">{d.dist.toFixed(1)}</SvgText>
                  )}
                </G>
              );
            })}
          </Svg>
        </View>

        {/* Pace Over Time */}
        <View className="rounded-2xl p-5 mb-4" style={{ backgroundColor: theme.card }}>
          <View className="flex-row items-center mb-4">
            <ThemedText className="text-[15px] font-bold flex-1">Pace Over Time</ThemedText>
            {paces.length >= 2 && (
              <ThemedText className="text-[10px]" style={{ color: theme.textSecondary }}>
                {fmtPaceShort(60 / maxP)} – {fmtPaceShort(60 / minP)} /km
              </ThemedText>
            )}
          </View>
          {paces.length < 2 ? (
            <ThemedText className="text-[13px] text-center py-8" style={{ color: theme.textSecondary }}>Complete at least 2 runs to see pace trends</ThemedText>
          ) : (
            <Svg width={CHART_W} height={120}>
              {paces.map((p, i, arr) => {
                if (p <= 0) return null;
                const x = 10 + (i / Math.max(arr.length - 1, 1)) * (CHART_W - 20);
                const y = 100 - ((p - minP) / paceRange) * 80;
                return (
                  <G key={i}>
                    <Circle cx={x} cy={y} r={3} fill={theme.primary} opacity={0.8} />
                    {i > 0 && (
                      <Line
                        x1={10 + ((i - 1) / Math.max(arr.length - 1, 1)) * (CHART_W - 20)}
                        y1={100 - ((arr[i - 1] - minP) / paceRange) * 80}
                        x2={x}
                        y2={y}
                        stroke={theme.primary}
                        strokeWidth={1.5}
                        opacity={0.3}
                      />
                    )}
                  </G>
                );
              })}
            </Svg>
          )}
        </View>

        {/* Calendar */}
        <View className="rounded-2xl p-5 mb-8" style={{ backgroundColor: theme.card }}>
          <ThemedText className="text-[15px] font-bold mb-4">
            {now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </ThemedText>
          <View className="flex-row mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <View key={d} style={{ width: CAL_SIZE }} className="items-center">
                <ThemedText className="text-[9px]" style={{ color: theme.textDisabled }}>{d}</ThemedText>
              </View>
            ))}
          </View>
          <View className="flex-row flex-wrap">
            {cells.map((c, i) => (
              <View key={i} style={{ width: CAL_SIZE, height: CAL_SIZE, backgroundColor: c.isToday ? `${theme.primary}30` : c.active ? `${theme.primary}18` : 'rgba(255,255,255,0.03)', borderRadius: 6, borderWidth: c.isToday ? 1 : 0, borderColor: c.isToday ? theme.primary : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                {c.day > 0 && (
                  <ThemedText className="text-[11px]" style={{ color: c.active ? theme.primary : c.isToday ? theme.text : theme.textDisabled, fontWeight: c.active || c.isToday ? '700' : '400' }}>{c.day}</ThemedText>
                )}
              </View>
            ))}
          </View>
        </View>

        <View className="h-8" />
        </>
      )}
      </ScrollView>
    </ThemedView>
  );
}
