

import React from 'react';

import { Button } from '@/components/ui/button';
import { CircleCheckBig, ArrowRight } from 'lucide-react';

function HeroSection() {
    return (
        <div className='relative bg-[#f4ede4] w-full min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-10 md:px-10  pb-16  lg:pb-8 overflow-hidden'>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(#4a154b 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}></div>
            </div>

            {/* Text Content */}
            <div className='relative flex flex-col space-y-4 lg:space-y-6 max-w-2xl lg:text-left z-10 '>
               

                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-black leading-[1.1] lg:leading-[1.1]'>
                    One platform to
                    <span className=" text-[#4a154b]"> track </span>
                    and
                    <span className="text-[#4a154b]"> buy </span>
                    smarter
                </h1>

                <p className="lg:text-lg text-base text-gray-600 max-w-xl">
                    Experience the future of smart shopping with real-time tracking, instant alerts, and automated purchases at the best prices.
                </p>

                <div className='flex flex-col space-y-4'>
                    <div className='flex items-center space-x-3 group'>
                        <CircleCheckBig className='text-green-600 w-6 h-6 flex-shrink-0 transition-transform group-hover:scale-110' />
                        <h3 className='lg:text-lg text-sm text-gray-700'>
                            Stay ahead with real-time price tracking and instant alerts
                        </h3>
                    </div>
                    <div className='flex items-center space-x-3 group'>
                        <CircleCheckBig className='text-green-600 w-6 h-6 flex-shrink-0 transition-transform group-hover:scale-110' />
                        <h3 className='lg:text-lg text-sm text-gray-700'>
                            Save big with exclusive early-bird deals and notifications
                        </h3>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 ">
                    <Button
                        className="bg-[#4a154b] text-white px-8 py-6 text-lg rounded-xl hover:bg-[#3a0e3a] font-sans font-semibold transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg group"
                    >
                        Get Started Free
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                 
                </div>

               
            </div>

            {/* Image */}
            <div className='mt-16 lg:mt-0 lg:ml-12 flex justify-center relative z-10'>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-transparent rounded-2xl blur-3xl"></div>
                    <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                        alt="Track and Buy Dashboard"
                        width={600}
                        height={400}
                        className='rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm'
                  
                    />

                    {/* Price Alert Card */}
                    <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <CircleCheckBig className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Price Drop Alert!</p>
                            <p className="text-xs text-gray-500">20% off on your watchlist</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;