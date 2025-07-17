"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketHelper = void 0;
const common_1 = require("@nestjs/common");
console.log('--- Gateway file loaded ---');
class SocketHelper {
    constructor() {
        this.logger = new common_1.Logger('ChatGateway');
        this.logger.log('ChatGateway constructor called');
    }
    setup(server) {
        this.logger.log('setup  called');
        server === null || server === void 0 ? void 0 : server.on('connection', (socket) => {
            console.log(`New client connected: ${socket.id}`);
            socket.emit('onConnection', { msg: `Hello from server, your client id is ${socket.id}` });
            socket.on('disconnect', () => {
                console.log('user disconnected');
                socket.emit('onDisconnection', { msg: `User is disconnected from ${socket.id}` });
            });
            socket.on('utterance', (req) => {
                var inputmessage = req.message.content.toString();
                console.log('message: ' + req.message.content.toString());
                socket.emit('utteranceresponse', { msg: `${inputmessage}, your client id is ${socket.id}` });
            });
            socket.emit('hello', 'world');
        });
    }
}
exports.SocketHelper = SocketHelper;
//# sourceMappingURL=SocketHelper.js.map