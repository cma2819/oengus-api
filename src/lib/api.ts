import Axios, { AxiosResponse } from 'axios';

const apiHost = 'https://oengus.io/api';

export const get = async (endpoint: string, queryParameters: object = {}): Promise<AxiosResponse> => {
    return Axios.get(`${apiHost}/${endpoint}`, {
        params: queryParameters,
        headers: {
            'oengus-version': 1,
        }
    });
};