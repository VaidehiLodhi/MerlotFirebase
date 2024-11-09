"use client"

import { Button } from "@/components/ui/button"
import { auth, googleProvider } from "@/config/firebase"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { signInWithPopup} from "firebase/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {Inter} from "next/font/google";
import localFont from "next/font/local"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import Link from "next/link"

const headingFont = localFont({
  src: "../../fonts/Sentient-Regular.woff",
})

const inter = Inter({
  subsets: ['latin'], 
  weight: ['400', '700'],
});

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
        <div className="max-w-[988px] mx-auto flex-1 w-full h-full flex flex-col lg:flex-row justify-center items-center gap-3">
                <Button
                variant="ghost"
                size="sm"
                className="z-50 hover:bg-customWhite fixed left-2 text-customWhite top-0 "> 
                <Link href="/about" >
                    About
                </Link>
                </Button>
                <h1 className="font-bold text-6xl z-50">
                    MERLOT
                </h1>
                <div className={cn("z-50 px-4 py-3 w-auto flex flex-col gap-y-4 text-lg text-customWhite", inter.className )}>
                    <div>
                        <p>Focused on simplicity, authenticity, and mindfulness,</p>
                        <div className="flex space-x-2">
                            <p className="font-extrabold">Merlot.</p>
                            <p>Offering a serene environment where users can connect, and unwind.</p>
                        </div> 
                    </div>
                    <HoverBorderGradient>
                        <Button 
                        size="lg" 
                        disabled={loading}
                        className={cn("w-[50%] bg-customBlack uppercase relative bottom-0 font-medium", headingFont.className)} 
                        onClick={()=>SignIn()}>
                            Sign-In with Google
                        </Button>
                    </HoverBorderGradient>
                </div>
        </div>
    )
}

