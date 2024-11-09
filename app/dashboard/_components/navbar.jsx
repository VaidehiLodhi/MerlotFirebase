"use client"

import { Button } from "@/components/ui/button";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export const Navbar =()=> {

    const router = useRouter();
    
    const Logout = async()=> {
        try {
            await signOut(auth);
            router.push("/")
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="z-50 fixed top-0 w-full h-20 px-4 shadow-sm shadow-white/20 flex items-center bg-customBlack">
            <div className="md:max-w-screen-2xl mx-auto w-full flex items-center justify-between">
                <p className="text-2xl font-bold text-customViolet px-5">Merlot</p>
                <div className="flex items-center justify-center gap-x-2 bg-white/40 rounded-full px-5 w-[50%] py-2">
                    <Button
                        variant="ghost"
                        className={"rounded-full px-7 hover:bg-white/70 active:bg-white"}
                        onClick={() => router.push(`/dashboard/${auth.currentUser.uid}`)}
                    >
                        Posts
                    </Button>
                    <Button
                    variant="ghost"
                    className="rounded-full px-7 hover:bg-white/70 active:bg-white"
                    onClick={() => router.push("/feed")}
                    >
                        Feed
                    </Button>
                </div>
                <div className=" px-5  md:block md:w-auto">
                    <Button onClick={()=>Logout()} size="sm" variant="" className="border bg-customViolet/30 border-neutral-500 text-neutral-300 font-semibold">
                        Logout
                    </Button>
                    
                </div>
            </div>

        </div>
    )
}