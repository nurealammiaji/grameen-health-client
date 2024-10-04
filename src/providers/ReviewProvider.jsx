import React from 'react';
import { createContext } from 'react';

export const ReviewContext = createContext();

const ReviewProvider = ({ children }) => {

    const reviewInfo = {};

    return (
        <ReviewContext.Provider value={reviewInfo}>
            {children}
        </ReviewContext.Provider>
    );
};

export default ReviewProvider;