import React from 'react'
import Carousel from '../Carousel/Carousel'

const Hero = () => {
    return (
        <div className="lg:flex">
            <div className="w-[100%] lg:w-[70%] h-[500px]">
                <Carousel />
            </div>
            <div className="w-[100%] lg:w-[30%] h-[500px]">
                Advertise
            </div>
        </div>
    )
}

export default Hero