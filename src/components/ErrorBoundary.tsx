import React, { Component, type ReactNode, type ErrorInfo } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/theme';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
          <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(239,68,68,0.12)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <ThemedText style={{ fontSize: 24 }}>!</ThemedText>
          </View>
          <ThemedText style={{ fontSize: 20, fontWeight: '700', marginBottom: 8 }}>Something went wrong</ThemedText>
          <ThemedText style={{ fontSize: 13, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: 28 }}>
            An unexpected error occurred. Please try restarting the app.
          </ThemedText>
          <Pressable
            onPress={this.handleReset}
            style={{ height: 48, paddingHorizontal: 32, borderRadius: 14, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' }}
          >
            <ThemedText style={{ fontSize: 15, fontWeight: '700', color: Colors.buttonPrimaryText }}>Try Again</ThemedText>
          </Pressable>
        </View>
      );
    }
    return this.props.children;
  }
}
