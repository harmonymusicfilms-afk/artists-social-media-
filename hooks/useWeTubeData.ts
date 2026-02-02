import { useState, useEffect, useCallback } from 'react';
import { Video, Comment } from '../types';
import { MOCK_VIDEOS, MOCK_COMMENTS, CURRENT_USER_PROFILE } from '../constants';

const KEYS = {
  VIDEOS: 'wetube_videos_v1',
  COMMENTS: 'wetube_comments_v1',
  INTERACTIONS: 'wetube_interactions_v1',
};

interface UserInteractions {
  likedVideos: string[];
  dislikedVideos: string[];
  subscribedCreators: string[];
}

// Helper to seed comments for mock videos
const seedComments = (): Record<string, Comment[]> => {
  const commentsMap: Record<string, Comment[]> = {};
  MOCK_VIDEOS.forEach(v => {
    commentsMap[v.id] = JSON.parse(JSON.stringify(MOCK_COMMENTS)); // Deep copy
  });
  return commentsMap;
};

export const useWeTubeData = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [interactions, setInteractions] = useState<UserInteractions>({
    likedVideos: [],
    dislikedVideos: [],
    subscribedCreators: [],
  });

  // Load data on mount
  useEffect(() => {
    const storedVideos = localStorage.getItem(KEYS.VIDEOS);
    const storedComments = localStorage.getItem(KEYS.COMMENTS);
    const storedInteractions = localStorage.getItem(KEYS.INTERACTIONS);

    if (storedVideos) {
      setVideos(JSON.parse(storedVideos));
    } else {
      setVideos(MOCK_VIDEOS);
      localStorage.setItem(KEYS.VIDEOS, JSON.stringify(MOCK_VIDEOS));
    }

    if (storedComments) {
      setComments(JSON.parse(storedComments));
    } else {
      const initialComments = seedComments();
      setComments(initialComments);
      localStorage.setItem(KEYS.COMMENTS, JSON.stringify(initialComments));
    }

    if (storedInteractions) {
      setInteractions(JSON.parse(storedInteractions));
    }
  }, []);

  // Save interactions when changed
  useEffect(() => {
    localStorage.setItem(KEYS.INTERACTIONS, JSON.stringify(interactions));
  }, [interactions]);

  // Save videos when changed (e.g. stats update)
  useEffect(() => {
    if (videos.length > 0) {
        localStorage.setItem(KEYS.VIDEOS, JSON.stringify(videos));
    }
  }, [videos]);

  // Save comments when changed
  useEffect(() => {
    if (Object.keys(comments).length > 0) {
        localStorage.setItem(KEYS.COMMENTS, JSON.stringify(comments));
    }
  }, [comments]);

  const getVideo = useCallback((videoId: string) => {
    return videos.find(v => v.id === videoId);
  }, [videos]);

  const getComments = useCallback((videoId: string) => {
    return comments[videoId] || [];
  }, [comments]);

  const isLiked = useCallback((videoId: string) => interactions.likedVideos.includes(videoId), [interactions]);
  const isDisliked = useCallback((videoId: string) => interactions.dislikedVideos.includes(videoId), [interactions]);
  const isSubscribed = useCallback((creatorId: string) => interactions.subscribedCreators.includes(creatorId), [interactions]);

  const toggleLike = useCallback((videoId: string) => {
    setInteractions(prev => {
      const isLiked = prev.likedVideos.includes(videoId);
      const isDisliked = prev.dislikedVideos.includes(videoId);
      
      let newLiked = isLiked 
        ? prev.likedVideos.filter(id => id !== videoId)
        : [...prev.likedVideos, videoId];
      
      let newDisliked = isDisliked ? prev.dislikedVideos.filter(id => id !== videoId) : prev.dislikedVideos;

      // Update Video Stats
      setVideos(currentVideos => currentVideos.map(v => {
        if (v.id === videoId) {
          return {
            ...v,
            stats: {
              ...v.stats,
              likes: isLiked ? v.stats.likes - 1 : v.stats.likes + 1,
              dislikes: isDisliked ? v.stats.dislikes - 1 : v.stats.dislikes
            }
          };
        }
        return v;
      }));

      return { ...prev, likedVideos: newLiked, dislikedVideos: newDisliked };
    });
  }, []);

  const toggleDislike = useCallback((videoId: string) => {
    setInteractions(prev => {
      const isLiked = prev.likedVideos.includes(videoId);
      const isDisliked = prev.dislikedVideos.includes(videoId);

      let newDisliked = isDisliked
        ? prev.dislikedVideos.filter(id => id !== videoId)
        : [...prev.dislikedVideos, videoId];

      let newLiked = isLiked ? prev.likedVideos.filter(id => id !== videoId) : prev.likedVideos;

      // Update Video Stats
      setVideos(currentVideos => currentVideos.map(v => {
        if (v.id === videoId) {
          return {
            ...v,
            stats: {
              ...v.stats,
              likes: isLiked ? v.stats.likes - 1 : v.stats.likes,
              dislikes: isDisliked ? v.stats.dislikes - 1 : v.stats.dislikes + 1
            }
          };
        }
        return v;
      }));

      return { ...prev, likedVideos: newLiked, dislikedVideos: newDisliked };
    });
  }, []);

  const toggleSubscribe = useCallback((creatorId: string) => {
    setInteractions(prev => {
      const isSub = prev.subscribedCreators.includes(creatorId);
      const newSubs = isSub
        ? prev.subscribedCreators.filter(id => id !== creatorId)
        : [...prev.subscribedCreators, creatorId];
        
      if (!isSub) {
          // Mock notification
          // In a real app, this would trigger a backend notification
          console.log(`Subscribed to ${creatorId}`);
      }
      return { ...prev, subscribedCreators: newSubs };
    });
  }, []);

  const addComment = useCallback((videoId: string, text: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      user: {
        name: CURRENT_USER_PROFILE.displayName,
        avatar: CURRENT_USER_PROFILE.avatar,
      },
      text,
      timestamp: 'Just now',
      likes: 0,
      replies: []
    };

    setComments(prev => ({
      ...prev,
      [videoId]: [newComment, ...(prev[videoId] || [])]
    }));

    setVideos(currentVideos => currentVideos.map(v => {
        if (v.id === videoId) {
            return {
                ...v,
                stats: { ...v.stats, comments: v.stats.comments + 1 }
            };
        }
        return v;
    }));
  }, []);

  const deleteComment = useCallback((videoId: string, commentId: string) => {
      setComments(prev => ({
          ...prev,
          [videoId]: (prev[videoId] || []).filter(c => c.id !== commentId)
      }));
      
      setVideos(currentVideos => currentVideos.map(v => {
        if (v.id === videoId) {
            return {
                ...v,
                stats: { ...v.stats, comments: Math.max(0, v.stats.comments - 1) }
            };
        }
        return v;
    }));
  }, []);

  const incrementViews = useCallback((videoId: string) => {
      setVideos(currentVideos => currentVideos.map(v => {
          if (v.id === videoId) {
              return {
                  ...v,
                  stats: { ...v.stats, views: v.stats.views + 1 }
              };
          }
          return v;
      }));
  }, []);

  return {
    videos,
    getVideo,
    getComments,
    isLiked,
    isDisliked,
    isSubscribed,
    toggleLike,
    toggleDislike,
    toggleSubscribe,
    addComment,
    deleteComment,
    incrementViews
  };
};
