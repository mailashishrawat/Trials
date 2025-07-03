import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
 private token ="eyJraWQiOiJiZDVmMmM0Yy0zMWU4LTExZjAtYmUzOC1kNWQ1YWJkNTM3MGUiLCJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb20uc2FwLmNybS5pYW0iLCJleHAiOjE3NTA2NzkzMjcsInN1YiI6IkFOQU5ELkIiLCJhdWQiOiJuc2QxLWRldi5jeG0tc2FsZXNjbG91ZC5jb20iLCJydHYiOjg2NDAwLCJub24iOiJoTnBabWxmMlh0ajgyV1Zrb3pvNEZKWi0xb0EiLCJ6aWQiOiI1ZGExMDQ4N2JjYjBhOTc2ODQzYTA4ZDAiLCJzcGlkIjoiY2Q3NGEzMTctYjcwNy0xMWVjLWJiMDctNmZhOTIzNjI4NjQzIiwiYWlkIjoibnNkMSIsInVpZCI6ImNkNzRhMzE3LWI3MDctMTFlYy1iYjA3LTZmYTkyMzYyODY0MyIsImM0YyI6ZmFsc2UsImxvY2FsZSI6ImVuLVVTIiwibGFuZ3VhZ2UiOiJlbiIsImVpZCI6IjExZWNiNzA3LWFkNzItYjA2ZS1hZmRiLTgxNWYxNmE4YzAwMCIsInR5cCI6IjEiLCJhZG1pbiI6dHJ1ZSwidXR5IjoiVVNFUiIsImxvZyI6MX0.C0YuHUb9CbvtP4N80urMWoqT6GBVjHpIfdWle3O3TOke4QWTumfNiCdrIzsCd7m25u-fJsVcz4hSbUnOL9rEWkZUf5LwTzlfVMsvFcUs9fti9zvnOejUPqwXrQkU0eethWnjEeWSYo0Ua4z3-G7q_O6NhXUbG_R7a8Sl2VPYz0rg82m0Ft3L-JpqN-yESVuhR8ND4kEdl9aooMNSmIjsgVqcXLkgbY9BrpVw8Ee6lsp24gAKSUOi1zvf7oWmFsHfEC6ufFMR4_d9fNMMSrTIY-CdP4aGjzNIYfU9ocTYztj_8g0et2nvpcynaE2oRl49T6yYSbXA04S5NTIQj1O7cg"
  constructor() {
    //this.socket = io('http://localhost:3600',
      this.socket = io('https://nsd1-dev.cxm-salescloud.com',
      {
                 // transports: ['websocket', 'polling'], // Prefer WebSocket
                  upgrade: true, // Allow upgrade from polling to WebSocket
                  path: "/sap/c4c/api/v1/msgraph-service/msteamsocket/", // Ensure this matches the server-side configuration and Ambassador's path rewriting
                  autoConnect: true,
                  requestTimeout: 10000,
                  reconnectionAttempts: 3,
                  reconnectionDelay: 1000,
                  rejectUnauthorized: false,
                  query:{
                    email: "ajitsahu@sapcxdev.onmicrosoft.com"
                  },
                
                  extraHeaders: {
                    Authorization: `Bearer ${this.token}`,
                    "x-sap-crm-Token": `Bearer ${this.token}`
                    }
      }

                  );
    //this.socket = io('http://localhost:3000',{transports:['WebSocket','']}); // Replac
    this.socket.on('events', (data) => console.log(data));
   }
   sendMessage(message: string) {
    this.socket.emit('chat.message.send', { message: {  "content": "All Well !"} });
 
  }

  onMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }
}
