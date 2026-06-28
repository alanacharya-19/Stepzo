import { useEffect } from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withDelay, withSequence, Easing, runOnJS } from 'react-native-reanimated';
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/theme';

const { width: W, height: H } = Dimensions.get('window');

const COLORS = ['#B7FF3C', '#FFD60A', '#FF3B5C', '#00D4FF', '#A855F7', '#FF7A00', '#22C55E'];

interface Particle {
  x: number;
  startY: number;
  size: number;
  color: string;
  delay: number;
  shape: 'circle' | 'rect';
}

const PARTICLES: Particle[] = Array.from({ length: 30 }, (_, i) => ({
  x: Math.random() * W,
  startY: -40 - Math.random() * 200,
  size: 6 + Math.random() * 10,
  color: COLORS[i % COLORS.length],
  delay: i * 40,
  shape: i % 3 === 0 ? 'rect' : 'circle',
}));

function ConfettiPiece({ p, index }: { p: Particle; index: number }) {
  const translateY = useSharedValue(p.startY);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withDelay(p.delay, withTiming(H + 60, { duration: 2500 + Math.random() * 1000, easing: Easing.out(Easing.quad) }));
    rotate.value = withDelay(p.delay, withRepeat(withTiming(360, { duration: 800 }), -1));
    opacity.value = withDelay(p.delay + 2000, withTiming(0, { duration: 500 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { rotate: `${rotate.value}deg` }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[{ position: 'absolute', left: p.x, top: 0, width: p.size, height: p.size, alignItems: 'center', justifyContent: 'center' }, style]}>
      {p.shape === 'circle' ? (
        <Svg width={p.size} height={p.size}>
          <Circle cx={p.size / 2} cy={p.size / 2} r={p.size / 2} fill={p.color} />
        </Svg>
      ) : (
        <Svg width={p.size} height={p.size}>
          <Rect x={1} y={1} width={p.size - 2} height={p.size - 2} rx={2} fill={p.color} />
        </Svg>
      )}
    </Animated.View>
  );
}

interface Props {
  title: string;
  subtitle: string;
  visible: boolean;
  onDismiss: () => void;
}

export function CelebrationOverlay({ title, subtitle, visible, onDismiss }: Props) {
  const scale = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withSequence(withTiming(1.1, { duration: 300, easing: Easing.out(Easing.back) }), withTiming(1, { duration: 150 }));
      const timer = setTimeout(() => { runOnJS(onDismiss)(); }, 3500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!visible) return null;

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
      {PARTICLES.map((p, i) => <ConfettiPiece key={i} p={p} index={i} />)}
      <Pressable onPress={onDismiss} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <Animated.View style={[{ width: W * 0.75, backgroundColor: Colors.card, borderRadius: 24, padding: 28, alignItems: 'center', zIndex: 1000 }, cardStyle]}>
        <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: `${Colors.primary}18`, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <Ionicons name="trophy" size={28} color={Colors.primary} />
        </View>
        <ThemedText style={{ fontSize: 20, fontWeight: '800', letterSpacing: 0.3, marginBottom: 6 }}>Achievement Unlocked!</ThemedText>
        <ThemedText style={{ fontSize: 17, fontWeight: '700', color: Colors.primary, marginBottom: 4 }}>{title}</ThemedText>
        <ThemedText style={{ fontSize: 13, color: Colors.textSecondary, textAlign: 'center' }}>{subtitle}</ThemedText>
      </Animated.View>
    </View>
  );
}
