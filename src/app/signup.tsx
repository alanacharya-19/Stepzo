import { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
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
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoSection}>
            <View style={styles.logoWrapper}>
              <ThemedText style={[styles.logoText, { color: theme.primary }]}>
                S
              </ThemedText>
            </View>
            <ThemedText style={[styles.brandName, { color: theme.primary }]}>
              Stepzo
            </ThemedText>
          </View>

          <View style={styles.formSection}>
            <ThemedText style={styles.heading}>Create Account</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>
              Start your fitness journey today
            </ThemedText>

            <View style={styles.inputGroup}>
              <ThemedText themeColor="textSecondary" style={styles.inputLabel}>
                Name
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.backgroundElement,
                    borderColor: theme.cardBorder,
                    color: theme.text,
                  },
                ]}
                placeholder="Enter your name"
                placeholderTextColor={theme.textSecondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText themeColor="textSecondary" style={styles.inputLabel}>
                Email
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.backgroundElement,
                    borderColor: theme.cardBorder,
                    color: theme.text,
                  },
                ]}
                placeholder="Enter your email"
                placeholderTextColor={theme.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText themeColor="textSecondary" style={styles.inputLabel}>
                Password
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.backgroundElement,
                    borderColor: theme.cardBorder,
                    color: theme.text,
                  },
                ]}
                placeholder="Create a password"
                placeholderTextColor={theme.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <ThemedText themeColor="textSecondary" style={styles.inputLabel}>
                Confirm Password
              </ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.backgroundElement,
                    borderColor: theme.cardBorder,
                    color: theme.text,
                  },
                ]}
                placeholder="Confirm your password"
                placeholderTextColor={theme.textSecondary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <Pressable
              style={[styles.signupBtn, { backgroundColor: theme.primary }]}
              onPress={handleSignup}
            >
              <ThemedText style={styles.signupBtnText}>Create Account</ThemedText>
            </Pressable>

            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: theme.cardBorder }]} />
              <ThemedText themeColor="textSecondary" style={styles.dividerText}>
                or continue with
              </ThemedText>
              <View style={[styles.dividerLine, { backgroundColor: theme.cardBorder }]} />
            </View>

            <Pressable
              style={[
                styles.googleBtn,
                {
                  backgroundColor: theme.backgroundElement,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <ThemedText style={styles.googleIcon}>G</ThemedText>
              <ThemedText style={styles.googleText}>Google</ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottom}>
        <ThemedText themeColor="textSecondary" style={styles.bottomText}>
          Already have an account?{' '}
          <ThemedText
            style={[styles.loginText, { color: theme.primary }]}
            onPress={() => router.back()}
          >
            Log In
          </ThemedText>
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoWrapper: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 212, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '900',
  },
  brandName: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
  },
  formSection: {
    width: '100%',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 28,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  signupBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  signupBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 13,
    marginHorizontal: 14,
  },
  googleBtn: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  googleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottom: {
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 13,
  },
  loginText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
