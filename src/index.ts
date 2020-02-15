import { get } from './lib/api';
import { OengusMarathon } from './types';
import { isMarathon } from './lib/predicate';

export const getMarathon = async (id: string): Promise<OengusMarathon> => {
    const response = await get(`marathon/${id}`);
    if (isMarathon(response.data)) {
        return response.data;
    }
    throw new Error('Response could not parse to Marathon.');
}
