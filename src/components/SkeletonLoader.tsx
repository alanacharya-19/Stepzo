import { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

function SkeletonBlock({ width, height, style }: { width: number | string; height: number; style?: any }) {
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.6, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return (
    <Animated.View
      style={[{ width, height, borderRadius: 10, backgroundColor: theme.card, opacity }, style]}
    />
  );
}

export function SkeletonCard() {
  const theme = useTheme();
  return (
    <View className="mx-6 rounded-2xl p-5" style={{ backgroundColor: theme.card }}>
      <SkeletonBlock width="40%" height={16} style={{ marginBottom: 16 }} />
      <View className="flex-row">
        {[1, 2, 3, 4].map((i) => (
          <View key={i} className="flex-1 items-center">
            <SkeletonBlock width={36} height={28} style={{ marginBottom: 8 }} />
            <SkeletonBlock width={24} height={10} style={{ marginBottom: 4 }} />
            <SkeletonBlock width={40} height={10} />
          </View>
        ))}
      </View>
    </View>
  );
}

export function SkeletonList() {
  const theme = useTheme();
  return (
    <View className="mx-6 rounded-2xl p-5" style={{ backgroundColor: theme.card }}>
      {[1, 2, 3].map((i) => (
        <View key={i} className="flex-row items-center mb-4">
          <SkeletonBlock width={36} height={36} style={{ borderRadius: 12, marginRight: 12 }} />
          <View className="flex-1">
            <SkeletonBlock width="60%" height={14} style={{ marginBottom: 6 }} />
            <SkeletonBlock width="40%" height={10} />
          </View>
        </View>
      ))}
    </View>
  );
}
