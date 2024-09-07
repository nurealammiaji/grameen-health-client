import React from 'react'
import Carousel from '../Carousel/Carousel'

const Hero = () => {
    return (
        <div className="flex-row-reverse lg:flex">
            <div className="w-[100%] lg:w-[70%] h-[500px] p-5 border">
                <Carousel />
            </div>
            <div className="w-[100%] lg:w-[30%] h-[500px] p-5 border">
                Advertise
            </div>
        </div>
    )
}

export default Hero