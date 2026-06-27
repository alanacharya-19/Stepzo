import { useState, useCallback } from 'react';
import { View, Pressable } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';
import { loadRuns } from '@/utils/storage';

const FRIENDS = [
  { name: 'Sarah M.', km: 342, runs: 86 },
  { name: 'Mike R.', km: 289, runs: 72 },
  { name: 'Emma L.', km: 254, runs: 65 },
  { name: 'Alex K.', km: 218, runs: 54 },
  { name: 'Jamie W.', km: 195, runs: 48 },
  { name: 'You', km: 186, runs: 42 },
];

const GLOBAL = [
  { name: 'Elena V.', km: 892, runs: 210 },
  { name: 'Marcus J.', km: 756, runs: 185 },
  { name: 'Lina K.', km: 681, runs: 162 },
  { name: 'Tom H.', km: 623, runs: 148 },
  { name: 'Sofia R.', km: 587, runs: 134 },
];

function rankBadge(r: number): { color: string; label?: string } {
  if (r === 1) return { color: '#FFD60A' };
  if (r === 2) return { color: '#C0C0C0' };
  if (r === 3) return { color: '#CD7F32' };
  return { color: 'transparent' };
}

export default function LeaderboardScreen() {
  const theme = useTheme();
  const [tab, setTab] = useState<'friends' | 'global'>('friends');
  const [userKm, setUserKm] = useState(186);
  const [userRuns, setUserRuns] = useState(42);

  useFocusEffect(useCallback(() => {
    loadRuns().then((runs) => {
      const d = runs.reduce((s, r) => s + r.distance, 0);
      setUserKm(Math.round(d * 10) / 10);
      setUserRuns(runs.length);
    });
  }, []));

  const list = tab === 'friends'
    ? FRIENDS.map((f) => ({
        ...f,
        km: f.name === 'You' ? userKm : f.km,
        runs: f.name === 'You' ? userRuns : f.runs,
      })).sort((a, b) => b.km - a.km)
    : GLOBAL.map((g) => ({ ...g, km: g.km, runs: g.runs }));

  return (
    <ThemedView className="flex-1 px-6 pt-16">
      <View className="items-center mb-6">
        <ThemedText className="text-[28px] font-bold tracking-tight">Leaderboard</ThemedText>
        <ThemedText className="text-[13px] mt-1.5" style={{ color: theme.textSecondary }}>Top runners this month</ThemedText>
      </View>

      {/* Tab toggle */}
      <View className="flex-row rounded-xl p-1 mb-5" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
        <Pressable
          onPress={() => setTab('friends')}
          className="flex-1 py-2.5 rounded-lg items-center"
          style={{ backgroundColor: tab === 'friends' ? theme.primary : 'transparent' }}
        >
          <ThemedText className="text-[13px] font-bold" style={{ color: tab === 'friends' ? '#0B1020' : theme.textSecondary }}>Friends</ThemedText>
        </Pressable>
        <Pressable
          onPress={() => setTab('global')}
          className="flex-1 py-2.5 rounded-lg items-center"
          style={{ backgroundColor: tab === 'global' ? theme.primary : 'transparent' }}
        >
          <ThemedText className="text-[13px] font-bold" style={{ color: tab === 'global' ? '#0B1020' : theme.textSecondary }}>Global</ThemedText>
        </Pressable>
      </View>

      <View className="rounded-2xl overflow-hidden" style={{ backgroundColor: theme.card }}>
        {list.map((p, i) => {
          const rank = i + 1;
          const badge = rankBadge(rank);
          const isYou = p.name === 'You';
          return (
            <View key={p.name} className="flex-row items-center px-5 py-3.5" style={{ borderBottomWidth: i < list.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.03)', backgroundColor: isYou ? `${theme.primary}08` : 'transparent' }}>
              <View className="w-8 h-8 rounded-full items-center justify-center mr-3.5" style={{ backgroundColor: badge.color !== 'transparent' ? `${badge.color}25` : 'rgba(255,255,255,0.04)' }}>
                <ThemedText className="text-sm font-bold" style={{ color: badge.color !== 'transparent' ? badge.color : theme.textSecondary }}>{rank}</ThemedText>
              </View>
              <View className="flex-1">
                <ThemedText className="text-[15px] font-semibold">{p.name}</ThemedText>
                <ThemedText className="text-[11px] mt-0.5" style={{ color: theme.textSecondary }}>{p.runs} runs · {p.km} km</ThemedText>
              </View>
              {isYou && (
                <View className="px-3 py-1 rounded-lg" style={{ backgroundColor: `${theme.primary}18` }}>
                  <ThemedText className="text-[11px] font-bold" style={{ color: theme.primary }}>You</ThemedText>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ThemedView>
  );
}
