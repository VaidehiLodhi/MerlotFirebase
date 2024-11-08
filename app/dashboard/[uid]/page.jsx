"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/config/firebase";
import { CreatePost } from "../_components/create-post";
import { DisplayPosts } from "../_components/display-posts";

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

  return (
    <div>
      {userData ? (
        <div className="p-4">
          <h1 className="text-xl font-bold">{userData.username || "User"}</h1>
          <p>Email: {userData.email}</p>
          <p>Joined: {new Date(userData.createdAt.seconds * 1000).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>User not found.</p>
      )}
      <div className="flex flex-col">
        <CreatePost />
        <DisplayPosts />
      </div>
    </div>
  );
};

export default DashboardPage;
