import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ImagePicker } from 'expo-image-picker';
import { Surface, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FootAnalysisScreen = ({ navigation }) => {
  const [footImages, setFootImages] = React.useState({
    side: null,
    bottom: null,
  });

  const openCamera = async (type) => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFootImages(prev => ({
        ...prev,
        [type]: result.assets[0].uri
      }));
    }
  };

  return (
    <Surface style={styles.container}>
      <Text style={styles.title}>Foot Analysis</Text>
      
      <View style={styles.imageContainer}>
        <TouchableOpacity 
          style={styles.imageUploadBox}
          onPress={() => openCamera('side')}
        >
          {footImages.side ? (
            <Image 
              source={{ uri: footImages.side }} 
              style={styles.uploadedImage}
            />
          ) : (
            <>
              <Icon name="camera" size={24} color="#666" />
              <Text>Side Image</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.imageUploadBox}
          onPress={() => openCamera('bottom')}
        >
          {footImages.bottom ? (
            <Image 
              source={{ uri: footImages.bottom }} 
              style={styles.uploadedImage}
            />
          ) : (
            <>
              <Icon name="camera" size={24} color="#666" />
              <Text>Bottom Image</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <Button 
        mode="contained"
        style={styles.analyzeButton}
        onPress={() => {
          // Analysis logic implementation
          navigation.navigate('AnalysisResult');
        }}
      >
        Analyze Footwear
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageUploadBox: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: '48%',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  analyzeButton: {
    marginTop: 24,
  },
});

export default FootAnalysisScreen;
