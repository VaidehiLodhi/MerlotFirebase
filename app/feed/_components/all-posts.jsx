"use client"

import { LikedPostButton } from "@/app/dashboard/_components/liked-post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { db } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";
import { collection, getDocs } from "firebase/firestore";
import { Grape } from "lucide-react";
import { useEffect, useState } from "react";

export const AllPosts = () => {
  const [postList, setPostList] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const {currentUser} = useAuth();  
  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getAllDemPosts = async () => {
      try {
        const data = await getDocs(postCollectionRef);
        const dataNeeded = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          displayName: doc.data()?.displayName || "Anonymous",
        }));
        setPostList(dataNeeded);
      } catch (err) {
        console.log(err);
      }
    };

    getAllDemPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 px-4 bg-[#2f0468]">
      {postList.map((post) => (
        <Dialog 
                key={post.id}
                open={selectedPost?.id === post.id}
                onOpenChange={(isOpen) => isOpen ? setSelectedPost(post) : setSelectedPost(null)}>
                  <Card className="w-full h-48 rounded-none flex flex-col bg-customViolet/70 border-none hover:bg-customViolet">
                    <CardHeader>
                        <div className="flex items-center ">
                            <Avatar className="mr-2">
                                <AvatarImage
                                alt="Profile"
                                className="w-full h-auto rounded-full object-cover"
                                src={post?.photo}
                                fill/>
                                <AvatarFallback className="bg-customBlack/80 text-customWhite">{post?.displayName?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {post.displayName}
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex-col p-0 items-center justify-center space-y-2">
                            <DialogTrigger className="w-full">
                                <p className="text-center overflow-hidden text-ellipsis whitespace-nowrap max-w-200px]">
                                    {post.content}
                                </p>
                            </DialogTrigger>
                            <div className="px-3 py-7">
                              <LikedPostButton
                              postId={post.id}
                              initialLikes={post.initialLikes || []}
                              currentUserId={currentUser?.uid}
                              />
                            </div>
                    </CardContent>
                  </Card>
                
                <DialogContent>
                  {selectedPost?.id === post.id && (
                    <>
                    {post.content}
                    </>
                  )}
                </DialogContent>
              </Dialog>
      ))}
    </div>
  );
};
