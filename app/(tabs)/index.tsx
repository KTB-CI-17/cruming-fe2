import { Surface, Text, FAB, Avatar, Modal } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomCalendar from '@/app/components/CustomCalendar';
import { ClimbingRecord } from '@/app/types';
import NewRecordScreen from '@/app/record/new';

export default function CalendarScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [records, setRecords] = useState<ClimbingRecord[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const markedDates = {
    [selectedDate]: { 
      selected: true, 
      selectedColor: '#6B4EFF',
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // Fetch or filter records based on the selected date
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">March 2024</Text>
        <Avatar.Image 
          size={40} 
          source={require('@/assets/avatars/1.png')} 
        />
      </View>

      <CustomCalendar 
        onDateSelect={handleDateSelect} 
        markedDates={markedDates} 
      />

      <View style={styles.recordsList}>
        {records.map((record) => (
          <Surface key={record.id} style={styles.recordCard} elevation={1}>
            <Text variant="titleMedium">{record.location}</Text>
            <Text variant="bodyMedium" style={styles.recordDate}>
              {record.date}
            </Text>
            {record.imageUrl && (
              <Image 
                source={{ uri: record.imageUrl }} 
                style={styles.recordImage}
              />
            )}
          </Surface>
        ))}
      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleOpenModal}
      />

      <Modal 
        visible={isModalVisible} 
        onDismiss={handleCloseModal} 
        contentContainerStyle={styles.modalContainer}
      >
        <NewRecordScreen onClose={handleCloseModal} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  recordsList: {
    padding: 16,
  },
  recordCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  recordDate: {
    color: '#666',
    marginTop: 4,
  },
  recordImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6B4EFF',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    elevation: 5,
  },
});
