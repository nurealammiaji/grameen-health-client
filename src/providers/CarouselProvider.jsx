import React from 'react';
import { createContext } from 'react';

export const CarouselContext = createContext();

const CarouselProvider = ({ children }) => {

    const carouselInfo = {};

    return (
        <CarouselContext.Provider value={carouselInfo}>
            {children}
        </CarouselContext.Provider>
    );
};

export default CarouselProvider;