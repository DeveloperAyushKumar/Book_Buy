import React from 'react'
import banner from '../../assets/banner.png'

function Banner() {
  return (
    <div className='flex flex-col-reverse md:flex-row py-10 justify-between gap-10 items-center m-4 md:m-6'>
        {/* Left section */}
        <div className='md:w-1/2 w-full  '>
            <h1 className='text-4xl font-bold mb-4'>
                New Releases This Week 
            </h1>
            <p className='mb-4'>
                Discover the latest books that have just hit the shelves.
                From thrilling mysteries to heartwarming romances,
                find your next great read here.
            </p>
            <button className=' w-1/2 bg-primary text-white px-4 py-2 rounded-xl mt-4'>
                Subscribe Now
            </button>

        </div>
        {/* Right section */}
        <div className='md:w-1/2 w-full '>
        <img src={banner} alt="" />
        </div>
    </div>
  )
}

export default Banner