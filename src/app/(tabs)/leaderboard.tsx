import { View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';

const LEADERS = [
  { rank: 1, name: 'Sarah M.', runs: 86, km: '342', badge: '#FFD60A' },
  { rank: 2, name: 'Mike R.', runs: 72, km: '289', badge: '#C0C0C0' },
  { rank: 3, name: 'Emma L.', runs: 65, km: '254', badge: '#CD7F32' },
  { rank: 4, name: 'Alex K.', runs: 54, km: '218', badge: 'transparent' },
  { rank: 5, name: 'You', runs: 42, km: '186', badge: '#B7FF3C' },
];

export default function LeaderboardScreen() {
  const theme = useTheme();

  return (
    <ThemedView className="flex-1 px-5 pt-16">
      <ThemedText className="text-2xl font-bold text-center mb-1">Leaderboard</ThemedText>
      <ThemedText className="text-sm text-center mb-6" style={{ color: theme.textSecondary }}>Top runners this month</ThemedText>
      <View className="rounded-3xl overflow-hidden" style={{ backgroundColor: theme.card }}>
        {LEADERS.map((p, i) => (
          <View key={p.name} className="flex-row items-center px-5 py-3.5" style={{ borderBottomWidth: i < LEADERS.length - 1 ? 1 : 0, borderBottomColor: 'rgba(255,255,255,0.04)' }}>
            <View className="w-8 h-8 rounded-full items-center justify-center mr-3" style={{ backgroundColor: p.badge !== 'transparent' ? `${p.badge}30` : 'rgba(255,255,255,0.04)' }}>
              <ThemedText className="text-sm font-bold" style={{ color: p.badge !== 'transparent' ? p.badge : theme.textSecondary }}>{p.rank}</ThemedText>
            </View>
            <View className="flex-1">
              <ThemedText className="text-[15px] font-semibold">{p.name}</ThemedText>
              <ThemedText className="text-[11px] mt-0.5" style={{ color: theme.textSecondary }}>{p.runs} runs · {p.km} km</ThemedText>
            </View>
            {p.badge === '#B7FF3C' && (
              <View className="px-3 py-1 rounded-lg" style={{ backgroundColor: `${theme.primary}20` }}>
                <ThemedText className="text-[11px] font-bold" style={{ color: theme.primary }}>You</ThemedText>
              </View>
            )}
          </View>
        ))}
      </View>
    </ThemedView>
  );
}
