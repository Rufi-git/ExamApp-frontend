import React from 'react'
import video from "../assets/video.png"
const HeroVideo = () => {
    return (
        <div className='w-full flex mt-[-120px] sm:mt-[-170px] justify-center'>
            <div className='pl-[20px] z-40 '>
                <div className='hidden sm:block bg-gradient-to-tr from-[#2084da] to-[#44d8b1] w-[70px] rounded-full mr-[-60px] mt-[220px] md:mt-[300px] h-[70px]'></div>
            </div>
            <div className='cursor-pointer max-w-[760px] max-h-[400px] px-[20px]'>
                <img src={video} className='h-full w-full rounded-lg' alt="" />
            </div>
            <div className='pr-[20px] z-40'>
                <div className='hidden sm:block bg-gradient-to-t from-[#f19a1a] to-[#ffc73c] w-[90px] rounded-full z-40 ml-[-60px] mt-[20px] h-[90px]'></div>
            </div>
        </div>
    )
}

export default HeroVideo