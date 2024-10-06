import React from 'react';
import { createContext } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const CarouselContext = createContext();

const CarouselProvider = ({ children }) => {

    const axiosPrivate = useAxiosPrivate();
    const axiosPublic = useAxiosPublic();

    const addCarousel = async (formData) => {
        return await axiosPrivate.post('/carousels/create', formData)
    }

    const carouselInfo = {
        addCarousel,
    };

    return (
        <CarouselContext.Provider value={carouselInfo}>
            {children}
        </CarouselContext.Provider>
    );
};

export default CarouselProvider;