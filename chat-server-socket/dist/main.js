"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
async function bootstrap() {
    const logger = new common_1.Logger('main');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true, logger: ['log', 'error', 'warn', 'debug', 'verbose'] });
    const port = 3000;
    await app.listen(port);
    logger.log(`Application is running on: ${await app.getUrl()}`);
    logger.log(`WebSocket server is also running on the same port (${port})`);
    const io = new socket_io_1.Server(app.getHttpServer(), { cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
}
bootstrap();
//# sourceMappingURL=main.js.map