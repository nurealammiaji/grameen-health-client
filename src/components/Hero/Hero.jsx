import React from 'react'

const Hero = () => {
    return (
        <div className="lg:flex">
            <div className="w-[100%] hidden lg:block lg:w-[20%] bg-red-500 h-[500px]">Category</div>
            <div className="w-[100%] lg:w-[60%] bg-green-500 h-[500px]">Slider</div>
            <div className="w-[100%] lg:w-[20%] bg-blue-500 h-[500px]">Adds</div>
        </div>
    )
}

export default Hero