import { View } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

interface FootImage {
  uri: string;
  type: 'side' | 'bottom';
}

export default function AnalysisScreen() {
  const [footImages, setFootImages] = useState<FootImage[]>([]);

  const handleTakePhoto = async (type: 'side' | 'bottom') => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setFootImages(prev => [...prev, { uri: result.assets[0].uri, type }]);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  return (
    <Surface style={styles.container}>
      <Text variant="headlineMedium">족형 분석</Text>
      <View style={styles.imageContainer}>
        {['side', 'bottom'].map((type) => (
          <Button
            key={type}
            mode="outlined"
            icon="camera"
            onPress={() => handleTakePhoto(type as 'side' | 'bottom')}
            style={styles.button}
          >
            {type === 'side' ? '측면 사진' : '발바닥 사진'}
          </Button>
        ))}
      </View>
      <Button
        mode="contained"
        onPress={() => router.push('/shoes/recommended')}
        disabled={footImages.length !== 2}
        style={styles.analyzeButton}
      >
        분석하기
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    flexDirection: 'column',
    gap: 16,
    marginVertical: 24,
  },
  button: {
    marginBottom: 12,
  },
  analyzeButton: {
    marginTop: 24,
  },
});
