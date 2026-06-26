import React, { useCallback } from "react";
import { View, Pressable, StyleSheet, Platform } from "react-native";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "./styles";

interface TabBarProps {
  state: { index: number };
  navigation: { navigate: (name: string) => void };
}

const PILL_HEIGHT = 60;
const BTN_SIZE = 58;

function Icon({ d, active, viewBox }: { d: string; active: boolean; viewBox?: string }) {
  return (
    <Svg width={24} height={24} viewBox={viewBox || "0 0 24 24"} fill="none">
      <Path d={d} fill={active ? COLORS.ACTIVE : COLORS.INACTIVE} />
    </Svg>
  );
}

function TabIcon({ children, active, onPress }: { children: React.ReactNode; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={s.tabItem}>
      {children}
    </Pressable>
  );
}

export default function CustomTabBar({ state, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(1);

  const activeIndex = state.index;

  const animatedBtn = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handleStartPressIn = useCallback(() => {
    scale.value = withSpring(0.86, { stiffness: 300, damping: 12 });
  }, []);

  const handleStartPressOut = useCallback(() => {
    scale.value = withSpring(1, { stiffness: 300, damping: 12 });
  }, []);

  const go = useCallback((name: string) => navigation.navigate(name), [navigation]);

  return (
    <View style={[s.root, { paddingBottom: insets.bottom + 8 }]}>
      {/* Start button — floats above the pill */}
      <Animated.View style={[s.startBtnWrap, animatedBtn]}>
        <LinearGradient colors={["#22C55E", "#0D9488"]} style={s.startGradient}>
          <Pressable onPress={() => go("run")} onPressIn={handleStartPressIn} onPressOut={handleStartPressOut} style={s.startHit}>
            <Svg width={28} height={28} viewBox="0 0 24 24" fill="#FFF">
              <Path d="M8 5v14l11-7z" />
            </Svg>
          </Pressable>
        </LinearGradient>
      </Animated.View>

      {/* Pill bar */}
      <View style={s.pill}>
        {/* Left side: Home, Territory */}
        <TabIcon active={activeIndex === 0} onPress={() => go("index")}>
          <Icon d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" active={activeIndex === 0} />
        </TabIcon>
        <TabIcon active={activeIndex === 1} onPress={() => go("territory")}>
          <Icon d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 21.486V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" active={activeIndex === 1} />
        </TabIcon>

        {/* Spacer for Start button */}
        <View style={{ width: BTN_SIZE }} />

        {/* Right side: Leaderboard, Profile */}
        <TabIcon active={activeIndex === 3} onPress={() => go("leaderboard")}>
          <Icon d="M6 9H4.5a2.5 2.5 0 010-5C7 4 7 6 7 6m3.5-3L12 3l.5 2.5m6.5 3.5h1.5a2.5 2.5 0 000-5C17 4 17 6 17 6M12 3v15m0 0H8m4 0h4" active={activeIndex === 3} />
        </TabIcon>
        <TabIcon active={activeIndex === 4} onPress={() => go("profile")}>
          <Icon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" active={activeIndex === 4} />
        </TabIcon>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: PILL_HEIGHT,
    borderRadius: PILL_HEIGHT / 2,
    backgroundColor: "rgba(26,34,56,0.96)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 10,
    gap: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: { elevation: 8 },
    }),
  },
  tabItem: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  startBtnWrap: {
    position: "absolute",
    bottom: PILL_HEIGHT - BTN_SIZE / 2,
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BTN_SIZE / 2,
    overflow: "hidden",
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#22C55E",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: { elevation: 8 },
    }),
  },
  startGradient: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BTN_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  startHit: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BTN_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
