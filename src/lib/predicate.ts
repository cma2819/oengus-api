/* eslint-disable @typescript-eslint/no-explicit-any */
import { OengusMarathon, OengusQuestion, OengusUser, OengusRole, OengusFieldType } from '../types';

export const isRole = (source: any): source is OengusRole => {
    if (typeof source !== 'string') {
        console.error(`Role[${source}] could not be parsed.`);
        return false;
    }
    if (['ROLE_USER'].find((type: string) => {
        return type === source;
    }) === undefined) {
        console.error(`Role[${source}] could not be parsed.`);
        return false;
    }
    return true;
}
export const isUser = (source: any): source is OengusUser => {
    if (
        !source.id || typeof source.id !== 'number' ||
        !source.username || typeof source.username !== 'string' ||
        (source.usernameJapanese && typeof source.usernameJapanese !== 'string') ||
        source.enabled === undefined || typeof source.enabled !== 'boolean' ||
        (source.twitterName && typeof source.twitterName !== 'string') ||
        (source.twitchName && typeof source.twitchName !== 'string') ||
        (source.speedruncomName && typeof source.speedruncomName !== 'string') ||
        source.atLeastOneAccountSynchronized === undefined || typeof source.atLeastOneAccountSynchronized !== 'boolean' ||
        source.emailPresentForExistingUser === undefined || typeof source.emailPresentForExistingUser !== 'boolean'
    ) {
        console.error(`User[${source.id}] could not be parsed.`);
        return false;
    }
    if (!source.roles || typeof source.roles !== 'object'
        || source.roles.find((ele: any) => {
            return !isRole(ele);
        }) !== undefined) {
        console.error(`User[${source.id}] could not be parsed.`);
        return false;
    }
    return true;
}

export const isFieldType = (source: any): source is OengusFieldType => {
    if (typeof source !== 'string') {
        console.error(`FieldType[${source}] could not be parsed.`);
        return false;
    }
    if (['TEXT', 'SELECT', 'TEXTATRA', 'CHECKBOX', 'FREETEXT'].find((type: string) => {
        return type === source;
    }) === undefined) {
        console.error(`FieldType[${source}] could not be parsed.`);
        return false;
    }
    return true;
}

export const isQuestion = (source: any): source is OengusQuestion => {
    if (
        !source.id || typeof source.id !== 'number' ||
        !source.label || typeof source.label !== 'string' ||
        !source.fieldType || !isFieldType(source.fieldType) ||
        source.required === undefined || typeof source.required !== 'boolean' ||
        !source.questionType || typeof source.questionType !== 'string' ||
        (source.description && typeof source.description !== 'string') ||
        !source.position || typeof source.position !== 'number'
    ) {
        console.error(`Question[${source.id}] could not be parsed.`);
        return false;
    }
    if (!source.options || typeof source.options !== 'object'
        || source.options.find((ele: any) => {
            return typeof ele !== 'string';
        }) !== undefined) {
            console.log(typeof source.options);
        console.error(`Question[${source.id}] could not be parsed.`);
        return false;
    }
    return true;
}

export const isMarathon = (source: any): source is OengusMarathon => {
    if (
        !source.id || typeof source.id !== 'string' ||
        !source.name || typeof source.name !== 'string' ||
        !source.creator || !isUser(source.creator) ||
        !source.startDate || typeof source.startDate !== 'string' ||
        !source.endDate || typeof source.endDate !== 'string' ||
        !source.description || typeof source.description !== 'string' ||
        source.onsite === undefined || typeof source.onsite !== 'boolean' ||
        (source.location && typeof source.location !== 'string') ||
        !source.language || typeof source.language !== 'string' ||
        !source.maxGamesPerRunner || typeof source.maxGamesPerRunner !== 'number' ||
        !source.maxCategoriesPerGame || typeof source.maxCategoriesPerGame !== 'number' ||
        source.hasMultiplayer === undefined || typeof source.hasMultiplayer !== 'boolean' ||
        !source.maxNumberOfScreens || typeof source.maxNumberOfScreens !== 'number' ||
        (source.twitch && typeof source.twitch !== 'string') ||
        (source.twitter && typeof source.twitter !== 'string') ||
        (source.discord && typeof source.discord !== 'string') ||
        (source.country && typeof source.country !== 'string') ||
        source.discordPrivacy === undefined || typeof source.discordPrivacy !== 'boolean' ||
        source.submitsOpen === undefined || typeof source.submitsOpen !== 'boolean' ||
        !source.defaultSetupTime || typeof source.defaultSetupTime !== 'string' ||
        source.selectionDone === undefined || typeof source.selectionDone !== 'boolean' ||
        source.scheduleDone === undefined || typeof source.scheduleDone !== 'boolean' ||
        source.isPrivate === undefined || typeof source.isPrivate !== 'boolean' ||
        source.hasIncentives === undefined || typeof source.hasIncentives !== 'boolean' ||
        source.canEditSubmissions === undefined || typeof source.canEditSubmissions !== 'boolean' ||
        source.hasDonations === undefined || typeof source.hasDonations !== 'boolean' ||
        (source.payee && typeof source.payee !== 'string') ||
        (source.supportedCharity && typeof source.supportedCharity !== 'string') ||
        (source.donationCurrency && typeof source.donationCurrency !== 'string') ||
        (source.donationsTotal && typeof source.donationsTotal !== 'number') ||
        (source.hasSubmitted === undefined && typeof source.hasSubmitted !== 'boolean')
    ) {
        console.error(`Marathon[${source.id}] could not be parsed.`);
        return false;
    }
    if (!source.moderators || typeof source.moderators !== 'object'
        || source.moderators.find((ele: any) => {
            return !isUser(ele);
        }) !== undefined) {
        console.error(`Marathon[${source.id}] could not be parsed.`);
        return false;
    }
    if (!source.questions || typeof source.questions !== 'object'
        || source.questions.find((ele: any) => {
            return !isQuestion(ele);
        }) !== undefined) {
        console.error(`Marathon[${source.id}] could not be parsed.`);
        return false;
    }
    return true
}
