import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from './socket.service';
import { IMessage,originType} from './serverdto'; // Assuming you have an IMessage interface defined in a separate file


@Component({
  selector: 'app-root',
  standalone: true, // ✅ Important: This makes it a standalone component
  imports: [CommonModule, FormsModule], // ✅ Import CommonModule and FormsModule for template binding and forms
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  messages: IMessage[] = [];
  newMessage: string = '';
  originType = originType;
  transportype= 'websocket'; // Default transport type
  path= '/sap/c4c/api/v1/mschat-service/mschat'; // Ensure this matches the server-side configuration
  url: string = 'http://localhost:3600';
token: string = '';
connected: boolean = false;

constructor(private socketService: SocketService){
  this.socketService = socketService;

}

connectSocket() {
  // If your SocketService supports dynamic config, use a factory or setter.
  this.socketService.init(this.url, this.token, this.path,this.connected,this.transportype);
  this.receiveServerMessage()
  this.recieveConnectionStatus();

}
// Example usage when sending a message:
sendMessage() {
  if (this.newMessage && this.newMessage.trim()) {
    this.messages.push({
      sender: 'Me',
      text: this.newMessage,
      time: new Date(),
      origin: originType.Client
    });
    this.socketService.sendMessage(this.newMessage); // Send the message through the socket service
    this.newMessage = '';
    // ...send to server logic...
  }
}


// Example usage when receiving a message from server:
receiveServerMessage() {
  this.socketService.onMessage().subscribe((msgText: string) => {
  this.messages.push({
    sender: 'Server',
    text: msgText,
    time: new Date(),
    origin: originType.Server
  });
})
}

recieveConnectionStatus(){
this.socketService.onConnection().subscribe((msgText: string) => {
  this.connected=!this.connected;
  this.messages.push({
    sender: 'Server',
    text: msgText,
    time: new Date(),
    origin: originType.Server
  });
})
}

}
