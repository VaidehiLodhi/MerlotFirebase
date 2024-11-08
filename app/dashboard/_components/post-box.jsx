"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; 
import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const PostBox = ({ postId, data, onPostUpdated}) => {
  const [isEditing, setIsEditing] = useState(true);
  const [content, setContent] = useState(data.content); 
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async(e)=> {
    e.preventDefault();
    setIsUpdating(true);
    try {
        const postDoc = doc(db, "posts", postId);
        await updateDoc(postDoc, {content});
        onPostUpdated();
        disableEditing();
    } catch (err) {
        console.log(err);
    } finally {
        setIsUpdating(false);
    }

  }

  const textareaRef = useRef(null);
  const formRef = useRef(null);

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleUpdate} ref={formRef} className="space-y-2">
      <Textarea
        ref={textareaRef}
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        id="postbox"
        disabled={isUpdating}
        className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm"
      />
      <div className="flex items-center gap-x-2">
        <Button 
        disabled ={isUpdating}
        type="submit">
            {isUpdating? "Updating.." : "Update"}
        </Button>
        
      </div>
    </form>
  );
};
