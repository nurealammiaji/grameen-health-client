import React from 'react';
import { createContext } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const ReviewContext = createContext();

const ReviewProvider = ({ children }) => {

    const axiosPrivate = useAxiosPrivate();
    const axiosPublic = useAxiosPublic();

    const addReview = async (formData) => {
        return await axiosPrivate.post('/reviews/create', formData)
    }

    const reviewInfo = {
        addReview
    };

    return (
        <ReviewContext.Provider value={reviewInfo}>
            {children}
        </ReviewContext.Provider>
    );
};

export default ReviewProvider;