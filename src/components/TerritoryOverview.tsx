import { View, Pressable } from 'react-native';
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
    <View className="w-[120] h-[120] gap-[3]">
      {MOCK.zones.map((row, ri) => (
        <View key={ri} className="flex-row gap-[3] flex-1">
          {row.map((cell, ci) => (
            <View
              key={ci}
              className="flex-1 rounded-[4]"
              style={{
                backgroundColor: cell ? theme.primary : theme.backgroundSelected,
                opacity: cell ? 0.8 : 0.4,
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
    <Pressable className="mx-5 mt-6 rounded-2xl border p-5" style={{ backgroundColor: theme.card, borderColor: theme.cardBorder }}>
      <View className="flex-row justify-between items-center mb-4">
        <ThemedText className="text-lg font-bold">🗺️ Territory</ThemedText>
        <ThemedText className="text-xs font-semibold" style={{ color: theme.primary }}>
          Tap to explore →
        </ThemedText>
      </View>

      <View className="flex-row gap-5">
        <MiniMap />
        <View className="flex-1 justify-center gap-2.5">
          <View className="flex-row items-center gap-2">
            <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.primary }} />
            <ThemedText className="text-[13px] flex-1" style={{ color: theme.textSecondary }}>
              Territory owned:{' '}
              <ThemedText className="font-bold" style={{ color: theme.primary }}>
                {MOCK.ownedPercent}%
              </ThemedText>
            </ThemedText>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.secondary }} />
            <ThemedText className="text-[13px] flex-1" style={{ color: theme.textSecondary }}>
              New zones today:{' '}
              <ThemedText className="font-bold" style={{ color: theme.secondary }}>
                +{MOCK.capturedToday}
              </ThemedText>
            </ThemedText>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.danger }} />
            <ThemedText className="text-[13px] flex-1" style={{ color: theme.textSecondary }}>
              Zones lost:{' '}
              <ThemedText className="font-bold" style={{ color: theme.danger }}>
                -{MOCK.lostToday}
              </ThemedText>
            </ThemedText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
