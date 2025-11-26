import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('health')
  getHealth(): object {
    return {
      status: 'OK',
      message: 'API is running successfully',
      timestamp: new Date().toISOString(),
    };
  }
}
