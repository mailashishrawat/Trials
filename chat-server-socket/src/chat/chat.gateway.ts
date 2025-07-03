import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
console.log('--- Gateway file loaded ---');
import { SOCKET_IO } from './socketioprovider';
import { Inject, Injectable } from '@nestjs/common';
// @WebSocketGateway decorator defines this class as a WebSocket gateway.
// It listens for WebSocket connections.
// The first argument (port) is optional; if omitted, it defaults to the HTTP server's port.
// The second argument is an options object for the underlying Socket.io server.
// Here, we configure CORS to allow connections from any origin for development purposes.
// In a production environment, you should restrict 'origin' to your frontend's domain.
// @WebSocketGateway({ cors: {
//   origin: '*',
//   credentials: true,
// },})

export class SocketHelper {

  private logger: Logger = new Logger('ChatGateway');

  constructor() {
    this.logger.log('ChatGateway constructor called');
  }

  public static setup(server: Server) {
    server?.on('connection', (socket) => {
      console.log(`New client connected: ${socket.id}`);
      socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message', (msg) => {
        console.log('message: ' + msg.text.toString());
      });
   })
  }

}

@WebSocketGateway(  { cors: {
  origin: '*',
  methods: ['GET', 'POST'],
  //allowedHeaders: ['Content-Type'],
}})
 //export class ChatGateway {//implements OnGatewayConnection, OnGatewayDisconnect {
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  // @WebSocketServer() decorator injects the Socket.io server instance.
  // This allows us to emit events to clients (broadcast, to specific clients, or to rooms).
  private logger: Logger = new Logger('ChatGateway');

  server: Server;
  constructor() {
    this.logger.log('ChatGateway constructor called');

  }


  // onGatewayInit is a lifecycle hook called after the gateway has been initialized.
  afterInit(server: Server) {
    this.logger.log('Chat afterInit  called');
    //server=server
  }

  // onGatewayConnection is a lifecycle hook called when a new client connects.
  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    // Emit a 'connection' event to the newly connected client
    client.emit('connection', `Successfully connected! Your ID: ${client.id}`);
    // Broadcast to all other clients that a new user has joined
    client.broadcast.emit('userJoined', `User ${client.id} has joined the chat.`);
  }

  // onGatewayDisconnect is a lifecycle hook called when a client disconnects.
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    // Broadcast to all other clients that a user has left
    client.broadcast.emit('userLeft', `User ${client.id} has left the chat.`);
  }

  // @SubscribeMessage decorator defines a handler for specific incoming messages (events) from clients.
  // When a client emits a 'sendMessage' event, this method will be invoked.
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: string, // Extracts the data payload from the message
    @ConnectedSocket() client: Socket, // Extracts the connected client's Socket instance
  ): void {
    this.logger.log(`Received message from ${client.id}: "${message}"`);

    // Emit the received message to all connected clients (including the sender)
    // The 'message' event name is what clients will listen for.
    this.server.emit('message', { senderId: client.id, content: message, timestamp: new Date().toLocaleTimeString() });

    // You can also send an acknowledgment back to the sender
    // client.emit('messageAcknowledged', 'Your message was received by the server.');
  }

  // Example of handling a 'joinRoom' event
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() roomName: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(roomName); // Add the client to the specified room
    this.logger.log(`${client.id} joined room: ${roomName}`);
    // Emit to everyone in the room (including the sender) that someone joined
    this.server.to(roomName).emit('roomMessage', {
      senderId: 'Server',
      content: `${client.id} has joined room: ${roomName}`,
      timestamp: new Date().toLocaleTimeString()
    });
  }

  // Example of handling a 'leaveRoom' event
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() roomName: string,
    @ConnectedSocket() client: Socket,
  ): void {
    client.leave(roomName); // Remove the client from the specified room
    this.logger.log(`${client.id} left room: ${roomName}`);
    // Emit to everyone in the room (excluding the sender, usually handled by client-side filtering)
    this.server.to(roomName).emit('roomMessage', {
      senderId: 'Server',
      content: `${client.id} has left room: ${roomName}`,
      timestamp: new Date().toLocaleTimeString()
    });
  }
}
