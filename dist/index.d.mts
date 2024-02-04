import { AxiosInstance } from 'axios';

type ClientOptions = {
    baseUrl: string;
    tokens?: Tokens;
};
type Tokens = {
    normal: string;
    comptage?: string;
};

declare class TimetableEntry {
    id?: number;
    startDate: Date;
    endDate: Date;
    class: string;
    activityType: string;
    teachers?: string;
    room?: string;
    title: string;
    description: string;
    private originalData;
    constructor(data: any);
    toJSON(): {
        id: number | undefined;
        startDate: Date;
        endDate: Date;
        class: string;
        activityType: string;
        teachers: string | undefined;
        room: string | undefined;
        title: string;
        description: string;
    };
}

declare class Mark {
    id: string;
    name: string;
    startDate: Date;
    obtentionDate: Date;
    professors: string[];
    value?: number;
    appreciation?: string;
    absence?: boolean;
    notRated?: boolean;
    constructor(data: any);
    toJSON(): {
        id: string;
        name: string;
        startDate: Date;
        obtentionDate: Date;
        professors: string[];
        value: number | undefined;
        absence: boolean | undefined;
        notRated: boolean | undefined;
    };
}

declare class MarkClass {
    id: number;
    code: string;
    name: string;
    professors: string[];
    average: number;
    credits: {
        obtained: number;
        total: number;
    };
    validated: boolean;
    marks: Mark[];
    constructor(data: any);
    toJSON(): {
        id: number;
        code: string;
        name: string;
        professors: string[];
        average: number;
        credits: {
            obtained: number;
            total: number;
        };
        validated: boolean;
        marks: {
            id: string;
            name: string;
            startDate: Date;
            obtentionDate: Date;
            professors: string[];
            value: number | undefined;
            absence: boolean | undefined;
            notRated: boolean | undefined;
        }[];
    };
}

declare class AurionClient {
    private config;
    private tokens?;
    private client;
    constructor(config: ClientOptions);
    get loggedIn(): boolean;
    getClient(): AxiosInstance;
    login(login: string, password: string): Promise<void>;
    getTimetable(startDate: Date, endDate: Date): Promise<TimetableEntry[]>;
    getMarks(): Promise<MarkClass[]>;
    getAbsences(): Promise<any>;
}

export { AurionClient, type ClientOptions, TimetableEntry, type Tokens };
