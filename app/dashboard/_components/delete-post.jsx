"use client"

import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import { useState } from "react";

export const DeletePostButton =({postId, onPostDeleted,})=> {
    const [isDeleting, setIsDeleting] = useState(false);
    //also need the id for deletion 
    const handleDelete = async()=> {
        setIsDeleting(true);
        try {
            const postDoc = doc(db, "posts", postId);
            await deleteDoc(postDoc);
            onPostDeleted();
        } catch (err) {
            console.log(err);
        } finally {
            setIsDeleting(false);
        }
    }
    
    return (
        <div>
            <Button
            className="relative right-0"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            >
                {isDeleting ? "Deleting.." : "Delete"}
            </Button>
        </div>
    )
}