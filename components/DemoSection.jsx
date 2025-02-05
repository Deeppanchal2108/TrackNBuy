import React from 'react'
import HeroVideoDialog from './ui/hero-video-dialog'

function DemoSection() {
    return (
        <div className="relative px-6 sm:px-12 md:px-24 lg:px-36 xl:px-48 pb-8 md:pb-12 -mt-4 md:-mt-6 flex justify-center   ">
            <div className="w-full max-w-5xl border-t-4 border-[#4a154b]">
                <HeroVideoDialog
                    className="dark:hidden block"
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                    thumbnailAlt="Hero Video"
                />
                <HeroVideoDialog
                    className="hidden dark:block"
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                    thumbnailAlt="Hero Video"
                />
            </div>
        </div>
    )
}

export default DemoSection
