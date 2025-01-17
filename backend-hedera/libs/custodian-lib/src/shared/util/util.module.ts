import { Module } from '@nestjs/common';
import { SuperService } from './service/super.service';

@Module({
  providers: [SuperService]
})
export class UtilModule {}
