'use client'
import React from "react"
import { useState } from "react"
import { scrapping } from "./actions/scrappingData"
import WordPullUp from "@/components/magicui/word-pull-up";
export default function Home() {
  const [url, setUrl] = useState("")

  const handleSubmit= async () => {
    console.log("Hello")
    console.log("Here is the user entered url : ", url)
    if (url.includes("amazon") || url.includes("amzn")) {
      console.log("Here comes amazon link ")
      const message = await scrapping({ url })
      console.log("Here is the message : ", message)
    } else {
      console.log("Link is not from amazon hence can't track this one ")
    }
  }
  return (
    <div className="h-[50rem] w-full bg-black   bg-dot-white/[0.2]  relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
         <WordPullUp>Word Pull Up</WordPullUp>;
      </div>
    </div>
  )
}

