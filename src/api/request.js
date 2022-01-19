import { message } from 'antd';
import axios from 'axios';

const httpRequest = axios.create({
    baseURL: "https://api.github.com",
    timeout: 8000,
    headers: { Accept: '*/*' },
});
httpRequest.interceptors.request.use(
    async (config) => {

        // Do something before api is sent
        return config;
    },
    (error) => {
        console.log(
            `%c FAILED ${error.response.method?.toUpperCase()} from ${error.response.config.url}:`,
            'background: red; color: #fff',
            error.response,
        );

    },
);

httpRequest.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        message.error(`${error.response.data.message}`)
        console.log(
            `%c FAILED ${error.config?.method?.toUpperCase()} from ${error?.config?.url}:`,
            'background: red; color: #fff',
            error.response,
        );
        return error.response
    },
);

export default httpRequest;
