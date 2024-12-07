'use client'
import { useState } from "react";
import { scrapping } from "./actions/scrappingData";
export default function Home() {
  const [ url, setUrl]= useState("");
  const handleS = async () => {
    console.log("Hellow")
    console.log("Here is the user enterd url : ", url)
    if (url.includes("amazon") || url.includes("amzn")) {
      console.log("Here comes amazon link ")
      const message = await scrapping({ url });
      console.log("Here is the message : ",message)
    } else {
      console.log("Link is not from amazon hence can`t track this one ")
    }
  }
  return (
    <>
      <div className="flex flex-col items-center w-full h-screen">
        <h1 className=" mb-10">TrackNBuy</h1>
        <div>
          <input type="text" autoFocus className="border-2 border-black rounded-md p-1 w-[300px] " value={url} onChange={(e)=>setUrl(e.target.value)} />
          <button className="bg-black text-white rounded-lg px-3 py-1 m-2 p-4" onClick={handleS}>Search</button>
        </div>
      </div>
    </>

  );
}
