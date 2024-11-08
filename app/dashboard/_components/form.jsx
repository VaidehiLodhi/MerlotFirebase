"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { auth, db } from "@/config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

export const DashboardForm = () => {
    const [posts, setPosts] = useState([]);
    const [newText, setNewText] = useState("");
    const postsCollectionRef = collection(db, "posts");

    // Function to fetch posts from Firestore
    const getPosts = useCallback(async () => {
        try {
            const data = await getDocs(postsCollectionRef);
            const dataNeed = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPosts(dataNeed);
        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    }, [postsCollectionRef]);

    
    useEffect(() => {
        getPosts();
    }, [getPosts]);


    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (!newText.trim()) {
            toast.error("Post Content cant be empty! Put some magic!")
            return;
        }

        try {
            await addDoc(postsCollectionRef, {
                content: newText,
                userId: auth?.currentUser?.uid,
                createdAt: new Date(),
                likes : [],
            });
            setNewText(""); 
            toast.success("Post created successfully..")
            getPosts(); 
        } catch (err) {
            console.error("Error adding post:", err);
        }
    };

    
    const handleTextareaChange = (e) => {
        setNewText(e.target.value);
    };

    return (
        <div className="flex py-4 px-2">
            <form className="flex flex-col w-full h-full items-center justify-center " onSubmit={onSubmitForm}>
                <Textarea
                    className="resize-none w-full focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm"
                    placeholder="Get creative, sip a tea, and ink that thought..."
                    type="text"
                    name="textarea"
                    value={newText}
                    onChange={handleTextareaChange}
                />
                <Button type="submit" className="fixed bottom-4 mt-2">
                    Create New Post
                </Button>
            </form>
        </div>
    );
};


