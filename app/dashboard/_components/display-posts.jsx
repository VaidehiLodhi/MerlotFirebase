"use client"

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { db } from "@/config/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { PostBox } from "./post-box";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { DeletePostButton } from "./delete-post";
import { useAuth } from "@/hooks/useAuth";
import { LikedPostButton } from "./liked-post";

export const DisplayPosts = () => {
  const [selectedPost, setSelectedPost] = useState(null); 
  const [postList, setPostList] = useState([]); 

  const {currentUser} = useAuth();
  const postCollectionRef = collection(db, "posts");
  
  useEffect(() => {
    if(!currentUser) return; //login? ensuring


    const onlyCurrentUserQuery = query(
      postCollectionRef,
      where("userId", "==", currentUser.uid)
    )
    const unsubscribe = onSnapshot(onlyCurrentUserQuery, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPostList(docs);
    });

    return () => unsubscribe(); 
  }, [currentUser]);

  const handleDelete =()=> {
    setSelectedPost(null);
  }

  const handlePostUpdated = () => {
    setSelectedPost(null); 
  };

  return (
    <div>
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[10rem]">
          {postList.map((post) => (
            <div key={post.id}>
            <Dialog 
              key={post.id}
              open={selectedPost?.id === post.id}
              onOpenChange={(isOpen) => isOpen ? setSelectedPost(post) : setSelectedPost(null)}>
              <DialogTrigger>
                <BentoGridItem
                  description={post.content.substring(0, 100) + "..."}
                  className="cursor-pointer"
                />
              </DialogTrigger>
              <DialogContent>
                {selectedPost?.id === post.id && (
                  <>
                    <PostBox 
                    postId={post.id}
                    data={selectedPost}
                    onPostUpdated={handlePostUpdated} />
                    <DeletePostButton 
                    postId={post.id} 
                    onPostDeleted={handleDelete}/>
                  </>
                )}
              </DialogContent>
            </Dialog>
            <LikedPostButton
              postId={post.id}
              initialLikes={post.likes || []}
              currentUserId={currentUser?.uid}
            />
            <p>{new Date(post.createdAt.seconds * 1000).toLocaleString()}</p>
            </div>
        ))}  
      </BentoGrid>
    </div>
  );
};
