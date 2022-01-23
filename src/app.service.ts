import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHealth(): string {
    return 'All is ok!';
  }
  getHealthwithRes(): string {
    return 'All is ok via res object!';
  }
  getHealthwithResjson(): string {
    return 'All is ok via res object json!';
  }
}
