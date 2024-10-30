import { Tabs } from 'expo-router';
import { Icon } from 'react-native-paper';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#6B4EFF',
      tabBarInactiveTintColor: '#999999',
      tabBarStyle: {
        height: 60,
        paddingBottom: 8,
        paddingTop: 8,
      },
      tabBarLabelStyle: {
        fontSize: 12,
      },
    }}>
      <Tabs.Screen
        name="profile/index"
        options={{
          title: '내 정보',
          tabBarIcon: ({ color }: { color: string }) => <Icon source="account" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '타임라인',
          tabBarIcon: ({ color }: { color: string }) => <Icon source="calendar" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="community/index"
        options={{
          title: '커뮤니티',
          tabBarIcon: ({ color }: { color: string }) => <Icon source="forum" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="shoes/index"
        options={{
          title: '암벽화',
          tabBarIcon: ({ color }: { color: string }) => <Icon source="shoe-formal" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
