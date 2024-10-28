import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Avatar, Button, Surface } from 'react-native-paper';
import { router } from 'expo-router';
import { useState } from 'react';
import { UserProfile } from '@/app/types';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [profile] = useState<UserProfile>({
    id: '1',
    nickname: '벅타는 낙타',
    socialId: '@_instagram_id',
    introduction: '안녕하세요. 초보 클라이머입니다!',
    followers: 1,
    following: 20,
    avatar: '/assets/avatars/1.png'
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Surface style={styles.profileCard}>
          <Avatar.Image 
            size={80} 
            source={require('@/assets/avatars/1.png')}
            style={styles.avatar}
          />
          <Text variant="headlineSmall" style={styles.nickname}>
            {profile.nickname}
          </Text>
          <Text variant="bodyMedium" style={styles.socialId}>
            {profile.socialId}
          </Text>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text variant="titleMedium">{profile.followers}</Text>
              <Text variant="bodyMedium">팔로워</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="titleMedium">{profile.following}</Text>
              <Text variant="bodyMedium">팔로잉</Text>
            </View>
          </View>

          <Text style={styles.introduction}>{profile.introduction}</Text>

          <View style={styles.actions}>
            <Button 
              mode="outlined" 
              onPress={() => router.push('/profile/edit')}
              style={styles.actionButton}
            >
              프로필 수정
            </Button>
            <Button 
              mode="outlined"
              onPress={() => router.push('/profile/share')}
              style={styles.actionButton}
            >
              프로필 공유
            </Button>
          </View>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileCard: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 16,
  },
  nickname: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  socialId: {
    color: '#666',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  introduction: {
    textAlign: 'center',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
  },
});
