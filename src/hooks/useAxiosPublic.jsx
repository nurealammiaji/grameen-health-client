import React from 'react';
import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'http://localhost:3200/api/v1'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;