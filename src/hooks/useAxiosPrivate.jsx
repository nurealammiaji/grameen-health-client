import axios from "axios";

const axiosPrivate = axios.create({
    // baseURL: 'http://localhost:5000/api/v1'
    // baseURL: 'https://server.grameen.com.bd/api/v1'
    baseURL: 'https://grameenhealth.vercel.app/api/v1'
})

const useAxiosPrivate = () => {

    // request interceptor to add authorization header for every secure call to teh api
    axiosPrivate.interceptors.request.use(function (config) {
        const accessToken = localStorage.getItem('accessToken');
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${accessToken}`;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // intercepts 401 and 403 status
    axiosPrivate.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptor', status);
        // for 401 or 403 logout the user and move the user to the login
        if (status === 401 || status === 403) {
            console.log("Axios Private Error");
        }
        return Promise.reject(error);
    })

    return axiosPrivate;
};

export default useAxiosPrivate;