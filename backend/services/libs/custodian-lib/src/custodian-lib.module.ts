import { Module } from '@nestjs/common';
import { CustodianLibService } from './custodian-lib.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@Module({
  providers: [CustodianLibService],
  exports: [CustodianLibService],
  imports: [CoreModule, SharedModule],
})
export class CustodianLibModule {}
