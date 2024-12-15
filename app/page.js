'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import { scrapping } from "./actions/scrappingData"

export default function Home() {
  const [url, setUrl] = useState("")

  const handleS = async () => {
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
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 ease-in-out hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 tracking-tight">
          Track<span className="text-blue-600">n</span>Buy
        </h1>
        <p className="text-center text-gray-600">
          Paste an Amazon URL to track prices and availability
        </p>
        <div className="mt-8 space-y-4">
          <Input
            type="url"
            placeholder="https://www.amazon.com/product"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            autoFocus
          />
          <Button
            onClick={handleS}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </main>
  )
}

