import React from 'react'
import HelmetAsync from '../../components/HelmetAsync/HelmetAsync';
import Hero from '../../components/Hero/Hero';
import Campaigns from '../../components/Campaigns/Campaigns';

const Home = () => {
    return (
        <div>
            <HelmetAsync title={"Home"} />
            <Hero />
            <br />
            <Campaigns />
            <br />
        </div>
    )
}

export default Home;