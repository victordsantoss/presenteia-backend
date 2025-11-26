import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { EventRepository } from './repositories/event.repository';
import { CreateEventService } from './services/create/create.service';
import { GetEventService } from './services/get/get.service';
import { PrismaModule } from '../../database/database.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [PrismaModule, CommonModule],
  controllers: [EventController],
  providers: [
    {
      provide: 'ICreateEventService',
      useClass: CreateEventService,
    },
    {
      provide: 'IGetEventService',
      useClass: GetEventService,
    },
    {
      provide: 'IEventRepository',
      useClass: EventRepository,
    },
  ],
  exports: ['ICreateEventService', 'IGetEventService', 'IEventRepository'],
})
export class EventModule {}
