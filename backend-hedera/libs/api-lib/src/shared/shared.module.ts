import { Module } from '@nestjs/common';
import { UtilModule } from './util/util.module';

@Module({
    imports: [UtilModule],
    providers: [],
})
export class SharedModule {}
