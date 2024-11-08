"use client"

import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react"

export const LikedPostButton =({postId, initialLikes, currentUserId})=> {
    const [likes, setLikes] = useState(initialLikes || []); //state to check amount of likes
    const [hasLiked, setHasLiked] = useState(likes.includes(currentUserId)); //state to check if current user has already liked

    useEffect(() => {
        setHasLiked(likes.includes(currentUserId));
    }, [likes, currentUserId]);

    const handleLike = async()=> {

        const postDoc = doc(db, "posts", postId);

        if(hasLiked) {
            await updateDoc(postDoc, {
                likes : arrayRemove(currentUserId),
            })
            setLikes((prevLikes)=>prevLikes.filter((id)=> id != currentUserId));
            setHasLiked(false);
        }
        else {
            try {
                await updateDoc(postDoc, {
                    likes : arrayUnion(currentUserId),
                })
                setLikes((prevLikes)=>[...prevLikes, currentUserId]);
                setHasLiked(true);
            } catch (err) {
                console.log(err);
            }
        }

    }

    return (
        <Button
         className="flex items-center justify-center"
         onClick={handleLike}
         variant="ghost">
            {hasLiked ? <Heart className="w-4 h-4 bg-rose-500"/> : <Heart className="w-4 h-4"/> }
            {hasLiked ? `Liked (${likes.length})` : `Likes (${likes.length})`}
        </Button>
    )
}