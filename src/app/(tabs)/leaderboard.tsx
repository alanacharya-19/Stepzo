import { useState, useCallback } from 'react';
import { View, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';
import { loadRuns } from '@/utils/storage';

const FRIENDS_KEY = '@stepzo_friends';

const GLOBAL = [
  { name: 'Elena V.', km: 892, runs: 210 },
  { name: 'Marcus J.', km: 756, runs: 185 },
  { name: 'Lina K.', km: 681, runs: 162 },
  { name: 'Tom H.', km: 623, runs: 148 },
  { name: 'Sofia R.', km: 587, runs: 134 },
];

async function loadFriends(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(FRIENDS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

async function saveFriends(friends: string[]) {
  await AsyncStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
}

function rankBadge(r: number): { color: string; label?: string } {
  if (r === 1) return { color: '#FFD60A' };
  if (r === 2) return { color: '#C0C0C0' };
  if (r === 3) return { color: '#CD7F32' };
  return { color: 'transparent' };
}

export default function LeaderboardScreen() {
  const theme = useTheme();
  const [tab, setTab] = useState<'friends' | 'global'>('friends');
  const [userKm, setUserKm] = useState(0);
  const [userRuns, setUserRuns] = useState(0);
  const [friendNames, setFriendNames] = useState<string[]>([]);
  const [addName, setAddName] = useState('');

  useFocusEffect(useCallback(() => {
    (async () => {
      const runs = await loadRuns();
      const d = runs.reduce((s, r) => s + r.distance, 0);
      setUserKm(Math.round(d * 10) / 10);
      setUserRuns(runs.length);
      setFriendNames(await loadFriends());
    })();
  }, []));

  const handleAddFriend = async () => {
    const name = addName.trim();
    if (!name || friendNames.includes(name)) { setAddName(''); return; }
    const updated = [...friendNames, name];
    setFriendNames(updated);
    await saveFriends(updated);
    setAddName('');
  };

  const handleRemoveFriend = (name: string) => {
    Alert.alert('Remove Friend', `Remove ${name} from your friends?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: async () => {
        const updated = friendNames.filter((f) => f !== name);
        setFriendNames(updated);
        await saveFriends(updated);
      }},
    ]);
  };

  const seedNames = ['Sarah M.', 'Mike R.', 'Emma L.', 'Alex K.', 'Jamie W.'];
  const seedData: Record<string, { km: number; runs: number }> = {
    'Sarah M.': { km: 342, runs: 86 },
    'Mike R.': { km: 289, runs: 72 },
    'Emma L.': { km: 254, runs: 65 },
    'Alex K.': { km: 218, runs: 54 },
    'Jamie W.': { km: 195, runs: 48 },
  };

  const friendsList = [
    { name: 'You', km: userKm, runs: userRuns },
    ...friendNames.filter((n) => n !== 'You').map((n) => ({
      name: n,
      km: seedData[n]?.km ?? Math.floor(100 + Math.random() * 250),
      runs: seedData[n]?.runs ?? Math.floor(20 + Math.random() * 60),
    })),
  ].sort((a, b) => b.km - a.km);

  const list = tab === 'friends' ? friendsList : GLOBAL;

  return (
    <ThemedView className="flex-1 px-6 pt-16">
      <View className="items-center mb-6">
        <ThemedText className="text-[28px] font-bold tracking-tight">Leaderboard</ThemedText>
        <ThemedText className="text-[13px] mt-1.5" style={{ color: theme.textSecondary }}>Top runners this month</ThemedText>
      </View>

      {/* Tab toggle */}
      <View className="flex-row rounded-xl p-1 mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
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

      {/* Add friend input */}
      {tab === 'friends' && (
        <View className="flex-row items-center gap-2 mb-4">
          <TextInput
            className="h-[44] flex-1 rounded-xl border px-4 text-[14px]"
            style={{ backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }}
            placeholder="Add friend by name..."
            placeholderTextColor={theme.textSecondary}
            value={addName}
            onChangeText={setAddName}
            onSubmitEditing={handleAddFriend}
            returnKeyType="done"
          />
          <Pressable onPress={handleAddFriend} className="w-[44] h-[44] rounded-xl items-center justify-center" style={{ backgroundColor: theme.primary }}>
            <Ionicons name="add" size={24} color="#0B1020" />
          </Pressable>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="rounded-2xl overflow-hidden mb-8" style={{ backgroundColor: theme.card }}>
          {list.map((p, i) => {
            const rank = i + 1;
            const badge = rankBadge(rank);
            const isYou = p.name === 'You';
            return (
              <Pressable key={p.name} onLongPress={tab === 'friends' && !isYou ? () => handleRemoveFriend(p.name) : undefined} className="flex-row items-center px-5 py-3.5" style={{ borderBottomWidth: i < list.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.03)', backgroundColor: isYou ? `${theme.primary}08` : 'transparent' }}>
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
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
