import React, { useCallback } from "react";
import { View, Pressable, StyleSheet, Platform } from "react-native";
import { Image } from "expo-image";
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

const homeIcon = require("@/assets/logo/home.png");
const territoryIcon = require("@/assets/logo/territory.png");
const runningIcon = require("@/assets/logo/running.png");
const trophyIcon = require("@/assets/logo/trophy.png");
const profileIcon = require("@/assets/logo/profile.png");

function TabImage({ source, active, onPress }: { source: any; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={s.tabItem}>
      <Image source={source} style={[s.tabImg, active && s.tabImgActive]} />
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
            <Image source={runningIcon} style={s.startImg} />
          </Pressable>
        </LinearGradient>
      </Animated.View>

      {/* Pill bar */}
      <View style={s.pill}>
        {/* Left side: Home, Territory */}
        <TabImage source={homeIcon} active={activeIndex === 0} onPress={() => go("index")} />
        <TabImage source={territoryIcon} active={activeIndex === 1} onPress={() => go("territory")} />

        {/* Spacer for Start button */}
        <View style={{ width: BTN_SIZE }} />

        {/* Right side: Leaderboard, Profile */}
        <TabImage source={trophyIcon} active={activeIndex === 3} onPress={() => go("leaderboard")} />
        <TabImage source={profileIcon} active={activeIndex === 4} onPress={() => go("profile")} />
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
  tabImg: {
    width: 24,
    height: 24,
    tintColor: COLORS.INACTIVE,
  },
  tabImgActive: {
    tintColor: COLORS.ACTIVE,
  },
  startImg: {
    width: 28,
    height: 28,
    tintColor: "#FFF",
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
