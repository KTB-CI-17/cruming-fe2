import { View, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReactElement, useEffect, useState } from 'react';
import { login, getProfile } from '@react-native-seoul/kakao-login';
import type {
  GetProfileResponse,
  NaverLoginResponse,
} from '@react-native-seoul/naver-login';
import NaverLogin from '@react-native-seoul/naver-login';
import { useAuth } from '@/app/contexts/auth';
const Gap = (): ReactElement => <View style={{ marginTop: 24 }} />;
const ResponseJsonText = ({
  json = {},
  name,
}: {
  json?: object;
  name: string;
}): ReactElement => (
  <View
    style={{
      padding: 12,
      borderRadius: 16,
      borderWidth: 1,
      backgroundColor: '#242c3d',
    }}
  >
    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
      {name}
    </Text>
    <Text style={{ color: 'white', fontSize: 13, lineHeight: 20 }}>
      {JSON.stringify(json, null, 4)}
    </Text>
  </View>
);
/** Fill your keys */
const consumerKey = 'js0fZdXgGDN6cvtbNv87';
const consumerSecret = 'fqsAq578xA';
const appName = 'cruming';

/** This key is setup in iOS. So don't touch it */
const serviceUrlScheme = 'naverlogin';
export default function AuthScreen() {
  const { exchangeSocialToken } = useAuth();

  useEffect(() => {
    console.log('NaverLogin:', NaverLogin); 
    NaverLogin.initialize({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlSchemeIOS: serviceUrlScheme,
      disableNaverAppAuthIOS: true,
    });
  }, []);

  const [success, setSuccessResponse] =
    useState<NaverLoginResponse['successResponse']>();

  const [failure, setFailureResponse] =
    useState<NaverLoginResponse['failureResponse']>();
  const [getProfileRes, setGetProfileRes] = useState<GetProfileResponse>();

  const [result, setResult] = useState<string>('');

  // const mapKakaoProfile = (profile: any): UserProfile => ({
  //   id: profile.id?.toString() || '',
  //   nickname: profile.nickname || '',
  //   profileImage: profile.profileImageUrl || profile.thumbnailImageUrl || '',
  // });

  // const mapNaverProfile = (profile: any): UserProfile => ({
  //   id: profile.response?.id || '',
  //   nickname: profile.response?.nickname || '',
  //   profileImage: profile.response?.profile_image || '',
  // });

  const handleLogin = async (provider: 'kakao' | 'naver') => {
    try {
      if (provider === 'kakao') {
        const token = await login();
        // const kakaoProfile = await getProfile();
        // const mappedProfile = mapKakaoProfile(kakaoProfile);
        await exchangeSocialToken(token.accessToken, provider.toUpperCase());
        console.log('Kakao login success:', token);
      } else if (provider === 'naver') {
        const { failureResponse, successResponse } = await NaverLogin.login();
        if (successResponse?.accessToken) {
          // const naverProfile = await NaverLogin.getProfile(successResponse.accessToken);
          // const mappedProfile = mapNaverProfile(naverProfile);
          await exchangeSocialToken(successResponse.accessToken, provider.toUpperCase());
          console.log('Naver login success:', successResponse);
        }
      }
      router.replace('/(tabs)/');
    } catch (error) {
      console.error(`${provider} login failed:`, error);
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleText: {
    color: '#6B4EFF',
    lineHeight: 40,
    fontSize: 24,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginVertical: 20,
  },
  brandName: {
    color: '#6B4EFF',
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 32,
  },
  buttonContainer: {
    padding: 20,
    width: '100%',
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
