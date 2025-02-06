import HeroSection from '@/components/HeroSection'
import DemoSection from '@/components/DemoSection'
import ProblemSection from '@/components/ProblemSection'
import WhatExpect from '@/components/WhatExpect'
import Footer from '@/components/Footer'
import { currentUser } from '@clerk/nextjs/server'

export default async function Home() {
  const user = await currentUser();
  console.log("User : ", user); // Logs user data if authenticated, or null if not.

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

  return (
    <div>
      Welcome {user.firstName} {/* Display user's name if authenticated */}
    </div>
  );
}
