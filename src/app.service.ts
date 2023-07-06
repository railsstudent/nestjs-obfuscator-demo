import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.log('getHello is called');

    return 'Hello World!';
  }
}
