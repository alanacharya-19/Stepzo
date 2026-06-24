import { View, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/hooks/use-theme';
import { ThemedText } from '@/components/ThemedText';

const MOCK = {
  ownedPercent: 12,
  capturedToday: 3,
  lostToday: 1,
  zones: [
    [1, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 0, 0],
  ],
};

function MiniMap() {
  const theme = useTheme();

  return (
    <View className="w-[108] h-[108] gap-[2] p-1.5 rounded-xl" style={{ backgroundColor: theme.backgroundSelected }}>
      {MOCK.zones.map((row, ri) => (
        <View key={ri} className="flex-row gap-[2] flex-1">
          {row.map((cell, ci) => (
            <View
              key={ci}
              className="flex-1 rounded-sm"
              style={{
                backgroundColor: cell ? theme.primary : 'rgba(255,255,255,0.06)',
                opacity: cell ? 0.85 : 0.3,
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

export function TerritoryOverview() {
  const theme = useTheme();

  return (
    <Pressable className="mx-5 mt-6 rounded-3xl overflow-hidden" style={{ backgroundColor: theme.card }}>
      <LinearGradient
        colors={['rgba(0,212,255,0.06)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-5"
      >
        <View className="flex-row items-center gap-2.5 mb-4">
          <View className="w-1 h-5 rounded-full" style={{ backgroundColor: theme.primary }} />
          <ThemedText className="text-lg font-bold flex-1">🗺️ Territory</ThemedText>
          <ThemedText className="text-xs font-semibold" style={{ color: theme.primary }}>
            Tap →
          </ThemedText>
        </View>

        <View className="flex-row gap-5">
          <MiniMap />
          <View className="flex-1 justify-center gap-3">
            <View className="flex-row items-center gap-2.5">
              <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.primary }} />
              <ThemedText className="text-[13px] flex-1" style={{ color: theme.textSecondary }}>
                Territory owned:{' '}
                <ThemedText className="font-bold" style={{ color: theme.primary }}>
                  {MOCK.ownedPercent}%
                </ThemedText>
              </ThemedText>
            </View>
            <View className="flex-row items-center gap-2.5">
              <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.secondary }} />
              <ThemedText className="text-[13px] flex-1" style={{ color: theme.textSecondary }}>
                New zones:{' '}
                <ThemedText className="font-bold" style={{ color: theme.secondary }}>
                  +{MOCK.capturedToday}
                </ThemedText>
              </ThemedText>
            </View>
            <View className="flex-row items-center gap-2.5">
              <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.danger }} />
              <ThemedText className="text-[13px] flex-1" style={{ color: theme.textSecondary }}>
                Lost zones:{' '}
                <ThemedText className="font-bold" style={{ color: theme.danger }}>
                  -{MOCK.lostToday}
                </ThemedText>
              </ThemedText>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
