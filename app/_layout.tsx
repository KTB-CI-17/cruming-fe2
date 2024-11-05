import { PaperProvider } from 'react-native-paper';
import { Header } from '@/components/Header';
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import Constants from 'expo-constants';
import { AuthProvider } from './contexts/auth';

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <View style={styles.container}>
          <Header />
          <Slot />
        </View>
      </PaperProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
