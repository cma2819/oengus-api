import { get } from './lib/api';
import { OengusMarathon, OengusSchedule, OengusSelectionStatus, OengusSelection } from './types';
import { isMarathon, isSchedule, isSelection, isSelectionStatus } from './lib/predicate';

export const getMarathon = async (id: string): Promise<OengusMarathon> => {
    const response = await get(`marathon/${id}`);
    if (isMarathon(response.data)) {
        return response.data;
    }
    throw new Error('Response could not parse to Marathon.');
}

export const getSchedule = async (id: string): Promise<OengusSchedule> => {
    const response = await get(`marathon/${id}/schedule`);
    if (isSchedule(response.data)) {
        return response.data;
    }
    throw new Error('Response could not parse to Schedule.');
}

export const getSelection = async (id: string, status?: string): Promise<OengusSelection> => {
    const params: {
        status?: OengusSelectionStatus;
    } = { status: undefined };
    if (status && isSelectionStatus(status)) {
        params.status = status;
    }
    const response = await get(`marathon/${id}/selection`, params);
    if (isSelection(response.data)) {
        return response.data;
    }
    throw new Error('Response could not parse to Selection.');
}