import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Avatar, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProfileEdit() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    nickname: '',
    socialLink: '',
    height: '',
    weight: '',
    introduction: '',
    avatar: null as string | null,
  });

  const handleAvatarPick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile(prev => ({ ...prev, avatar: result.assets[0].uri }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>프로필 수정</Text>

      <View style={styles.avatarContainer}>
        <Avatar.Image 
          size={100}
          source={profile.avatar ? { uri: profile.avatar } : require('@/assets/avatars/1.png')}
        />
        <TouchableOpacity 
          style={styles.avatarEditButton}
          onPress={handleAvatarPick}
        >
          <Icon name="camera" size={20} />
        </TouchableOpacity>
      </View>

      <TextInput
        label="닉네임"
        value={profile.nickname}
        onChangeText={(text) => setProfile(prev => ({ ...prev, nickname: text }))}
        style={styles.input}
      />

      <TextInput
        label="SNS Link"
        value={profile.socialLink}
        onChangeText={(text) => setProfile(prev => ({ ...prev, socialLink: text }))}
        style={styles.input}
      />

      <View style={styles.measurementInputs}>
        <TextInput
          label="키"
          value={profile.height}
          onChangeText={(text) => setProfile(prev => ({ ...prev, height: text }))}
          style={[styles.input, styles.halfInput]}
          keyboardType="numeric"
        />
        <TextInput
          label="발 길이"
          value={profile.weight}
          onChangeText={(text) => setProfile(prev => ({ ...prev, weight: text }))}
          style={[styles.input, styles.halfInput]}
          keyboardType="numeric"
        />
      </View>

      <TextInput
        label="한줄 소개"
        value={profile.introduction}
        onChangeText={(text) => setProfile(prev => ({ ...prev, introduction: text }))}
        multiline
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={() => {
          // Save profile logic
          router.back();
        }}
        style={styles.submitButton}
      >
        수정
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarEditButton: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
  },
  input: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  measurementInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  submitButton: {
    marginTop: 16,
  },
}); 