import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import FootAnalysisScreen from './src/screens/FootAnalysisScreen';
import RecordInputScreen from './src/screens/RecordInputScreen'; // Ensure this path is correct
import CommunityScreen from './src/screens/CommunityScreen';
import AnalysisResultScreen from './src/screens/AnalysisResultScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="FootAnalysis" 
        component={FootAnalysisScreen} 
        options={{ tabBarLabel: 'Foot Analysis' }} 
      />
      <Tab.Screen 
        name="RecordInput" 
        component={RecordInputScreen} 
        options={{ tabBarLabel: 'Record Input' }} 
      />
      <Tab.Screen 
        name="Community" 
        component={CommunityScreen} 
        options={{ tabBarLabel: 'Community' }} 
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="AnalysisResult" 
            component={AnalysisResultScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
