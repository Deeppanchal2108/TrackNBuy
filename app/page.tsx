"use client"
import HeroSection from '@/components/HeroSection'
import DemoSection from '@/components/DemoSection'
import ProblemSection from '@/components/ProblemSection'
import WhatExpect from '@/components/WhatExpect'
import Footer from '@/components/Footer'
import { scrapping } from '@/actions/scrappingUrl'
import { useState } from 'react'

import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { useUser } from '@clerk/nextjs'
import ProductContainer from '@/components/ProductContainer'
export default function Home() {

  const { user } = useUser();

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

  // console.log("User : ", user)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url.includes("amazon") || url.includes("amzn")) {
      const message = await scrapping(user.id, url);
      if (message?.success) {
        toast.success(message.message)
      } else {
        toast.error(message?.message)

      }
    } else {
      toast.warning("Link is not from Amazon, hence can't track this one");
    }

    setUrl("")
  };


  return (
    <div className="min-h-screen w-full bg-[#13111C]">
      {/* Search Bar Section */}
      <div className="relative z-20 p-6">
        <div className="flex gap-3 max-w-xl p-4">
          <Input
            type="url"
            placeholder="Enter Amazon URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-purple-400/50 text-white placeholder:text-gray-400 text-sm"
          />
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 px-8 transition-all duration-300"
          >
            Track
          </Button>
        </div>
      </div>

      {/* Separator Line */}
      <div className="w-full px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      </div>

      {/* Products Display Section */}
    
          <ProductContainer clerkId={user.id} />
        
    </div>
  );
}
