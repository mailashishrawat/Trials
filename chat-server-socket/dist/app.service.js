"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios = require('axios');
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    getSocket() {
        return 'Attempting socket all the best !';
    }
    gettimezone(timezone, offset) {
        console.log(offset);
        const input = "2025-06-13T00:00:00.123Z";
        const parsedDate = new Date(input);
        parsedDate.setMinutes(parsedDate.getMinutes() - offset);
        const strDate = parsedDate.toISOString();
        return strDate;
    }
    async getAppointment() {
        try {
            const username = 'Administration01';
            const password = 'Welcome1';
            const data = await fetchAppointments(username, password);
            const result = JSON.stringify(data, null, 2);
            console.log('Fetched Appointments:', result);
            return result;
        }
        catch (err) {
            console.error('Request failed:', err.message);
            return err.message;
        }
    }
    async createAppointment() {
        try {
            const username = 'Administration01';
            const password = 'Welcome1';
            const payload = `{
    "DocumentType": "0001",
    "Subject": "Ashish test for india timezone"
  }`;
            const data = await createAppointments(username, password, payload);
            const result = JSON.stringify(data, null, 2);
            console.log('Fetched Appointments:', result);
            return result;
        }
        catch (err) {
            console.error('Request failed:', err.message);
            return err.message;
        }
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
async function createAppointments(username, password, payload) {
    const url = 'https://my310976.vlab.sapbydesign.com/sap/c4c/odata/v1/c4codataapi/AppointmentCollection';
    try {
        const response = await axios.post(url, payload, {
            auth: {
                username: username,
                password: password
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error creating appointment:', error.message);
        throw error;
    }
}
async function fetchAppointments(username, password) {
    const url = 'https://my310976.vlab.sapbydesign.com/sap/c4c/odata/v1/c4codataapi/AppointmentCollection?$top=5';
    try {
        const response = await axios.get(url, {
            auth: {
                username: username,
                password: password
            },
            headers: {
                'Accept': 'application/json'
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching appointments:', error.message);
        throw error;
    }
}
//# sourceMappingURL=app.service.js.map