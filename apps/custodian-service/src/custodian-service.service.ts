import { Injectable } from '@nestjs/common';

@Injectable()
export class CustodianServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
