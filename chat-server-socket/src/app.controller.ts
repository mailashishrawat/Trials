import { Controller, Get, Res,Query } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';


@Controller()
export class AppController {
 
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/mschat')
  getSocket(): string {
    return this.appService.getSocket();
  }

  @Get('/health/readiness')
  getReadiness(): Boolean {
    return true;
  }

  @Get('/health/liveness')
  getliveness(): Boolean {
    return true;
  }

  @Get('appointment')
  async getAppointment(): Promise<string> {
     return  this.appService.getAppointment()
    
  }


  @Get('getutc')
  getUTC(@Query('timezone') timezone: string, @Query('offset') offset:number): string { 
    return this.appService.gettimezone(timezone, offset)
  }

  @Get('appointment2')
  async getAppointment2(): Promise<string> {
    return  this.appService.createAppointment()
  }
  @Get('chat')
  getChat(@Res() res: Response) {
    
    const filePath = "./static/index.html"; // Update with your file path
    return res.sendFile(filePath, { root: process.cwd() });
  }

  @Get('test')
  getTest(@Res() res: Response) {
    
    const filePath = "./static/test.html"; // Update with your file path
    return res.sendFile(filePath, { root: process.cwd() });
  }
}
