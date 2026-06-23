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

export default function LoginScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
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
            <ThemedText style={styles.welcome}>Welcome Back</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>
              Log in to continue your journey
            </ThemedText>

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
                placeholder="Enter your password"
                placeholderTextColor={theme.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <Pressable
              style={[styles.loginBtn, { backgroundColor: theme.primary }]}
              onPress={handleLogin}
            >
              <ThemedText style={styles.loginBtnText}>Log In</ThemedText>
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
          Don't have an account?{' '}
          <ThemedText
            style={[styles.signupText, { color: theme.primary }]}
            onPress={() => {}}
          >
            Sign Up
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
    paddingTop: 80,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 212, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '900',
  },
  brandName: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
  },
  formSection: {
    width: '100%',
  },
  welcome: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
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
  loginBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
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
  signupText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
