import { Dimensions, Platform } from "react-native";

const { width: W } = Dimensions.get("window");

export const TAB = {
  HEIGHT: 82,
  CORNER_RADIUS: 24,
  NOTCH_TOP_WIDTH: 100,
  NOTCH_BOTTOM_WIDTH: 64,
  NOTCH_DEPTH: 44,
} as const;

export const START_BUTTON = {
  DIAMETER: 80,
  RADIUS: 40,
  OVERLAP_RATIO: 0.4,
  GRADIENT_START: "#22C55E",
  GRADIENT_END: "#0D9488",
  ICON_COLOR: "#FFFFFF",
} as const;

export const COLORS = {
  TAB_BAR_BG: "#FFFFFF",
  ACTIVE: "#22C55E",
  INACTIVE: "#94A3B8",
} as const;

export const SHADOW = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  android: {
    elevation: 12,
  },
}) as Record<string, any>;

export const NOTCH = {
  LEFT_START: W / 2 - TAB.NOTCH_TOP_WIDTH / 2,
  LEFT_BOTTOM: W / 2 - TAB.NOTCH_BOTTOM_WIDTH / 2,
  RIGHT_BOTTOM: W / 2 + TAB.NOTCH_BOTTOM_WIDTH / 2,
  RIGHT_START: W / 2 + TAB.NOTCH_TOP_WIDTH / 2,
  CENTER: W / 2,
} as const;
