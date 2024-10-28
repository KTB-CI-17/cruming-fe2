import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Ensure correct import
import { Dropdown } from 'react-native-element-dropdown'; // Example of a dropdown library
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RecordInputScreen = ({ navigation }) => {
  const [record, setRecord] = React.useState({
    gymName: '',
    date: new Date(),
    level: '',
    description: '',
    image: null,
  });

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setRecord(prev => ({
        ...prev,
        image: result.assets[0].uri
      }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Gym Name"
        value={record.gymName}
        onChangeText={(text) => setRecord(prev => ({ ...prev, gymName: text }))}
        style={styles.input}
      />

      <TouchableOpacity 
        style={styles.imageUploadBox}
        onPress={openImagePicker}
      >
        {record.image ? (
          <Image 
            source={{ uri: record.image }} 
            style={styles.uploadedImage}
          />
        ) : (
          <>
            <Icon name="camera" size={24} />
            <Text>Activity Image</Text>
          </>
        )}
      </TouchableOpacity>

      <Dropdown
        data={[
          { label: 'Beginner', value: 'beginner' },
          { label: 'Intermediate', value: 'intermediate' },
          { label: 'Advanced', value: 'advanced' },
        ]}
        labelField="label"
        valueField="value"
        placeholder="Select Difficulty"
        value={record.level}
        onChange={item => {
          setRecord(prev => ({ ...prev, level: item.value }));
        }}
        style={styles.dropdown}
      />

      <TextInput
        placeholder="Description"
        value={record.description}
        onChangeText={(text) => setRecord(prev => ({ ...prev, description: text }))}
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <Button 
        title="Submit"
        onPress={() => {
          // Save logic implementation
          navigation.goBack();
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  imageUploadBox: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  dropdown: {
    marginBottom: 16,
  },
});

export default RecordInputScreen; // Ensure you are using default export
