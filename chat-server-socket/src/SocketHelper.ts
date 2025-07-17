import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
console.log('--- Gateway file loaded ---');
export class SocketHelper {

  private logger: Logger = new Logger('ChatGateway');

  constructor() {
    this.logger.log('ChatGateway constructor called');
  }

  public  setup(server: Server) {
    this.logger.log('setup  called');
    server?.on('connection', (socket) => {
      console.log(`New client connected: ${socket.id}`);
      socket.emit('onConnection', { msg: `Hello from server, your client id is ${socket.id}` });
      socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.emit('onDisconnection', { msg: `User is disconnected from ${socket.id}` });
    });
    socket.on('utterance', (req) => {
      var inputmessage=req.message.content.toString()
        console.log('message: ' + req.message.content.toString());
        socket.emit('utteranceresponse', { msg: `${inputmessage}, your client id is ${socket.id}` }); 
      });

      socket.emit('hello', 'world'); 
   })

  }

}