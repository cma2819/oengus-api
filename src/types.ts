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
    lines: OengusLine[];
}

export interface OengusLine {
    id: number;
    gameName: string;
    console: string;
    emulated: boolean;
    ratio: string;
    categoryName: string;
    estimate: string;
    setupTime: string;
    setupBlock: boolean;
    customRun: boolean;
    position: number;
    categoryId: number;
    type: OengusRunType;
    runners: OengusUser[];
}

export enum OengusRunType {
    single = 'SINGLE',
    race = 'RACE',
    coop = 'COOP',
    coopRace = 'COOP_RACE',
    other = 'OTHER'
}

export interface OengusUser {
    id: number;
    username: string;
    usernameJapanese?: string;
    enabled: boolean;
    roles: OengusRole[];
    twitterName?: string;
    twitchName?: string;
    speedruncomName?: string;
    atLeastOneAccountSynchronized: boolean;
    emailPresentForExistingUser: boolean;
}

export enum OengusRole {
    user = 'ROLE_USER'
}

export enum OengusSelectionStatus {
    validated = 'VALIDATED',
    todo = 'TODO',
    bonus = 'BONUS',
    rejected = 'REJECTED'
}

export interface OengusSelectionLine {
    id: number;
    categoryId: number;
    status: OengusSelectionStatus;
}

export interface OengusSelection {
    [index: string]: OengusSelectionLine;
}
