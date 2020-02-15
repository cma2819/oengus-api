import Axios, { AxiosResponse } from 'axios';

const apiHost = 'https://oengus.io/api';

export const get = async (endpoint: string): Promise<AxiosResponse> => {
    return Axios.get(`${apiHost}/${endpoint}`);
};