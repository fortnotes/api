import axios from 'axios';

// eslint-disable-next-line import/no-extraneous-dependencies
import cookieParser from 'set-cookie-parser';

import server from '../../src/server.js';


const defaultOptions = {
    baseURL: `http://localhost:${server.config.httpPort}${server.config.graphql.path}`,
    method: 'post',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: 'no-cache'
    },
    //withCredentials: true,
    timeout: 5000
};


export default options => {
    const request = axios.create({
        ...defaultOptions,
        ...options
    });

    const cookies = {};

    /*
        save array of cookie strings from server response
            [
                'accessToken=eyJhbGciOiMSwiaWF0IjoxN...; Max-Age=600; Path=/graphql; HttpOnly; SameSite=Strict',
                'refreshToken=22.8NzQo0LbBG43a1lmIiF...; Max-Age=3600; Path=/graphql; HttpOnly; SameSite=Strict'
            ]
        to `cookies` as hash (https://github.com/nfriedly/set-cookie-parser format)
            {
                accessToken: {name: 'accessToken', value: 'eyJhbGciOiMSwiaWF0IjoxN...', maxAge: 600, ...},
                refreshToken: {name: 'refreshToken', value: '22.8NzQo0LbBG43a1lmIiF...', maxAge: 3600, ...}
            }
        convert it to a single string of cookie values
            'accessToken=eyJhbGciOiMSwiaWF0IjoxN...; refreshToken=22.8NzQo0LbBG43a1lmIiF...'
        and send in each request
    */
    request.interceptors.response.use(response => {
        if ( 'set-cookie' in response.headers ) {
            // update cookies with new data
            cookieParser.parse(response.headers['set-cookie']).forEach(cookie => {
                cookies[cookie.name] = cookie;
            });

            request.defaults.headers.Cookie = Object.values(cookies)
                .map(({name, value}) => `${name}=${value}`)
                .join('; ');
        }

        return response;
    });

    return {
        call: request,
        cookies
    };
};
