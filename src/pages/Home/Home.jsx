import React from 'react'
import HelmetAsync from '../../components/HelmetAsync/HelmetAsync';
import Hero from '../../components/Hero/Hero';

const Home = () => {
    return (
        <div>
            <HelmetAsync title={"Home"} />
            <Hero />
        </div>
    )
}

export default Home;