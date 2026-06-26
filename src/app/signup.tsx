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

export default function SignupScreen() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    router.replace('/onboarding');
  };

  return (
    <ThemedView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerClassName="grow justify-center px-7 pt-[60] pb-10"
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-10">
            <View
              className="w-[72] h-[72] rounded-[22] items-center justify-center mb-2.5"
              style={{ backgroundColor: 'rgba(0, 212, 255, 0.12)' }}
            >
              <ThemedText className="text-[36px] font-black" style={{ color: theme.primary }}>
                S
              </ThemedText>
            </View>
            <ThemedText className="text-2xl font-extrabold tracking-wide" style={{ color: theme.primary }}>
              Stepzo
            </ThemedText>
          </View>

          <View className="w-full">
            <ThemedText className="text-[28px] font-bold">Create Account</ThemedText>
            <ThemedText className="text-sm mt-1.5 mb-7" style={{ color: theme.textSecondary }}>
              Start your fitness journey today
            </ThemedText>

            <View className="mb-4">
              <ThemedText className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: theme.textSecondary }}>
                Name
              </ThemedText>
              <TextInput
                className="h-[52] rounded-xl border px-4 text-base"
                style={{
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.inputBorder,
                  color: theme.text,
                }}
                placeholder="Enter your name"
                placeholderTextColor={theme.textSecondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View className="mb-4">
              <ThemedText className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: theme.textSecondary }}>
                Email
              </ThemedText>
              <TextInput
                className="h-[52] rounded-xl border px-4 text-base"
                style={{
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.inputBorder,
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

            <View className="mb-4">
              <ThemedText className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: theme.textSecondary }}>
                Password
              </ThemedText>
              <TextInput
                className="h-[52] rounded-xl border px-4 text-base"
                style={{
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.inputBorder,
                  color: theme.text,
                }}
                placeholder="Create a password"
                placeholderTextColor={theme.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View className="mb-4">
              <ThemedText className="text-[13px] font-semibold mb-2 uppercase tracking-wide" style={{ color: theme.textSecondary }}>
                Confirm Password
              </ThemedText>
              <TextInput
                className="h-[52] rounded-xl border px-4 text-base"
                style={{
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.inputBorder,
                  color: theme.text,
                }}
                placeholder="Confirm your password"
                placeholderTextColor={theme.textSecondary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <Pressable
              className="h-[52] rounded-xl items-center justify-center mt-1"
              style={{ backgroundColor: theme.primary }}
              onPress={handleSignup}
            >
              <ThemedText className="text-[17px] font-bold text-white">Create Account</ThemedText>
            </Pressable>

            <View className="flex-row items-center mt-6 mb-5">
              <View className="flex-1 h-[1px]" style={{ backgroundColor: theme.inputBorder }} />
              <ThemedText className="text-[13px] mx-3.5" style={{ color: theme.textSecondary }}>
                or continue with
              </ThemedText>
              <View className="flex-1 h-[1px]" style={{ backgroundColor: theme.inputBorder }} />
            </View>

            <Pressable
              className="h-[52] rounded-xl border flex-row items-center justify-center gap-2.5"
              style={{
                backgroundColor: theme.inputBackground,
                borderColor: theme.inputBorder,
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
          Already have an account?{' '}
          <ThemedText
            className="text-[13px] font-bold"
            style={{ color: theme.primary }}
            onPress={() => router.back()}
          >
            Log In
          </ThemedText>
        </ThemedText>
      </View>
    </ThemedView>
  );
}
