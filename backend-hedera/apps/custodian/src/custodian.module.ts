import { Module } from '@nestjs/common';
import { CustodianController } from './custodian.controller';
import { CustodianService } from './custodian.service';

@Module({
  imports: [],
  controllers: [CustodianController],
  providers: [CustodianService],
})
export class CustodianModule {}
