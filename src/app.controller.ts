import { Controller, Get, HttpCode, HttpStatus, Req, Request, Res, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('health')
  getHealth(): string {
    return this.appService.getHealth();
  }
  @Get('healthwithres')
  getWithRes(@Request() request, @Response() res) {
  return res.status(HttpStatus.OK).send(this.appService.getHealthwithRes())


  }
  @Get('healthwithresjson')
  getWithResjson(@Request() request, @Response() res) {
  //return res.status(HttpStatus.OK).send(this.appService.getHealthwithRes())
   return res.status(HttpStatus.OK).json([this.appService.getHealthwithResjson()])
   //return this.appService.getHealthwithResjson()

  }
}
