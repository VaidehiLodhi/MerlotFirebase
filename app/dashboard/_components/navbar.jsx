"use client"

import { Button } from "@/components/ui/button";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
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
        <div className="z-50 fixed top-0 w-full h-20 px-4 shadow-sm flex items-center bg-customBlack">
            <div className="md:max-w-screen-2xl mx-auto w-full flex items-center justify-between">
                <p className="text-xl text-customViolet px-5">Merlot</p>
                <div className=" px-5 space-x-4 md:block md:w-auto w-full flex items-center justify-between">
                    <Button onClick={()=>Logout()} size="sm" variant="ghost" className="border border-neutral-500 text-black font-semibold">
                        Logout
                    </Button>
                    
                </div>
            </div>

        </div>
    )
}