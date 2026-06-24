import { Text, type TextProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  themeColor?: string;
};

export function ThemedText({ style, themeColor, className, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      className={className}
      style={[{ color: theme[themeColor as keyof typeof theme] ?? theme.text }, style]}
      {...rest}
    />
  );
}
