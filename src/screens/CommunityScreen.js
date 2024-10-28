import React from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Card, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CommunityScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [posts, setPosts] = React.useState([
    {
      id: 1,
      title: 'Climbing Gym Experience',
      content: 'Had a great time climbing today...',
      date: '2024-10-08',
      author: 'Climber123',
    },
    // Add more dummy data as needed
  ]);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.postCard}>
            <Card.Title
              title={item.title}
              subtitle={`${item.date} • ${item.author}`}
            />
            <Card.Content>
              <Text numberOfLines={2}>{item.content}</Text>
            </Card.Content>
          </Card>
        )}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreatePost')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    marginBottom: 16,
  },
  postCard: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CommunityScreen;
