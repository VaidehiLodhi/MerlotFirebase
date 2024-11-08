"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { db } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export const AllPosts = () => {
  const [postList, setPostList] = useState([]); 
  const postCollectionRef = collection(db, "posts");

  useEffect(()=>{
    const getAllDemPosts = async()=> {
        try{
            const data = await getDocs(postCollectionRef);
            const dataNeeded = data.docs.map((doc)=>({
                ...doc.data(),
                id : doc.id
            }))
            setPostList(dataNeeded);
        } catch(err) {
            console.log(err);
        }
    }

    getAllDemPosts();
  }, [])

  return (
    <div>
      <BentoGrid>
        {postList.map((post) => (
          <BentoGridItem 
          key={post.id}
          description={post.content}/>))}
      </BentoGrid>
    </div>
  );
};
