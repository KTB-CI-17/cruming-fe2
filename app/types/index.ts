export interface ClimbingShoe {
  id: string;
  name: string;
  model: string;
  size: string;
  imageUrl: string;
}

export interface CommunityPost {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
}

export interface ClimbingRecord {
  id: string;
  location: string;
  date: string;
  level: string;
  description: string;
  imageUrl?: string;
  visibility: 'public' | 'followers' | 'private';
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  bio?: string;
  sns?: {
    instagram?: string;
    youtube?: string;
  };
  height?: number;
  armReach?: number;
  homeGym?: string;
}

export interface UserProfile {
  id: string;
  nickname: string;
  socialId?: string;
  height?: number;
  footSize?: number;
  introduction?: string;
  gym?: string;
  followers: number;
  following: number;
  avatar: string;
}

export interface Post {
  id: string;
  date: string;
  location: string;
  description: string;
  images: string[];
  visibility: 'public' | 'followers' | 'private';
}
