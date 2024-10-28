import { View, FlatList, Image, StyleSheet } from 'react-native';
import { Text, Searchbar, Chip, FAB, Surface } from 'react-native-paper';
import { router } from 'expo-router';
import { useState } from 'react';
import { CommunityPost } from '@/app/types';

export default function Community() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('자유게시판');

  const tabs = ['자유게시판', '만든 문제', '타임라인'];
  const posts: CommunityPost[] = [
    {
      id: '1',
      author: {
        id: 'user1',
        name: '벅벅는 낙타',
        avatar: '/assets/avatars/1.png'
      },
      content: '암장 민페 썰',
      createdAt: '2024.10.08',
      likes: 5,
      comments: []
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <Chip
            key={tab}
            selected={selectedTab === tab}
            onPress={() => setSelectedTab(tab)}
            style={styles.tab}
          >
            {tab}
          </Chip>
        ))}
      </View>

      <Searchbar
        placeholder="검색어를 입력해 주세요"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Surface style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
              <Text style={styles.authorName}>{item.author.name}</Text>
              <Text style={styles.postDate}>{item.createdAt}</Text>
            </View>
            <Text style={styles.postContent}>{item.content}</Text>
          </Surface>
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/community/new')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  tab: {
    marginRight: 8,
  },
  searchBar: {
    margin: 16,
    elevation: 0,
  },
  postCard: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorName: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  postDate: {
    marginLeft: 'auto',
    color: '#666',
  },
  postContent: {
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#6B4EFF',
  },
});
