import { Response } from 'express';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getSocket(): string;
    getReadiness(): Boolean;
    getliveness(): Boolean;
    getAppointment(): Promise<string>;
    getUTC(timezone: string, offset: number): string;
    getAppointment2(): Promise<string>;
    getChat(res: Response): void;
    getTest(res: Response): void;
}
