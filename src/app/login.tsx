import { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';

export default function LoginScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  return (
    <ThemedView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerClassName="grow justify-center px-7 pt-20 pb-10"
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-12">
            <View
              className="w-20 h-20 rounded-3xl items-center justify-center mb-3"
              style={{ backgroundColor: 'rgba(0, 212, 255, 0.12)' }}
            >
              <ThemedText className="text-[40px] font-black" style={{ color: theme.primary }}>
                S
              </ThemedText>
            </View>
            <ThemedText className="text-[28px] font-extrabold tracking-wide" style={{ color: theme.primary }}>
              Stepzo
            </ThemedText>
          </View>

          <View className="w-full">
            <ThemedText className="text-[28px] font-bold">Welcome Back</ThemedText>
            <ThemedText className="text-sm mt-1.5 mb-8" style={{ color: theme.textSecondary }}>
              Log in to continue your journey
            </ThemedText>

            <View className="mb-5">
              <ThemedText className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: theme.textSecondary }}>
                Email
              </ThemedText>
              <TextInput
                className="h-[52] rounded-xl border px-4 text-base"
                style={{
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.cardBorder,
                  color: theme.text,
                }}
                placeholder="Enter your email"
                placeholderTextColor={theme.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-5">
              <ThemedText className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: theme.textSecondary }}>
                Password
              </ThemedText>
              <TextInput
                className="h-[52] rounded-xl border px-4 text-base"
                style={{
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.cardBorder,
                  color: theme.text,
                }}
                placeholder="Enter your password"
                placeholderTextColor={theme.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <Pressable
              className="h-[52] rounded-xl items-center justify-center mt-2"
              style={{ backgroundColor: theme.primary }}
              onPress={handleLogin}
            >
              <ThemedText className="text-[17px] font-bold text-white">Log In</ThemedText>
            </Pressable>

            <View className="flex-row items-center mt-7 mb-5">
              <View className="flex-1 h-[1px]" style={{ backgroundColor: theme.cardBorder }} />
              <ThemedText className="text-[13px] mx-3.5" style={{ color: theme.textSecondary }}>
                or continue with
              </ThemedText>
              <View className="flex-1 h-[1px]" style={{ backgroundColor: theme.cardBorder }} />
            </View>

            <Pressable
              className="h-[52] rounded-xl border flex-row items-center justify-center gap-2.5"
              style={{
                backgroundColor: theme.backgroundElement,
                borderColor: theme.cardBorder,
              }}
            >
              <ThemedText className="text-xl font-extrabold text-white">G</ThemedText>
              <ThemedText className="text-base font-semibold">Google</ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="items-center pb-[40]" style={{ paddingBottom: Platform.OS === 'ios' ? 40 : 24 }}>
        <ThemedText className="text-[13px]" style={{ color: theme.textSecondary }}>
          Don't have an account?{' '}
          <ThemedText
            className="text-[13px] font-bold"
            style={{ color: theme.primary }}
            onPress={() => router.push('/signup')}
          >
            Sign Up
          </ThemedText>
        </ThemedText>
      </View>
    </ThemedView>
  );
}
