import '@/global.css';
import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#FFFFFF',
    background: '#0A0A1A',
    backgroundElement: '#1A1A2E',
    backgroundSelected: '#2A2A3E',
    textSecondary: '#8E8E9E',
    card: '#1A1A2E',
    cardBorder: 'rgba(255,255,255,0.08)',
    primary: '#00D4FF',
    secondary: '#00FF88',
    accent: '#FF6B35',
    border: 'rgba(255,255,255,0.1)',
    danger: '#FF4444',
    success: '#00FF88',
    warning: '#FFD700',
    overlay: 'rgba(0,0,0,0.6)',
    glass: 'rgba(255,255,255,0.05)',
  },
  dark: {
    text: '#FFFFFF',
    background: '#0A0A1A',
    backgroundElement: '#1A1A2E',
    backgroundSelected: '#2A2A3E',
    textSecondary: '#8E8E9E',
    card: '#1A1A2E',
    cardBorder: 'rgba(255,255,255,0.08)',
    primary: '#00D4FF',
    secondary: '#00FF88',
    accent: '#FF6B35',
    border: 'rgba(255,255,255,0.1)',
    danger: '#FF4444',
    success: '#00FF88',
    warning: '#FFD700',
    overlay: 'rgba(0,0,0,0.6)',
    glass: 'rgba(255,255,255,0.05)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

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
