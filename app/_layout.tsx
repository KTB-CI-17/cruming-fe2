import { PaperProvider } from 'react-native-paper';
import { Header } from '@/components/Header';
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import Constants from 'expo-constants';

export default function RootLayout() {
//   useEffect(() => {
//     try {
//       KakaoLogin.initialize(Constants.expoConfig?.extra?.kakaoAppKey);
//     } catch (err) {
//       console.error('Kakao SDK 초기화 실패:', err);
//     }
//   }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Header />
        <Slot />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
