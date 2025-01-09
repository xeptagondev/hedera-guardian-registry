import { Module } from '@nestjs/common';
import { CommonLibService } from './common-lib.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@Module({
  providers: [CommonLibService],
  exports: [CommonLibService],
  imports: [CoreModule, SharedModule],
})
export class CommonLibModule {}
