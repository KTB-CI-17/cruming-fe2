import { View, FlatList, StyleSheet, Image } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { ClimbingShoe } from '@/app/types';
import { Stack } from 'expo-router';

export default function RecommendedShoes() {
  const shoes: ClimbingShoe[] = [
    {
      id: '1',
      name: 'SCARPA DRAGO LV',
      model: '스카르파 드라고 LV 볼넓이 클라이밍화',
      size: 'EU 42',
      imageUrl: '/assets/shoes/drago-lv.jpg'
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: "추천 암벽화",
          headerShown: true,
        }} 
      />
      <FlatList
        data={shoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Surface style={styles.card} elevation={1}>
            <View style={styles.shoeInfo}>
              <Image 
                source={{ uri: item.imageUrl }} 
                style={styles.shoeImage}
              />
              <View style={styles.shoeDetails}>
                <Text style={styles.modelName}>{item.model}</Text>
                <Text style={styles.size}>추천 사이즈: {item.size}</Text>
              </View>
            </View>
          </Surface>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  card: {
    margin: 8,
    padding: 16,
    borderRadius: 8,
  },
  shoeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shoeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  shoeDetails: {
    marginLeft: 16,
    flex: 1,
  },
  modelName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  size: {
    fontSize: 14,
    color: '#666',
  },
});
