import { Calendar, DateData } from 'react-native-calendars';
import { View } from 'react-native';

interface CustomCalendarProps {
  onDateSelect: (date: string) => void;
  markedDates: { [key: string]: { selected: boolean; selectedColor: string } };
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ onDateSelect, markedDates }) => {
  return (
    <Calendar
      onDayPress={(day: DateData) => onDateSelect(day.dateString)}
      markedDates={markedDates}
      theme={{
        selectedDayBackgroundColor: '#6B4EFF',
        todayTextColor: '#6B4EFF',
        arrowColor: '#6B4EFF',
      }}
    />
  );
};

export default CustomCalendar; 