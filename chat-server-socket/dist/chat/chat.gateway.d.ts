import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class SocketHelper {
    private logger;
    constructor();
    static setup(server: Server): void;
}
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger;
    server: Server;
    constructor();
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleMessage(message: string, client: Socket): void;
    handleJoinRoom(roomName: string, client: Socket): void;
    handleLeaveRoom(roomName: string, client: Socket): void;
}
