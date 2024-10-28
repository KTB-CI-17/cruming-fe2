import React from 'react';
import { View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars'; // You may need to install this package

const MainScreen = () => {
  return (
    <View>
      <Text>Climbing Timeline</Text>
      <Calendar
        // Calendar configuration
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
      />
      <Button title="Add Timeline Entry" onPress={() => {/* Navigate to add entry screen */}} />
    </View>
  );
};

export default MainScreen;
