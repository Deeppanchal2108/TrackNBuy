import React from "react";
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { RainbowButton } from "./ui/rainbow-button";
import Link from "next/link";
import { syncUser } from "@/actions/userAction";
import { currentUser } from "@clerk/nextjs/server";


async function Navbar() {
  const user = await currentUser();
  if (user) {
    const result = await syncUser({
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress, // Fetching primary email
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    });

    if (result.success) {
      console.log("success user")
    }
  }
  return (
    <nav className="bg-[#f4ede4] px-4 py-2 flex justify-between items-center">
      <div className="text-2xl font-bold">TrackNBuy</div>

      {/* Navigation Options */}
      <div className="flex justify-center space-x-4">
        <Link href="https://github.com/Deeppanchal2108/TrackNBuy.git" target="_blank">
          <RainbowButton className="text-base font-sans px-2 py-1">
            ⭐ Star this project
          </RainbowButton>
        </Link>

        {/* Show login or signup buttons if user is not signed in */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-[#4a154b] text-white px-6 py-2 rounded-md hover:bg-[#3a0e3a]">
              Login
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-[#4a154b] text-white px-6 py-2 rounded-md hover:bg-[#3a0e3a] ml-2">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        {/* Show user profile button if the user is signed in */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;
