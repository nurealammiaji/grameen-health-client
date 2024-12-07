import React from 'react'
import HelmetAsync from '../../components/HelmetAsync/HelmetAsync';
import Hero from '../../components/Hero/Hero';
import FlashSale from '../../components/FlashSale/FlashSale';

const Home = () => {
    return (
        <div>
            <HelmetAsync title={"Home"} />
            <Hero />
            <br />
            <FlashSale />
            <br />
        </div>
    )
}

export default Home;