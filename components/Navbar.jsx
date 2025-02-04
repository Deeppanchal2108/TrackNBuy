import React from "react";
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { RainbowButton } from "./ui/rainbow-button";
import Link from "next/link";
function Navbar() {
  return (
    <nav className="bg-[#f4ede4]  px-4 py-2 flex justify-between items-center ">
      <div className="text-2xl font-bold">TrackNBuy</div>

      {/* Navigation Options */}
      <div className="flex justify-center ">
        <Link href="https://github.com/Deeppanchal2108/TrackNBuy.git" target="_blank">
          <RainbowButton className="text-base font-sans px-2 py-1">⭐ Star this project</RainbowButton>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
