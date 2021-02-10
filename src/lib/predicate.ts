/* eslint-disable @typescript-eslint/no-explicit-any */
import { OengusAnswer, OengusSubmission } from '..';
import { OengusMarathon, OengusQuestion, OengusUser, OengusRole, OengusFieldType, OengusRunType, OengusRunLine, OengusSetupLine, OengusSchedule, OengusSelection, OengusSelectionStatus, OengusOpponent, OengusOpponentDtos, OengusAvailability, OengusGame, OengusCategory } from '../types';

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

export const isRunType = (source: any): source is OengusRunType => {
    if (typeof source !== 'string') {
        console.error(`RunType[${source}] could not be parsed.`);
        return false;
    }
    if (['SINGLE', 'RACE', 'COOP', 'COOP_RACE', 'OTHER'].find((type: string) => {
        return type === source;
    }) === undefined) {
        console.error(`RunType[${source}] could not be parsed.`);
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

export const isRunLine = (source: any): source is OengusRunLine => {
    if (
        source.setupBlock !== false ||
        !source.id || typeof source.id !== 'number' ||
        !source.gameName || typeof source.gameName !== 'string' ||
        !source.console || typeof source.console !== 'string' ||
        source.emulated === undefined || typeof source.emulated !== 'boolean' ||
        !source.ratio || typeof source.ratio !== 'string' ||
        !source.categoryName || typeof source.categoryName !== 'string' ||
        !source.estimate || typeof source.estimate !== 'string' ||
        !source.setupTime || typeof source.setupTime !== 'string' ||
        source.customRun === undefined || typeof source.customRun !== 'boolean' ||
        source.position === undefined || typeof source.position !== 'number' ||
        !source.categoryId || typeof source.categoryId !== 'number' ||
        !source.type || !isRunType(source.type) ||
        !source.date || typeof source.date !== 'string'
    ) {
        return false;
    }
    if (!source.runners || typeof source.runners !== 'object'
        || source.runners.find((ele: any) => {
            return !isUser(ele);
        }) !== undefined) {
        return false;
    }
    return true;
}

export const isSetupLine = (source: any): source is OengusSetupLine => {
    if (
        source.setupBlock !== true ||
        !source.id || typeof source.id !== 'number' ||
        source.gameName !== null ||
        source.console !== null ||
        source.emulated === undefined || typeof source.emulated !== 'boolean' ||
        source.ratio !== null ||
        source.categoryName !== null ||
        !source.estimate || typeof source.estimate !== 'string' ||
        !source.setupTime || typeof source.setupTime !== 'string' ||
        source.customRun === undefined || typeof source.customRun !== 'boolean' ||
        source.position === undefined || typeof source.position !== 'number' ||
        source.categoryId !== null ||
        !source.type || !isRunType(source.type) ||
        !source.date || typeof source.date !== 'string'
    ) {
        return false;
    }
    return true;
}

export const isSchedule = (source: any): source is OengusSchedule => {
    if (!source.id || typeof source.id !== 'number') {
        console.error(`Schedule[${source.id}] could not be parsed.`);
        return false;
    }
    if (!source.lines || typeof source.lines !== 'object'
        || source.lines.find((ele: any) => {
            if (!(isRunLine(ele) || isSetupLine(ele))) {
                console.error(`Line[${ele.id}] could not be parsed.`);
                return true;
            }
        }) !== undefined) {
        console.error(`Schedule[${source.id}] could not be parsed.`);
        return false;
    }
    return true;
}

export const isFieldType = (source: any): source is OengusFieldType => {
    if (typeof source !== 'string') {
        console.error(`FieldType[${source}] could not be parsed.`);
        return false;
    }
    if (['TEXT', 'SELECT', 'TEXTAREA', 'CHECKBOX', 'FREETEXT'].find((type: string) => {
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
        source.position === undefined || typeof source.position !== 'number'
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

export const isSelectionStatus = (source: any): source is OengusSelectionStatus => {
    if (typeof source !== 'string') {
        console.error(`Selection[${source}] could not be parsed.`);
        return false;
    }
    if (['VALIDATED', 'TODO', 'BONUS', 'REJECTED'].find((type: string) => {
        return type === source;
    }) === undefined) {
        console.error(`Selection[${source}] could not be parsed.`);
        return false;
    }
    return true;
}

export const isSelectionLine = (source: any): source is OengusSelection => {
    if (
        !source.id === undefined || typeof source.id !== 'number' ||
        !source.categoryId === undefined || typeof source.categoryId !== 'number' ||
        !source.status || !isSelectionStatus(source.status)
    ) {
        console.error(`SelectionLine[${source.id}] could not be parsed.`);
        return false;
    }
    return true;
}

export const isSelection = (source: any): source is OengusSelection[] => {
    if (!source || typeof source !== 'object') {
        console.error(`Selection[${source}] could not be parsed.`);
        return false;
    }
    const keys = Object.keys(source);
    if (keys.find((key: string) => {
        !isSelectionLine(source[key])
    })) {
        console.error(`Selection[${source}] could not be parsed.`);
        return false;
    }
    return true;
}

export const isOpponent = (source: any): source is OengusOpponent => {
    if (
        !source.id || typeof source.id !== 'number' ||
        !source.video || typeof source.video !== 'string'
    ) {
        console.error(`Opponent[${source}] could not be parsed.`);
        return false;
    }
    return true;
}

export const isAvailability = (source: any): source is OengusAvailability => {
    if (
        !source.from || typeof source.from !== 'string' ||
        !source.to || typeof source.to !== 'string'
    ) {
        console.error(`OpponentAvailability[${source}] could not be parsed.`);
        return false;
    }
    return true;
}

export const isOpponentDtos = (source: any): source is OengusOpponentDtos => {
    if (
        !source.id || typeof source.id !== 'number' ||
        !source.user || !isUser(source.user) ||
        !source.video || typeof source.video !== 'string'
    ) {
        console.error(`OpponentDtos[${source}] could not be parsed.`);
        return false;
    }
    if (!source.availabilities || typeof source.availabilities !== 'object'
        || source.availabilities.find((ele: any) => {
            return !isAvailability(ele);
        }) !== undefined) {
        console.error(`OpponentDtos[${source.id}] could not be parsed.`);
        return false;
    }
    return true;
}

export const isCategory = (source: any): source is OengusCategory => {
    if (
        source.id === undefined || typeof source.id !== 'number' ||
        !source.name || typeof source.name !== 'string' ||
        !source.estimate || typeof source.estimate !== 'string' ||
        !source.description || typeof source.description !== 'string' ||
        !source.video || typeof source.video !== 'string' ||
        !source.type || !isRunType(source.type) ||
        (source.code && typeof source.code !== 'string')
    ) {
        console.error(`Category[${source.id}] could not be parsed.`);
        return false;
    }
    if (source.opponents && 
        (typeof source.opponents !== 'object' || source.opponents.find((ele: any) => {
            return !isOpponent(ele);
        }) !== undefined)) {
        console.error(`Category[${source.id}] could not be parsed.`);
        return false;
    }
    if (source.opponentDtos &&
        (typeof source.opponentDtos !== 'object' || source.opponentDtos.find((ele: any) => {
            return !isOpponentDtos(ele);
        }) !== undefined)) {
        console.error(`Category[${source.id}] could not be parsed.`);
        return false;
    }
    return true;
}

export const isGameLine = (source: any): source is OengusGame => {
    if (
        source.id === undefined || typeof source.id !== 'number' ||
        !source.name || typeof source.name !== 'string' ||
        !source.description || typeof source.description !== 'string' ||
        !source.console || typeof source.console !== 'string' ||
        !source.ratio || typeof source.ratio !== 'string' ||
        source.emulated === undefined || typeof source.emulated !== 'boolean'
    ) {
        console.error(`GameLine[${source}] could not be parsed.`);
        return false;
    }
    if (!source.categories || typeof source.categories !== 'object'
        || source.categories.find((ele: any) => {
            return !isCategory(ele);
        }) !== undefined) {
        console.error(`GameLine[${source.id}] could not be parsed.`);
        return false;
    }
    return true;
}

export const isGame = (source: any): source is OengusGame[] => {
    if (!source || typeof source !== 'object') {
        console.error(`Game[${source}] could not be parsed.`);
        return false;
    }
    const keys = Object.keys(source);
    if (keys.find((key: string) => {
        !isGameLine(source[key])
    })) {
        console.error(`Game[${source}] could not be parsed.`);
        return false;
    }
    return true;
}

export const isAnswer = (source: any): source is OengusAnswer => {
    if (!source || typeof source !== 'object') {
        console.error(`Answer[${source}] could not be parsed.`);
        return false;
    }

    if (
        (source.answer && typeof source.answer !== 'string') ||
        source.answerRequired === undefined || typeof source.answerRequired !== 'boolean' ||
        source.id === undefined || typeof source.id !== 'number' ||
        !isQuestion(source.question)
    ) {
        console.error(`Answer[${source}] could not be parsed.`);
        return false;
    }

    return true;
}

export const isSubmission = (source: any): source is OengusSubmission => {
    if (!source || typeof source !== 'object') {
        console.error(`Submission[${source}] could not be parsed.`);
        return false;
    }

    if (
        !Array.isArray(source.answers)
        || !Array.isArray(source.availabilities)
        || !Array.isArray(source.games)
        || source.id === undefined || typeof source.id !== 'number'
        // || !source.marathon || !isMarathon(source.marathon)
        || (source.opponentDtos && Array.isArray(source.opponentDtos))
        || !Array.isArray(source.opponents)
        || !source.user || !isUser(source.user)
    ) {
        console.error(`Submission[${source}] could not be parsed.`);
        return false;
    }

    if (source.answers.map((answer: any) => isAnswer(answer)).includes(false)) {
        return false;
    }
    if (source.games.map((game: any) => isGameLine(game)).includes(false)) {
        return false;
    }
    if (source.opponentDtos && source.opponentDtos.map((opponentDto: any) => isOpponentDtos(opponentDto)).includes(false)) {
        return false;
    }
    if (source.opponents.map((opponent: any) => isOpponent(opponent)).includes(false)) {
        return false;
    }

    return true;
}

export const isSubmissions = (source: any): source is OengusSubmission[] => {
    if (!Array.isArray(source)) {
        console.error(`Submissions[${JSON.stringify(source)}] could not be parsed.`);
        return false;
    }
    const results = source.map((s) => {
        return isSubmission(s);
    });

    return !results.includes(false);
}