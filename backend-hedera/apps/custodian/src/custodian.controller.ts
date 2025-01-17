import { Controller, Get } from '@nestjs/common';
import { CustodianService } from './custodian.service';

@Controller()
export class CustodianController {
    constructor(private readonly custodianService: CustodianService) {}

    @Get()
    getHello(): string {
        return this.custodianService.getHello();
    }
}
