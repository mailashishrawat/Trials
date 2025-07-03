import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from './socket.service';


@Component({
  selector: 'app-root',
  standalone: true, // ✅ Important: This makes it a standalone component
  imports: [CommonModule, FormsModule], // ✅ Import CommonModule and FormsModule for template binding and forms
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  messages: string[] = [];
  newMessage: string = '';

constructor(private socketService: SocketService){}

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push(this.newMessage.trim());
      this.socketService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }
}