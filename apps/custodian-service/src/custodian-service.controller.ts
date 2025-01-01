import { Controller, Get } from '@nestjs/common';
import { CustodianServiceService } from './custodian-service.service';

@Controller()
export class CustodianServiceController {
  constructor(private readonly custodianServiceService: CustodianServiceService) {}

  @Get()
  getHello(): string {
    return this.custodianServiceService.getHello();
  }
}
