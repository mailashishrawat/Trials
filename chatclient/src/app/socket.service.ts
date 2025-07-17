import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { io, Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  private utteranceResponseSubject = new Subject<any>();
  private utteranceResponseConnection = new Subject<any>();
 constructor()
 {

 } 
 
 init(url:string, token:string, path:string, connected:Boolean, transport: string ) {
    //this.socket = io('http://localhost:3600',
      this.socket = io(url,
      {
                  transports: [ transport], // Prefer WebSocket
                  upgrade: true, // Allow upgrade from polling to WebSocket
                  path: path, // Ensure this matches the server-side configuration and Ambassador's path rewriting
                 // autoConnect: true,
                  requestTimeout: 10000,
                  reconnectionAttempts: 3,
                  reconnectionDelay: 1000,
                 // rejectUnauthorized: false,
                  // query:{
                  //   email: "ajitsahu@sapcxdev.onmicrosoft.com"
                  // },
                  auth : {
                    Authorization: `Bearer ${token}`,
                     "x-sap-crm-Token": `Bearer ${token}`,
                          "cookie":`__Host-x-sap-crm-cookie=${token};`
                  },
    
                  extraHeaders: {
                    Authorization: `Bearer ${token}`,
                    "x-sap-crm-Token": `Bearer ${token}`,
                    "cookie":`__Host-x-sap-crm-cookie=${token};`


                    }
      }

                  );
    //this.socket = io('http://localhost:3000',{transports:['WebSocket','']}); // Replac
    this.socket.on('onConnection', (data) => {
      this.utteranceResponseConnection.next(data.msg);
   

    } )
    
    this.socket.on('onDisconnection', (data) => {
      this.utteranceResponseConnection.next(data.msg);
     // alert(data.msg);
    } )

    this.socket.on('utteranceresponse', (data) =>{
      this.utteranceResponseSubject.next(data.msg);
     // alert(data.msg);
    } )
  //   this.socket.onAny((event, ...args: any) => {
  //     this.utteranceResponseSubject.next('event is '+event.toString());
  //     this.utteranceResponseSubject.next('message is '+args.join(' '));
  //     // Handle any other events as needed
  //   });
    }


   //send message to sever
   sendMessage(message: string) {
    this.socket.emit('utterance', { message: {  "content": message} });
 
  }

   onMessage(): Observable<any> {
      return this.utteranceResponseSubject.asObservable();
    }

    onConnection():Observable<any> {
      return this.utteranceResponseConnection.asObservable();
    }
  


}
