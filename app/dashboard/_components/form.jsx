"use client"

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export const DashboardForm = ({onFormSubmit,}) => {
    const [posts, setPosts] = useState([]);
    const [newText, setNewText] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const postsCollectionRef = collection(db, "posts");

    // Create refs for the input and textarea
    const titleInputRef = useRef(null);
    const textInputRef = useRef(null);


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
        if (!newText.trim() || !newTitle.trim()) {
            toast.error("Post Content or title can't be empty! Put some magic!");
            return;
        }

        try {
            await addDoc(postsCollectionRef, {
                title: newTitle,
                content: newText,
                userId: auth?.currentUser?.uid,
                createdAt: new Date(),
                likes: [],
                displayName: auth?.currentUser?.displayName,
                photo: auth?.currentUser?.photoURL,
                
            });
            setNewText(""); 
            setNewTitle("");
            toast.success("Post created successfully..");
            getPosts(); 

            if(onFormSubmit) {
                onFormSubmit();
            }

        } catch (err) {
            console.error("Error adding post:", err);
        }
    };

    const handleTextareaChange = (e) => {
        setNewText(e.target.value);
    };

    const handleInputChange = (e) => {
        setNewTitle(e.target.value);
    };

    return (
        <div className="flex py-4 px-2">
            <form className="flex flex-col w-full h-full items-center justify-center" onSubmit={onSubmitForm}>
                <Input
                    placeholder="Enter a Title"
                    type="text"
                    name="title"
                    value={newTitle}
                    onChange={handleInputChange}
                    className="mb-4 bg-customWhite resize-none w-full focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm"
                    ref={titleInputRef}  
                />
                <Textarea
                    className="resize-none w-full focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm"
                    placeholder="Get creative, sip a tea, and ink that thought..."
                    type="text"
                    name="textarea"
                    value={newText}
                    onChange={handleTextareaChange}
                    ref={textInputRef}  
                />
                <Button type="submit" className="fixed bottom-4 mt-2">
                    Create New Post
                </Button>
            </form>
        </div>
    );
};
