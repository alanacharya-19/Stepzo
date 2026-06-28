import { useState } from 'react';
import { View, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/use-theme';

export default function SignupScreen() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    await AsyncStorage.setItem('@stepzo_user_data', JSON.stringify({ name, email }));
    router.replace('/onboarding');
  };

  const inp = (label: string, val: string, set: (v: string) => void, opts?: { secure?: boolean; ktype?: any; cap?: any }) => (
    <View className="mb-4">
      <ThemedText className="text-[12px] font-semibold mb-2" style={{ color: theme.textSecondary }}>{label}</ThemedText>
      <TextInput
        className="h-[50] rounded-xl border px-4 text-[15px]"
        style={{ backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }}
        placeholder={`Enter ${label.toLowerCase()}`}
        placeholderTextColor={theme.textSecondary}
        value={val}
        onChangeText={set}
        secureTextEntry={opts?.secure}
        keyboardType={opts?.ktype}
        autoCapitalize={opts?.cap}
      />
    </View>
  );

  return (
    <ThemedView className="flex-1">
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerClassName="grow justify-center px-7 pt-[60] pb-10" keyboardShouldPersistTaps="handled">
          <ThemedText className="text-[28px] font-bold mb-1">Create Account</ThemedText>
          <ThemedText className="text-[14px] mb-8" style={{ color: theme.textSecondary }}>Start your fitness journey today</ThemedText>
          <View className="w-full">
            {inp("Name", name, setName, { cap: 'words' as any })}
            {inp("Email", email, setEmail, { ktype: 'email-address' as any, cap: 'none' as any })}
            {inp("Password", password, setPassword, { secure: true })}
            {inp("Confirm Password", confirmPassword, setConfirmPassword, { secure: true })}
            <Pressable className="h-[50] rounded-xl items-center justify-center mt-2" style={{ backgroundColor: theme.primary }} onPress={handleSignup}>
              <ThemedText className="text-[16px] font-bold" style={{ color: '#0B1020' }}>Create Account</ThemedText>
            </Pressable>
            <View className="flex-row items-center mt-6 mb-5">
              <View className="flex-1 h-[1px]" style={{ backgroundColor: theme.inputBorder }} />
              <ThemedText className="text-[12px] mx-3.5" style={{ color: theme.textSecondary }}>or continue with</ThemedText>
              <View className="flex-1 h-[1px]" style={{ backgroundColor: theme.inputBorder }} />
            </View>
            <Pressable className="h-[50] rounded-xl border flex-row items-center justify-center gap-2.5" style={{ backgroundColor: theme.inputBackground, borderColor: theme.inputBorder }}>
              <ThemedText className="text-lg font-extrabold text-white">G</ThemedText>
              <ThemedText className="text-[15px] font-semibold">Google</ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View className="items-center pb-[40]" style={{ paddingBottom: Platform.OS === 'ios' ? 40 : 24 }}>
        <ThemedText className="text-[13px]" style={{ color: theme.textSecondary }}>
          Already have an account?{' '}
          <ThemedText className="text-[13px] font-bold" style={{ color: theme.primary }} onPress={() => router.back()}>Log In</ThemedText>
        </ThemedText>
      </View>
    </ThemedView>
  );
}
