import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

// export interface UserProfile {
//   id: string;
//   nickname: string;
//   profileImage: string;
// }

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  exchangeSocialToken: (socialToken: string, provider: string) => Promise<void>;
  logout: () => Promise<void>;
  getValidToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const token = await getValidToken();
      if (token) {
        setIsAuthenticated(true);
        router.replace('/(tabs)/');
      } else {
        router.replace('/(auth)');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      router.replace('/(auth)');
    }
  }

  async function exchangeSocialToken(socialToken: string, provider: string) {
    try {
      const response = await fetch('http://내컴퓨터로컬아이피:8080/api/v1/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          socialToken,
          provider,
          // profile,
        }),
      });

      if (!response.ok) throw new Error('Token exchange failed');

      const serverTokens: TokenData = await response.json();
      await AsyncStorage.setItem('tokenData', JSON.stringify(serverTokens));
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error exchanging token:', error);
      throw error;
    }
  }

  async function getValidToken(): Promise<string | null> {
    try {
      const tokenDataString = await AsyncStorage.getItem('tokenData');
      if (!tokenDataString) return null;

      const tokenData: TokenData = JSON.parse(tokenDataString);
      const now = Date.now();

      if (tokenData.expiresAt - now < TOKEN_REFRESH_THRESHOLD) {
        // 서버에 토큰 갱신 요청
        const response = await fetch('YOUR_API_URL/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: tokenData.refreshToken,
          }),
        });

        if (!response.ok) {
          await logout();
          return null;
        }

        const newTokenData: TokenData = await response.json();
        await AsyncStorage.setItem('tokenData', JSON.stringify(newTokenData));
        return newTokenData.accessToken;
      }

      return tokenData.accessToken;
    } catch (error) {
      console.error('Error getting valid token:', error);
      return null;
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem('tokenData');
      setIsAuthenticated(false);
      router.replace('/(auth)');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        setIsAuthenticated, 
        exchangeSocialToken, 
        logout,
        getValidToken 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 