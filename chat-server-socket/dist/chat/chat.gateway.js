"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
console.log('--- Gateway file loaded ---');
let ChatGateway = class ChatGateway {
    constructor() {
        this.logger = new common_1.Logger('ChatGateway');
        this.logger.log('ChatGateway constructor called');
    }
    afterInit(server) {
        this.logger.log('Chat afterInit  called');
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
        client.emit('connection', `Successfully connected! Your ID: ${client.id}`);
        client.broadcast.emit('userJoined', `User ${client.id} has joined the chat.`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
        client.broadcast.emit('userLeft', `User ${client.id} has left the chat.`);
    }
    handleMessage(message, client) {
        this.logger.log(`Received message from ${client.id}: "${message}"`);
        this.server.emit('message', { senderId: client.id, content: message, timestamp: new Date().toLocaleTimeString() });
    }
    handleJoinRoom(roomName, client) {
        client.join(roomName);
        this.logger.log(`${client.id} joined room: ${roomName}`);
        this.server.to(roomName).emit('roomMessage', {
            senderId: 'Server',
            content: `${client.id} has joined room: ${roomName}`,
            timestamp: new Date().toLocaleTimeString()
        });
    }
    handleLeaveRoom(roomName, client) {
        client.leave(roomName);
        this.logger.log(`${client.id} left room: ${roomName}`);
        this.server.to(roomName).emit('roomMessage', {
            senderId: 'Server',
            content: `${client.id} has left room: ${roomName}`,
            timestamp: new Date().toLocaleTimeString()
        });
    }
};
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleLeaveRoom", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        } }),
    __metadata("design:paramtypes", [])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map