import Image from "next/image";
import { Auth } from "./dashboard/_components/auth";
import { ShootingStars } from "@/components/ui/shooting-star";
import { StarsBackground } from "@/components/ui/stars-background";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const headingFont = localFont({
  src: "./fonts/Sentient-Regular.woff",
})

const HomePage =()=> {
  return (
    <div>
        
        <div className="h-[40rem] rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">  
          <Image
            src="/merlot.jpg"
            alt="wallpaper"
            className="object-cover w-full h-full"
            fill
        />
            <div className={cn(headingFont.className)}>
              <div className="z-50">
                
              <Auth/>
            </div>
          <ShootingStars className="z-10" />
          <StarsBackground className="z-20"/>
        </div>    
      </div>
      </div>
  )
}

export default HomePage;

