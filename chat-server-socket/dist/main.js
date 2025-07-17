"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const SocketHelper_1 = require("./SocketHelper");
async function bootstrap() {
    const logger = new common_1.Logger('main');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true, logger: ['log', 'error', 'warn', 'debug', 'verbose'] });
    const port = process.env.port || '8080';
    const GLOBAL_PREFIX = '/sap/c4c/api/v1/mschat-service';
    app.setGlobalPrefix(GLOBAL_PREFIX);
    await app.listen(port);
    logger.log(`Application is running on: ${await app.getUrl()}`);
    logger.log(`version 4 WebSocket server is also running on the same port (${port})`);
    const io = new socket_io_1.Server(app.getHttpServer(), { cors: {
            origin: '*',
            methods: ['GET', 'POST', 'OPTIONS'],
        },
        path: GLOBAL_PREFIX + '/mschat/',
        transports: ['polling', 'websocket'],
    });
    new SocketHelper_1.SocketHelper().setup(io);
}
bootstrap();
//# sourceMappingURL=main.js.map