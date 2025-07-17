export declare class AppService {
    getHello(): string;
    getSocket(): string;
    gettimezone(timezone: string, offset: number): string;
    getAppointment(): Promise<string>;
    createAppointment(): Promise<string>;
}
