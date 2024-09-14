import React from 'react'
import HelmetAsync from '../../components/HelmetAsync/HelmetAsync';
import Hero from '../../components/Hero/Hero';
import CreateOrUpdateProduct from '../../components/CreateOrUpdateProduct/CreateOrUpdateProduct';

const Home = () => {
    return (
        <div>
            <HelmetAsync title={"Home"} />
            <Hero />
            <CreateOrUpdateProduct />
        </div>
    )
}

export default Home;