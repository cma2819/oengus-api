export interface OengusMarathon {
    id: string;
    name: string;
    creator: OengusUser;
    startDate: string;
    endDate: string;
    description: string;
    onsite: boolean;
    location?: string;
    language: string;
    maxGamesPerRunner: number;
    maxCategoriesPerGame: number;
    hasMultiplayer: boolean;
    maxNumberOfScreens: number;
    twitch?: string;
    twitter?: string;
    discord?: string;
    country?: string;
    discordPrivacy: boolean;
    submitsOpen: boolean;
    defaultSetupTime: string;
    selectionDone: boolean;
    scheduleDone: boolean;
    isPrivate: boolean;
    moderators: OengusUser[];
    hasIncentives: boolean;
    canEditSubmissions: boolean;
    questions: OengusQuestion[];
    hasDonations: boolean;
    payee?: string;
    supportedCharity?: string;
    donationCurrency?: string;
    donationsTotal?: number;
    hasSubmitted?: boolean;
}

export interface OengusQuestion {
    id: number;
    label: string;
    fieldType: OengusFieldType;
    required: boolean;
    options: string[];
    questionType: string;
    description?: string;
    position: number;
}

export enum OengusFieldType {
    text = 'TEXT',
    select = 'SELECT',
    textArea = 'TEXTAREA',
    checkbox = 'CHECKBOX',
    freeText = 'FREETEXT'
}

export interface OengusSchedule {
    id: number;
    lines: Array<OengusRunLine|OengusSetupLine>;
}

export interface OengusRunLine {
    id: number;
    gameName: string;
    console: string;
    emulated: boolean;
    ratio: string;
    categoryName: string;
    estimate: string;
    setupTime: string;
    setupBlock: false;
    customRun: boolean;
    position: number;
    categoryId: number;
    type: OengusRunType;
    runners: OengusUser[];
    date: string;
}

export interface OengusSetupLine {
    id: number;
    gameName: null;
    console: null;
    emulated: null;
    ratio: null;
    categoryName: null;
    estimate: string;
    setupTime: string;
    setupBlock: true;
    customRun: boolean;
    position: number;
    categoryId: null;
    type: OengusRunType;
    runners: OengusUser[];
    date: string;
}

export interface OengusOtherLine {
    id: number;
    gameName?: string;
    console?: string;
    emulated: boolean;
    ratio?: string;
    categoryName?: string;
    estimate: string;
    setupTime: string;
    setupBlock: false;
    customRun: boolean;
    position: number;
    categoryId?: number;
    type: 'OTHER';
    runners: OengusUser[];
    date: string;
}

export enum OengusRunType {
    single = 'SINGLE',
    race = 'RACE',
    coop = 'COOP',
    coopRace = 'COOP_RACE',
    relayRace = 'RELAY_RACE',
    other = 'OTHER',
}

export type ConnectionPlatform = 'DISCORD'|'EMAIL'|'FACEBOOK'|'INSTAGRAM'|'NICO'|'SNAPCHAT'|'SPEEDRUNCOM'|'TWITCH'|'TWITTER';

export interface OengusConnection {
    id: number;
    platform: ConnectionPlatform;
    username: string;
}
export interface OengusUser {
    id: number;
    username: string;
    usernameJapanese?: string;
    enabled: boolean;
    roles: OengusRole[];
    speedruncomName?: string;
    atLeastOneAccountSynchronized: boolean;
    emailPresentForExistingUser: boolean;
    connections: OengusConnection[];
    pronouns?: string;
}

export enum OengusRole {
    user = 'ROLE_USER'
}

export type OengusSelectionStatus = 'VALIDATED'|'TODO'|'BONUS'|'REJECTED'|'BACKUP';

export interface OengusSelection {
    id: number;
    categoryId: number;
    status: OengusSelectionStatus;
}

export interface OengusOpponent {
    id: number;
    video: string;
}

export interface OengusAvailability {
    from: string;
    to: string;
}

export interface OengusOpponentDtos {
    id: number;
    user: OengusUser;
    video: string;
    availabilities: OengusAvailability[];
}

export interface OengusCategory {
    id: number;
    name: string;
    estimate: string;
    description: string;
    video: string;
    type: OengusRunType;
    code?: string;
    opponents: OengusOpponent[];
    opponentDtos: OengusOpponentDtos[];
}

export interface OengusGame {
    id: number;
    name: string;
    description: string;
    console: string;
    ratio: string;
    emulated: boolean;
    categories: OengusCategory[];
}

export interface OengusAnswer {
    answer: string|null;
    answerRequired: boolean;
    id: number;
    question: OengusQuestion;
}

export interface OengusSubmission {
    answers: OengusAnswer[];
    availabilities: OengusAvailability[];
    games: OengusGame[];
    id: number;
    marathon: OengusMarathon;
    opponentDtos: OengusOpponentDtos[]|null;
    opponents: OengusOpponent[];
    user: OengusUser;
}
