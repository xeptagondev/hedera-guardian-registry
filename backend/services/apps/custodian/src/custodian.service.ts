import { Injectable } from '@nestjs/common';

@Injectable()
export class CustodianService {
  getHello(): string {
    return 'Hello World!';
  }
}
