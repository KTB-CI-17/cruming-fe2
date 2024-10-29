import { PaperProvider } from 'react-native-paper';
import { Header } from '@/components/Header';
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Header />
        <Slot />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
