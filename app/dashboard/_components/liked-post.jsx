"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export const LikedPostButton = ({ postId, initialLikes, currentUserId }) => {
  const [likes, setLikes] = useState(initialLikes || []); // State to store the likes
  const [hasLiked, setHasLiked] = useState(likes.includes(currentUserId)); // State to check if the current user has already liked

  // Fetch likes from Firestore when the component mounts or when the postId changes
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const postDocRef = doc(db, "posts", postId);
        const postDoc = await getDoc(postDocRef);
        if (postDoc.exists()) {
          const postData = postDoc.data();
          setLikes(postData.likes || []);
        }
      } catch (err) {
        console.error("Error fetching post data: ", err);
      }
    };

    fetchLikes();
  }, [postId]); // Re-fetch likes when postId changes

  useEffect(() => {
    setHasLiked(likes.includes(currentUserId)); // Update hasLiked state when likes change
  }, [likes, currentUserId]);

  const handleLike = async () => {
    const postDocRef = doc(db, "posts", postId);

    if (hasLiked) {
      await updateDoc(postDocRef, {
        likes: arrayRemove(currentUserId), // Remove user from likes array
      });
      setLikes((prevLikes) => prevLikes.filter((id) => id !== currentUserId)); // Update local likes state
      setHasLiked(false);
    } else {
      try {
        await updateDoc(postDocRef, {
          likes: arrayUnion(currentUserId), // Add user to likes array
        });
        setLikes((prevLikes) => [...prevLikes, currentUserId]); // Update local likes state
        setHasLiked(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Button
      className={`relative bottom-0 flex items-center h-7 w-10 shadow-sm justify-center ${hasLiked ? "bg-gradient-to-r from-rose-400 to-customRed" : "bg-transparent"}`}
      onClick={handleLike}
      size="sm"
      variant="transparent"
    >
      <div className="px-2 py-2 flex items-center gap-x-2">
        <Heart className="w-4 h-4" />
        {likes.length} 
      </div>
    </Button>
  );
};
