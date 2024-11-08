"use client"

import app from "@/config/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react";

const auth = getAuth(app);

export const useAuth =()=> {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        const UserSetter = onAuthStateChanged(auth, (user)=> {
            setCurrentUser(user);
            setIsLoading(false);
        });

        return()=> UserSetter();
    }, [])

    return{currentUser, isLoading}
}