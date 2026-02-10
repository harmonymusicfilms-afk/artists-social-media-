
import { useState, useEffect, useCallback } from 'react';
import { Video, Comment } from '../types';
import { MOCK_VIDEOS, MOCK_COMMENTS, CURRENT_USER_PROFILE } from '../constants';
import { apiFetchVideos, apiFetchShorts } from '../lib/api';

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

export const useWeTubeData = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [shorts, setShorts] = useState<Video[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [interactions, setInteractions] = useState<UserInteractions>({
    likedVideos: [],
    dislikedVideos: [],
    subscribedCreators: [],
  });

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
        const fetchedVideos = await apiFetchVideos();
        const fetchedShorts = await apiFetchShorts();
        setVideos(fetchedVideos);
        setShorts(fetchedShorts);
    };
    loadData();

    // Load Local Storage Interactions
    const storedInteractions = localStorage.getItem(KEYS.INTERACTIONS);
    if (storedInteractions) {
      setInteractions(JSON.parse(storedInteractions));
    }
  }, []);

  // Save interactions when changed
  useEffect(() => {
    localStorage.setItem(KEYS.INTERACTIONS, JSON.stringify(interactions));
  }, [interactions]);

  const getVideo = useCallback((videoId: string) => {
    return videos.find(v => v.id === videoId) || shorts.find(s => s.id === videoId);
  }, [videos, shorts]);

  const getComments = useCallback((videoId: string) => {
    // Return mock comments for now, real comments would need a DB table
    return comments[videoId] || MOCK_COMMENTS;
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

      // Optimistically update local video stats
      setVideos(currentVideos => currentVideos.map(v => {
        if (v.id === videoId) {
          return {
            ...v,
            stats: {
              ...v.stats,
              likes: isLiked ? v.stats.likes - 1 : v.stats.likes + 1
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

      return { ...prev, likedVideos: newLiked, dislikedVideos: newDisliked };
    });
  }, []);

  const toggleSubscribe = useCallback((creatorId: string) => {
    setInteractions(prev => {
      const isSub = prev.subscribedCreators.includes(creatorId);
      const newSubs = isSub
        ? prev.subscribedCreators.filter(id => id !== creatorId)
        : [...prev.subscribedCreators, creatorId];
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
  }, []);

  const deleteComment = useCallback((videoId: string, commentId: string) => {
      setComments(prev => ({
          ...prev,
          [videoId]: (prev[videoId] || []).filter(c => c.id !== commentId)
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
    shorts,
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
