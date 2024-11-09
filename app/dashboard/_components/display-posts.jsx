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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Grape,} from "lucide-react";

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
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {postList.map((post) => (
            <div key={post.id}>
            <div>
              <Dialog 
                key={post.id}
                open={selectedPost?.id === post.id}
                onOpenChange={(isOpen) => isOpen ? setSelectedPost(post) : setSelectedPost(null)}>
                  <Card className="w-full h-full flex flex-col bg-customViolet border-none">
                    <CardHeader>
                      <HoverBorderGradient>
                        <div className="flex items-center justify-center">
                          {post.title}
                          <Grape className=" ml-2 h-5 w-5"/>
                        </div>
                      </HoverBorderGradient>
                    </CardHeader>
                    <CardContent className="flex-1 flex-col space-y-2 ">
                            <DialogTrigger className="w-full">
                              <div className="w-32 h-32">
                                <p className="text-center overflow-hidden text-ellipsis whitespace-nowrap max-w-200px]">
                                    {post.content}
                                </p>
                              </div>
                            </DialogTrigger>
                              <LikedPostButton
                              postId={post.id}
                              initialLikes={post.initialLikes || []}
                              currentUserId={currentUser?.uid}
                              />
                    </CardContent>
                  </Card>
                
                <DialogContent>
                  {selectedPost?.id === post.id && (
                    <>
                      <PostBox 
                      postId={post.id}
                      data={selectedPost}
                      onPostUpdated={handlePostUpdated} />
                      <p className="text-neutral-500 text-sm">
                         created at {new Date(post.createdAt.seconds * 1000).toLocaleString()}
                      </p>
                      <DeletePostButton 
                      postId={post.id} 
                      onPostDeleted={handleDelete}/>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
            </div>
        ))}  
      </div>
  );
};
