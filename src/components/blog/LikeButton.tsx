'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

interface LikeButtonProps {
  blogId: string;
  initialLikeCount: number;
  isAuthenticated: boolean;
}

export default function LikeButton({ blogId, initialLikeCount, isAuthenticated }: LikeButtonProps) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isCheckingLike, setIsCheckingLike] = useState(isAuthenticated);
  const lastLikeRequest = useRef(0);
  const likeRequestCount = useRef(0);

  useEffect(() => {
    if (isAuthenticated && session?.user) {
      checkLikeStatus();
    } else {
      setIsCheckingLike(false);
    }
  }, [session, isAuthenticated]);

  const checkLikeStatus = async () => {
    if (!isAuthenticated || !session?.user) return;

    try {
      const response = await fetch(`/api/blogs/${blogId}/like`);
      if (response.ok) {
        const data = await response.json();
        setLiked(data.liked);
      }
    } catch (error) {
      console.error('Error checking like status:', error);
    } finally {
      setIsCheckingLike(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated || !session?.user) {
      toast.error('Please sign in to like this post');
      return;
    }
    
    // Rate limiting implementation
    const now = Date.now();
    const timeDiff = now - lastLikeRequest.current;
    
    // Reset counter if more than 10 seconds has passed
    if (timeDiff > 10000) {
      likeRequestCount.current = 0;
    }
    
    // Limit to 10 requests per 10 seconds
    if (likeRequestCount.current >= 10) {
      toast.error('Too many requests. Please wait a moment.');
      console.warn('Rate limit exceeded for likes');
      return;
    }
    
    // Prevent multiple rapid requests (debounce)
    if (timeDiff < 1000) {
      toast.error('Please wait before liking again');
      console.warn('Too many requests, please wait');
      return;
    }
    
    lastLikeRequest.current = now;
    likeRequestCount.current++;
    
    // Optimistic update for instant feedback
    const wasLiked = liked;
    const currentCount = likeCount;
    
    setLiked(!wasLiked);
    setLikeCount(prev => wasLiked ? prev - 1 : prev + 1);

    try {
      const response = await fetch(`/api/blogs/${blogId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        // Server response should match our optimistic update
        setLiked(data.liked);
        
        // Update count from server response
        setLikeCount(data.likeCount);
      } else {
        // Revert optimistic update on error
        setLiked(wasLiked);
        setLikeCount(currentCount);
        const error = await response.json();
        toast.error(error.error || 'Failed to like post');
      }
    } catch {
      // Revert optimistic update on error
      setLiked(wasLiked);
      setLikeCount(currentCount);
      toast.error('Failed to like post');
    }
  };

  if (!isAuthenticated) {
    return (
      <button
        onClick={handleLike}
        className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
      >
        <Heart size={16} />
        {likeCount.toLocaleString()} {likeCount !== 1 ? 'likes' : 'like'}
      </button>
    );
  }

  return (
    <button
      onClick={handleLike}
      disabled={isCheckingLike}
      className={`flex items-center gap-1 transition-all duration-200 hover:scale-105 ${
        isCheckingLike ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <Heart 
        size={16} 
        className={`transition-all duration-200 ${
          liked 
            ? 'fill-current scale-110 text-red-500' 
            : 'text-gray-400 hover:text-red-400'
        }`} 
      />
      {isCheckingLike ? 'Loading...' : ''} {likeCount.toLocaleString()} {likeCount !== 1 ? 'likes' : 'like'}
    </button>
  );
}