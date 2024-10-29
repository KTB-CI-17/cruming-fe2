import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, Button, SegmentedButtons, Text, Icon } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';

interface NewRecordScreenProps {
  onClose: () => void; // Prop for closing the modal
}

export default function NewRecordScreen({ onClose }: NewRecordScreenProps) {
  const router = useRouter();
  const [record, setRecord] = useState({
    location: '',
    date: new Date(),
    level: '',
    description: '',
    image: null,
    visibility: 'public' as const,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    // TODO: Implement record submission logic
    // After submission, close the modal
    onClose(); // Close the modal
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text variant="headlineMedium" style={styles.title}>활동 기록 등록</Text>

        <TextInput
          label="위치"
          value={record.location}
          onChangeText={(text) => setRecord(prev => ({ ...prev, location: text }))}
          style={styles.input}
          left={<TextInput.Icon icon="map-marker" />}
          mode="outlined"
        />

        <TouchableOpacity 
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <TextInput.Icon icon="calendar" />
          <Text>{record.date.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={record.date}
            mode="date"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setRecord(prev => ({ ...prev, date }));
            }}
          />
        )}

        <TextInput
          label="Level"
          value={record.level}
          onChangeText={(text) => setRecord(prev => ({ ...prev, level: text }))}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="내용"
          value={record.description}
          onChangeText={(text) => setRecord(prev => ({ ...prev, description: text }))}
          multiline
          numberOfLines={4}
          style={styles.input}
          mode="outlined"
        />

        <TouchableOpacity style={styles.imageUpload}>
          <Icon source="camera" size={24} />
          <Text>활동 사진</Text>
        </TouchableOpacity>

        <SegmentedButtons
          value={record.visibility}
          onValueChange={(value) => setRecord(prev => ({ ...prev, visibility: value as typeof record.visibility }))}
          buttons={[
            { value: 'public', label: '전체 공개' },
            { value: 'followers', label: '팔로워 공개' },
            { value: 'private', label: '나만보기' },
          ]}
          style={styles.visibilityButtons}
        />

        <Button
          mode="contained"
          onPress={handleSubmit} // Call handleSubmit on press
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
  scrollView: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  imageUpload: {
    height: 120,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  visibilityButtons: {
    marginBottom: 24,
  },
  submitButton: {
    marginBottom: 24,
    backgroundColor: '#6B4EFF',
  },
});
