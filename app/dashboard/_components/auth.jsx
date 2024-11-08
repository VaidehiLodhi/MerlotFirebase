"use client"

import { Button } from "@/components/ui/button"
import { auth, googleProvider } from "@/config/firebase"
import { useAuth } from "@/hooks/useAuth"
import { signInWithPopup} from "firebase/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const Auth =()=> {

    const router = useRouter();
    const {currentUser} = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(currentUser) {
            router.push(`dashboard/${currentUser?.uid}`)
        }
    },[currentUser, router])

    const SignIn = async()=> {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            router.push(`dashboard/${auth.currentUser?.uid}`)
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }

    return (
        <div className="h-full w-full flex items-center justify-center flex-col">
            <div className="h-[300px] w-[350px] bg-gradient-to-b from-purple-400 to-purple-900 p-3 shadow-sm rounded-md border flex flex-col justify-around space-y-3">
                <div className="space-y-5">
                    <p className="pt-4 text-base font-medium text-white text-center">
                        Merlot, allows you to connect with writers,
                        and enjoy the love for reading, together.
                    </p>
                    <p className="text-lg uppercase font-semibold text-white text-center ">
                        Redefining, Social Media
                    </p>
                </div>
                <Button size="lg" className="uppercase relative bottom-0 font-medium" onClick={()=>SignIn()}>
                    Sign-In with Google
                </Button>
            </div>
        </div>
    )
}

