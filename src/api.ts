import { get } from './lib/api';
import { OengusMarathon, OengusSchedule, OengusSelectionStatus, OengusSelection, OengusGame } from './types';
import { isMarathon, isSchedule, isSelection, isSelectionStatus, isGame, isSubmissions } from './lib/predicate';
import { OengusSubmission } from '.';

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

export const getSelection = async (id: string, status?: string): Promise<OengusSelection[]> => {
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

export const getSubmissions = async (id: string): Promise<OengusSubmission[]> => {
    const response = await get(`marathon/${id}/submissions`);
    if (isSubmissions(response.data)) {
        return response.data;
    }
    throw new Error('Response could not parse to Submissions.');
}