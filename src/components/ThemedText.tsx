import { Text, type TextProps } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Colors } from '@/constants/theme';

export type ThemedTextProps = TextProps & {
  themeColor?: keyof typeof Colors;
};

export function ThemedText({ style, themeColor, className, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      className={className}
      style={[{ color: themeColor ? theme[themeColor] : theme.text }, style]}
      {...rest}
    />
  );
}
