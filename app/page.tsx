"use client"
import HeroSection from '@/components/HeroSection'
import DemoSection from '@/components/DemoSection'
import ProblemSection from '@/components/ProblemSection'
import WhatExpect from '@/components/WhatExpect'
import Footer from '@/components/Footer'
import { scrapping } from '@/actions/scrappingUrl'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useUser } from '@clerk/nextjs'

export default function Home() {
  
  const  {user}  = useUser();

  const [url, setUrl] = useState('');
  if (!user) {
    return (
      <div>
        <HeroSection />
        <DemoSection />
        <ProblemSection />
        <WhatExpect />
        <Footer />
      </div>
    );
  }

  console.log("User : ", user)


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
     console.log("Hello");
    console.log("Here is the user entered URL: ", url);
    if (url.includes("amazon") || url.includes("amzn")) {
      console.log("Here comes Amazon link");
      const message = await scrapping(user.id,url);
      console.log("Here is the message: ", message);
    } else {
      console.log("Link is not from Amazon, hence can't track this one");
    }
  };


  return (
    <div className="h-screen w-full bg-black bg-dot-white/[0.2] flex items-center justify-center relative">
      <div className="absolute inset-0 flex items-center justify-center bg-black pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="text-center relative z-20">
        <h1 className="text-4xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4">
          TrackNBuy
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 max-w-md mx-auto">
          <Input
            type="url"
            placeholder="Enter Amazon URL here"
            value={url} // Controlled input tied to state
            onChange={(e) => setUrl(e.target.value)} // Update state on input change
            className="w-full font-sans px-4 py-2 rounded-md border border-neutral-500 text-black bg-white focus:outline-none focus:ring focus:ring-neutral-300"
          />
          <Button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 rounded-md text-white bg-gradient-to-r from-gray-900 to-gray-500 hover:from-blue-500 hover:to-green-400 transition-all"
          >
            Track
          </Button>
        </div>
      </div>
    </div>
  );
}
