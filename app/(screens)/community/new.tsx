import { View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Icon } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function NewPost() {
  const router = useRouter();
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Button onPress={() => router.back()}>←</Button>
        <TextInput
          placeholder="제목"
          value={post.title}
          onChangeText={(text) => setPost(prev => ({ ...prev, title: text }))}
          style={styles.titleInput}
        />
      </View>

      <TouchableOpacity 
        style={styles.imagePickerButton}
        onPress={handleImagePick}
      >
        {post.image ? (
          <Image source={{ uri: post.image }} style={styles.selectedImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Icon source="camera" size={24} />
            <Text>사진 등록</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="내용"
        value={post.content}
        onChangeText={(text) => setPost(prev => ({ ...prev, content: text }))}
        multiline
        style={styles.contentInput}
      />

      <Button
        mode="contained"
        onPress={() => {
          // Submit post logic
          router.back();
        }}
        style={styles.submitButton}
      >
        등록
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  titleInput: {
    flex: 1,
    marginLeft: 16
  },
  imagePickerButton: {
    height: 200,
    margin: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentInput: {
    flex: 1,
    margin: 16,
    minHeight: 200,
  },
  submitButton: {
    margin: 16,
  },
}); 