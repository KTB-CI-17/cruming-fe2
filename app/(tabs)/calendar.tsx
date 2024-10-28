import { Calendar, DateData } from 'react-native-calendars';
import { Surface, Text, FAB, Avatar } from 'react-native-paper';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClimbingRecord } from '@/app/types';

export default function CalendarScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [records, setRecords] = useState<ClimbingRecord[]>([]);

  const markedDates = {
    [selectedDate]: { 
      selected: true, 
      selectedColor: '#6B4EFF',
    }
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

      <Calendar
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#6B4EFF',
          todayTextColor: '#6B4EFF',
          arrowColor: '#6B4EFF',
        }}
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
        onPress={() => router.push('/record/new')}
      />
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
});
