"use client";

import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { CreatePost } from "../_components/create-post";
import { DisplayPosts } from "../_components/display-posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const DashboardPage = ({ params }) => {
  const { uid } = React.use(params);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const userCollectionRef = collection(db, "user");

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const userDocRef = doc(userCollectionRef, uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          await setDoc(userDocRef, {
            userId: auth?.currentUser?.uid,
            createdAt: new Date(),
          });
        }

        const userData = userSnap.data();
        setUserData(userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid, userCollectionRef]);

  if (loading) return <p>Loading...</p>;

  const user = auth.currentUser;

  return (
    <div className="flex flex-col">
        <div className="flex items-start w-full z-20 py-5 px-6 shadow-sm bg-customBlack">
            <div className="pt-20">
                {userData ? (
                <div className="p-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar>
                            <AvatarImage
                                alt="Profile"
                                className="w-16 h-16 rounded-full object-cover"
                                src={user?.photoURL}
                                />
                            <AvatarFallback className="bg-customWhite/80">{user?.displayName?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent side="right" sideOffset={5}>
                            <h1 className="text-xl font-bold">{user?.displayName || "User"}</h1>
                            <p>Email: {user?.email}</p>
                            <p>Joined: {new Date(userData.createdAt.seconds * 1000).toLocaleDateString()}</p>
                        </PopoverContent>
                    </Popover>
                </div>
                ) : (
                <p>User not found.</p>
                )}
            </div>
            <CreatePost />
      </div>
      <DisplayPosts />
    </div>
  );
};

export default DashboardPage;
