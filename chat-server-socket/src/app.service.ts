import { Injectable } from '@nestjs/common';
import {DateTime} from 'luxon';
const axios = require('axios');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getSocket(): string {
    return 'Attempting socket all the best !';
  }
  
   gettimezone(timezone:string, offset: number ): string
  {
    console.log(offset)
      const input = "2025-06-13T00:00:00.123Z";
      const parsedDate = new Date(input);
      parsedDate.setMinutes(parsedDate.getMinutes() - offset);
      const strDate=parsedDate.toISOString();

      return strDate
  
  }
  
   async getAppointment(): Promise<string> {
    try {
      const username = 'Administration01';
      const password = 'Welcome1';

      const data = await fetchAppointments(username, password);
      const result=JSON.stringify(data, null, 2)
      console.log('Fetched Appointments:', result);
      return result;  // Return the fetched appointments as a string
  } catch (err) {
      console.error('Request failed:', err.message);
      return err.message;  // Return the error message
  }
  }
  async createAppointment(): Promise<string> {
    try {
      const username = 'Administration01';
      const password = 'Welcome1';
      const payload=`{
    "DocumentType": "0001",
    "Subject": "Ashish test for india timezone"
  }`

      const data = await createAppointments(username, password,payload);
      const result=JSON.stringify(data, null, 2)
      console.log('Fetched Appointments:', result);
      return result;  // Return the fetched appointments as a string
  } catch (err) {
      console.error('Request failed:', err.message);
      return err.message;  // Return the error message
  }
  }
  
}



async function createAppointments(username: string, password: string, payload: any) {
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

        return response.data; // Return the API response data

    } catch (error: any) {
        console.error('Error creating appointment:', error.message);
        throw error; // Propagate the error to the caller
    }
}
/**
 * Fetch appointments from SAP OData API.
 * @param {string} username - SAP username
 * @param {string} password - SAP password
 * @returns {Promise<Object>} - Promise resolving to the response data
 */
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

        return response.data;  // Return the API response data

    } catch (error) {
        console.error('Error fetching appointments:', error.message);
        throw error;  // Propagate the error to the caller
    }

  }







