import { View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Icon } from 'react-native-paper';
import { router } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewPost() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    image: null as string | null,
  });

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPost(prev => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text variant="headlineMedium" style={styles.title}>새 게시물</Text>

        <TextInput
          label="제목"
          value={post.title}
          onChangeText={(text) => setPost(prev => ({ ...prev, title: text }))}
          style={styles.input}
          mode="outlined"
        />

        <TouchableOpacity 
          style={styles.imageUpload}
          onPress={handleImagePick}
        >
          {post.image ? (
            <Image source={{ uri: post.image }} style={styles.selectedImage} />
          ) : (
            <>
              <Icon source="camera" size={24} />
              <Text>사진 등록</Text>
            </>
          )}
        </TouchableOpacity>

        <TextInput
          label="내용"
          value={post.content}
          onChangeText={(text) => setPost(prev => ({ ...prev, content: text }))}
          multiline
          numberOfLines={4}
          style={styles.input}
          mode="outlined"
        />

        <Button
          mode="contained"
          onPress={() => router.back()}
          style={styles.submitButton}
        >
          등록
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 24,
    padding: 16,
  },
  input: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  imageUpload: {
    height: 200,
    margin: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  submitButton: {
    margin: 16,
    backgroundColor: '#6B4EFF',
  },
});
