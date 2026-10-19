import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CfpModule } from './cfp/cfp.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [CfpModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
