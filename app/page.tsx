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

  console.log("User : ", user)


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
            placeholder="Paste Amazon product link to track..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-purple-400/50 text-white/90 placeholder:text-gray-500 focus:border-purple-500 focus:ring-0 text-sm px-4 py-2 rounded-none"
          />
          <Button
            type="button"
            onClick={handleSubmit}
            className="bg-[#2a2438] hover:bg-[#352b47] text-purple-300 px-8 transition-all duration-300 rounded-none"
          >
            Track
          </Button>
        </div>
      </div>

      {/* Separator Line */}
      <div className="w-full px-6">
        <div className="h-[1px] bg-[#2a2438]"></div>
      </div>

      {/* Products Display Section */}
      <div className="relative z-20 px-6 py-8">
        <h2 className="text-xl font-medium text-white/90 mb-6">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Products will be added here later */}
        </div>
      </div>
    </div>
  );
}
