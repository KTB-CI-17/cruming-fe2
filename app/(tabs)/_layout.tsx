import { Tabs } from 'expo-router';
import { Icon } from 'react-native-paper';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#6B4EFF',
      tabBarInactiveTintColor: '#999999',
    }}>
      <Tabs.Screen
        name="profile"
        options={{
          title: '내 정보',
          tabBarIcon: ({ color }) => <Icon source="account" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: '영상 분석',
          tabBarIcon: ({ color }) => <Icon source="video" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: '타임라인',
          tabBarIcon: ({ color }) => <Icon source="calendar" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: '커뮤니티',
          tabBarIcon: ({ color }) => <Icon source="forum" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="shoes"
        options={{
          title: '암벽화',
          tabBarIcon: ({ color }) => <Icon source="shoe-formal" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
