import { View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router'; // useRouter 대신 router 직접 import
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen() {
  const handleLogin = async (provider: 'kakao' | 'naver') => {
    try {
      // TODO: 실제 로그인 로직 구현
      // const result = await loginWithProvider(provider);
      
      // 로그인 성공 시 메인 탭으로 이동
      router.replace('/(tabs)/calendar');
    } catch (error) {
      console.error(`${provider} 로그인 실패:`, error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text variant="headlineLarge" style={styles.titleText}>나만의</Text>
        <Text variant="headlineLarge" style={styles.titleText}>클라이밍</Text>
        <Text variant="headlineLarge" style={styles.titleText}>커뮤니티</Text>
      </View>

      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
      />
      
      <Text variant="displaySmall" style={styles.brandName}>Cruming</Text>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.loginButton, styles.kakaoButton]}
          labelStyle={styles.kakaoButtonText}
          onPress={() => handleLogin('kakao')}
        >
          카카오 로그인
        </Button>

        <Button
          mode="contained"
          style={[styles.loginButton, styles.naverButton]}
          labelStyle={styles.naverButtonText}
          onPress={() => handleLogin('naver')}
        >
          네이버 로그인
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  titleText: {
    color: '#6B4EFF',
    lineHeight: 40,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginVertical: 40,
  },
  brandName: {
    color: '#6B4EFF',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    padding: 20,
  },
  loginButton: {
    marginBottom: 12,
    borderRadius: 8,
    height: 48,
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  kakaoButtonText: {
    color: '#000000',
  },
  naverButton: {
    backgroundColor: '#03C75A',
  },
  naverButtonText: {
    color: '#FFFFFF',
  },
});
