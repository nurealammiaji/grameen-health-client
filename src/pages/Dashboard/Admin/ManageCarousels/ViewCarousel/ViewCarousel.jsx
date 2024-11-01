import React, { useEffect, useState } from 'react';
import HelmetAsync from '../../../../../components/HelmetAsync/HelmetAsync';
import { useLoaderData } from 'react-router-dom';
import CarouselDetails from '../../../../../components/CarouselDetails/CarouselDetails';

const ViewCarousel = () => {

    const carousel = useLoaderData();
    const [carouselData, setCarouselData] = useState();

    useEffect(() => {
        if (carousel) {
            console.log(carousel, carousel.data);
            setCarouselData(carousel.data);
        }
    }, [carousel])

    return (
        <div>
            <HelmetAsync title={"Details"} />
            <div>
                <div className="w-6/12 mx-auto divider divider-success"><h3 className="text-2xl font-bold text-success">Carousel Details</h3></div>
            </div>
            <br />
            {
                (carouselData) &&
                <CarouselDetails carouselData={carouselData} />
            }
        </div>
    );
};

export default ViewCarousel;