import '@/global.css';
import { Platform } from 'react-native';

export const Colors = {
  // ===========================
  // Brand
  // ===========================
  primary: '#B7FF3C',
  primaryLight: '#D8FF5A',
  primaryDark: '#8FD600',

  secondary: '#3B82F6',
  secondaryLight: '#60A5FA',

  accent: '#00E5A8',

  // ===========================
  // Backgrounds
  // ===========================
  background: '#0B1020',
  backgroundSecondary: '#111827',
  backgroundTertiary: '#1A2238',

  surface: '#161D2E',
  card: '#1D263A',

  // ===========================
  // Text
  // ===========================
  text: '#FFFFFF',
  textSecondary: '#B5BDC9',
  textMuted: '#7D8799',
  textDisabled: '#556070',

  // ===========================
  // Border & Divider
  // ===========================
  border: '#2A3448',
  divider: '#242E42',

  // ===========================
  // Status
  // ===========================
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // ===========================
  // Running Stats
  // ===========================
  calories: '#FF7A00',
  distance: '#3B82F6',
  duration: '#A855F7',
  steps: '#B7FF3C',
  heartRate: '#FF3B5C',
  speed: '#00D4FF',
  elevation: '#FACC15',

  // ===========================
  // Map
  // ===========================
  route: '#B7FF3C',
  territory: 'rgba(183,255,60,0.28)',
  territoryBorder: '#B7FF3C',

  userLocation: '#3B82F6',
  enemyTerritory: '#FF4D4F',

  // ===========================
  // Buttons
  // ===========================
  buttonPrimary: '#B7FF3C',
  buttonPrimaryText: '#0B1020',

  buttonSecondary: '#232D44',
  buttonSecondaryText: '#FFFFFF',

  buttonDisabled: '#30384A',

  // ===========================
  // Inputs
  // ===========================
  inputBackground: '#161D2E',
  inputBorder: '#2F3B55',
  placeholder: '#6F7A90',

  // ===========================
  // Charts
  // ===========================
  chartGreen: '#B7FF3C',
  chartBlue: '#3B82F6',
  chartOrange: '#FF8A00',
  chartPurple: '#A855F7',
  chartRed: '#EF4444',

  // ===========================
  // Badges & Achievement
  // ===========================
  gold: '#FFD54A',
  silver: '#C0C8D2',
  bronze: '#C97A3A',

  // ===========================
  // Overlay
  // ===========================
  overlay: 'rgba(0,0,0,0.65)',
  backdrop: 'rgba(11,16,32,0.92)',

  // ===========================
  // Shadows
  // ===========================
  shadow: '#000000',

  // ===========================
  // Gradient
  // ===========================
  gradientPrimary: ['#D8FF5A', '#B7FF3C', '#8FD600'],

  gradientDark: ['#0B1020', '#111827'],

  gradientCard: ['#1A2238', '#161D2E'],
} as const;

export type ThemeColor = keyof typeof Colors;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
