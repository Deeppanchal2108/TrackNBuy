import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { CircleCheckBig } from 'lucide-react';

function HeroSection() {
    return (
        <div className='bg-[#f4ede4] w-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 py-4 lg:py-6'>
            {/* Text Content */}
            <div className='flex flex-col space-y-6 lg:space-y-8 max-w-2xl text-center lg:text-left'>
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-black leading-tight'>
                    One platform to track and buy smarter
                </h1>

                <div className='flex flex-col space-y-1'>
                    <div className='flex items-center space-x-3'>
                        <CircleCheckBig className='text-green-600 w-5 h-5 flex-shrink-0' />
                        <h3 className='text-lg text-gray-700'>
                            Stay ahead with real-time price tracking, instant alerts, and seamless purchase automation.
                        </h3>
                    </div>
                    <div className='flex items-center space-x-3'>
                        <CircleCheckBig className='text-green-600 w-5 h-5 flex-shrink-0' />
                        <h3 className='text-lg text-gray-700'>
                            Save big with exclusive early-bird deals and price drop notifications!
                        </h3>
                    </div>
                </div>

                <Button className="bg-[#4a154b] text-white px-8 py-3 text-lg rounded-md hover:bg-[#3a0e3a] self-start font-sans font-semibold">
                    Get Started
                </Button>
            </div>

            {/* Image */}
            <div className='mt-10 lg:mt-0 lg:ml-12 flex justify-center'>
                <Image
                    src="/dummy.webp" // Replace with actual image path
                    alt="Track and Buy"
                    width={500}
                    height={350}
                    className='rounded-xl shadow-md'
                />
            </div>
        </div>
    );
}

export default HeroSection;
