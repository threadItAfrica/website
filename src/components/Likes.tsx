'use client'
import { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

interface LikesProps {
  postId: string
  postLikes?: number
}

export const Likes = ({ postId, postLikes = 0 }: LikesProps) => {
  const [likes, setLikes] = useState(postLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleLike = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      // API call to update likes
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, action: isLiked ? "unlike" : "like" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update likes");
      }

      // Update state only after successful API call
      setIsLiked(!isLiked);
      setLikes(data.likes); // Use the likes count from the server
    } catch (error) {
      console.error("Error updating likes:", error);
      // Show error to user if needed
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={handleLike}
        className={`relative flex items-center justify-center p-2 rounded-full 
          ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}
          ${isProcessing ? 'cursor-wait' : 'cursor-pointer'}
          transition-colors duration-200`}
        whileTap={{ scale: 0.9 }}
        disabled={isProcessing}
      >
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          animate={{
            scale: isLiked ? [1, 1.2, 1] : 1,
            color: isLiked ? '#ef4444' : '#6b7280'
          }}
          transition={{ duration: 0.2 }}
        >
          <FaHeart className={`w-6 h-6 ${isProcessing ? 'opacity-50' : ''}`} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        <motion.span
          key={likes}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-gray-500 min-w-[20px]"
        >
          {likes}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
