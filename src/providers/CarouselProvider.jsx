import React, { useState } from 'react';
import { createContext } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const CarouselContext = createContext();

const CarouselProvider = ({ children }) => {

    const axiosPrivate = useAxiosPrivate();
    const axiosPublic = useAxiosPublic();

    const [selectedCarousels, setSelectedCarousels] = useState([]);

    const addCarousel = async (formData) => {
        return await axiosPrivate.post('/carousels/create', formData)
    }

    const deleteCarousels = async () => {
        return await axiosPrivate.delete('/carousels/delete', {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                carouselIds: selectedCarousels,
            },
        })
    }

    const editCarousel = async (_id, formData) => {
        console.log(_id, formData);
        return await axiosPrivate.put(`/carousels/update/${_id}`, formData)
    }

    const carouselInfo = {
        addCarousel,
        editCarousel,
        deleteCarousels,
        selectedCarousels,
        setSelectedCarousels,
    };

    return (
        <CarouselContext.Provider value={carouselInfo}>
            {children}
        </CarouselContext.Provider>
    );
};

export default CarouselProvider;