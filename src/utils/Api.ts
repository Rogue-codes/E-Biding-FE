/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { getAuthToken } from './auth';
import Nprogress from  "nprogress"
import 'nprogress/nprogress.css';

const ApiFetcher = axios.create({
    baseURL: 'http://localhost:5000/api/v1/e-biding',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*'
    },
})

const onRequest = (request: any) => {
    // const user = localStorage.getItem('token');
    Nprogress.start();
    const token = getAuthToken();
    request.headers.Authorization = token ? `Bearer ${token}` : '';
    return request;
}

const onRequestError = (error: any) => {
    Nprogress.done();
    return Promise.reject(error)
}

const onResponse = (response: any) => {
    Nprogress.done();
    return response;
}

const onResponseError = (error: any) => {
    Nprogress.done();
    // handle when the error does nit have a response
    if (!error.response)
        error.response = {
            status : 400
        }
    return Promise.reject(error)
}

ApiFetcher.interceptors.request.use(onRequest, onRequestError);
ApiFetcher.interceptors.response.use(onResponse, onResponseError);

export default ApiFetcher;
