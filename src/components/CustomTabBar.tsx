import React, { useCallback } from "react";
import { View, Pressable, StyleSheet, Platform } from "react-native";
import { Image } from "expo-image";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/use-theme";

interface TabBarProps {
  state: { index: number };
  navigation: { navigate: (name: string) => void };
}

const PILL_HEIGHT = 62;
const BTN_SIZE = 56;

const homeIcon = require("@/assets/logo/home.png");
const territoryIcon = require("@/assets/logo/territory.png");
const runningIcon = require("@/assets/logo/running.png");
const trophyIcon = require("@/assets/logo/trophy.png");
const profileIcon = require("@/assets/logo/profile.png");

export default function CustomTabBar({ state, navigation }: TabBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(1);

  const animatedBtn = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const handleStartPressIn = useCallback(() => { scale.value = withSpring(0.86, { stiffness: 300, damping: 12 }); }, []);
  const handleStartPressOut = useCallback(() => { scale.value = withSpring(1, { stiffness: 300, damping: 12 }); }, []);
  const go = useCallback((name: string) => navigation.navigate(name), [navigation]);

  const activeIndex = state.index;

  return (
    <View style={[s.root, { paddingBottom: insets.bottom + 8 }]}>
      <Animated.View style={[s.startBtnWrap, animatedBtn, { backgroundColor: theme.primary }]}>
        <Pressable onPress={() => go("run")} onPressIn={handleStartPressIn} onPressOut={handleStartPressOut} style={s.startHit}>
          <Image source={runningIcon} style={[s.startImg, { tintColor: '#0B1020' }]} />
        </Pressable>
      </Animated.View>
      <View style={[s.pill, { backgroundColor: 'rgba(26,34,56,0.96)', borderColor: 'rgba(255,255,255,0.05)' }]}>
        {[
          { src: homeIcon, i: 0 },
          { src: territoryIcon, i: 1 },
        ].map(({ src, i }) => (
          <Pressable key={i} onPress={() => go(i === 0 ? "index" : "territory")} style={s.tabItem}>
            <Image source={src} style={[s.tabImg, { tintColor: activeIndex === i ? theme.primary : 'rgba(255,255,255,0.3)' }]} />
          </Pressable>
        ))}
        <View style={{ width: BTN_SIZE }} />
        {[
          { src: trophyIcon, i: 3 },
          { src: profileIcon, i: 4 },
        ].map(({ src, i }) => (
          <Pressable key={i} onPress={() => go(i === 3 ? "leaderboard" : "profile")} style={s.tabItem}>
            <Image source={src} style={[s.tabImg, { tintColor: activeIndex === i ? theme.primary : 'rgba(255,255,255,0.3)' }]} />
          </Pressable>
        ))}
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
    borderWidth: 1,
    paddingHorizontal: 12,
    gap: 4,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12 },
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
  },
  startImg: {
    width: 26,
    height: 26,
  },
  startBtnWrap: {
    position: "absolute",
    bottom: PILL_HEIGHT - BTN_SIZE / 2,
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BTN_SIZE / 2,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#B7FF3C",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      },
      android: { elevation: 8 },
    }),
  },
  startHit: {
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BTN_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
