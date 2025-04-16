"use client";

import { client } from "@/sanity/client";
import { LikesProps } from "@/utils/interface";
import { FaRegHeart } from "react-icons/fa6";
import * as React from "react";
 

export const Likes = ({ postId, postLikes }: LikesProps) => {
  const [likes, setLikes] = React.useState<number>(postLikes || 0); // Manage likes locally
  const [isLiking, setIsLiking] = React.useState<boolean>(false); // Prevent multiple clicks

  const handleLike = async () => { 
    
    if (isLiking) return; // Prevent multiple requests
    setIsLiking(true); 
    try {
      // Update likes in Sanity
      await client
        .patch(postId)
        .setIfMissing({ likes: 0 }) // Ensure the "likes" field exists
        .inc({ likes: 1 }) // Increment the "likes" field by 1
        .commit();

      // Update likes locally
      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error("Error updating likes:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <span className="flex items-center gap-2 "> 
      <button
        onClick={handleLike}
        className="flex gap-2 items-center text-white bg-gray-900 hover:bg-primary py-1 px-4 rounded-full"
        disabled={isLiking} // Disable button while liking
      >
        Like
        <FaRegHeart className=" text-white fill-white" />
      </button>
        <p className="text-inherit text-lg">{likes}</p>
    </span>
  );
};
