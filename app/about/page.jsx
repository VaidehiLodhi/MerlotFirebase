"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";

const AboutPage =()=> {

  const [isLogo, setIsLogo] = useState(true);
  const [isBg, setIsBg] = useState("bg-customBlack");
  const [isBgText, setIsBgText] = useState("text-customWhite");

  const onClick =()=> {
    if(isLogo) {
      setIsLogo(false);
      setIsBg("bg-customWhite")
      setIsBgText("text-customBlack")
    }
    else {
      setIsLogo(true);
      setIsBg("bg-customBlack")
      setIsBgText("text-customWhite")
    }
  }

    return (
      <>
        <div
          className={`fixed ${isBg} top-0 w-full h-20 px-4 border-b border-neutral-300 shadow-sm flex items-center`}
        >
          <div className="md:max-w-screen-2xl mx-auto w-full flex items-center justify-between">
            <div className="group relative">
              {isLogo ? 
              <p className={`font-bold ${isBgText}`}>MERLOT</p> : 
              <p>MERLOT</p>}
            </div>
            <Button onClick={onClick} size="sm" variant="default">
              {isLogo ? <p>Need sum light :3?</p> : <p>Darkness is fren?</p>}
            </Button>
          </div>
        </div>
        <div
          className={`${isBg} flex items-center justify-center h-full w-full`}
        >
          <div>
            <p className={`text-center text-base ${isBgText} font-semibold`}>
              Made by, Vaidehi Lodhi, as a practice project ⭐
            </p>
          </div>
        </div>
      </>
    );
}

export default AboutPage;