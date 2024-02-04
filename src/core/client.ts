import axios, { AxiosInstance } from "axios";

import { ClientOptions, Tokens } from "../types/client";
import TimetableEntry from "../models/timetable_entry";

export default class AurionClient {

    private config: ClientOptions;
    private tokens?: Tokens;
    private client: AxiosInstance;

    constructor(config: ClientOptions) {
        this.config = config;
        this.tokens = config.tokens;
        this.client = this.getClient();
    }

    get loggedIn(): boolean {
        return !!this.tokens?.normal;
    }

    getClient() {
        return axios.create({
            baseURL: this.config.baseUrl,
            headers: { 'Authorization': this.loggedIn ? `Bearer ${this.tokens?.normal}` : '' }
        });
    }

    async login(login: string, password: string): Promise<void> {
        const response = await this.client.post('/login', { login, password });

        this.tokens = response.data;
        this.client = this.getClient();

        console.log(this.tokens);
    }

    async getTimetable(startDate: Date, endDate: Date): Promise<TimetableEntry[]> {
        const date_debut = startDate.toISOString().split('T')[0];
        const date_fin = endDate.toISOString().split('T')[0];

        const response = await this.client.get('/mon_planning', { params: { date_debut, date_fin } });
        const entries = response.data.filter((entry: any) => entry.id).map((entry: any) => new TimetableEntry(entry));

        return entries;
    }

    async getMarks(): Promise<any> {
        const response = await this.client.get('/mes_notes');

        return response.data;
    }

    async getAbsences(): Promise<any> {
        const response = await this.client.get('/mes_absences');

        return response.data;
    }

}