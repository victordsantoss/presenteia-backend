import { Module } from '@nestjs/common';
import { GiftController } from './controllers/gift.controller';
import { GiftRepository } from './repositories/gift/gift.repository';
import { CategoryRepository } from './repositories/category/category.repository';
import { CreateGiftService } from './services/create/create.service';
import { ListGiftsByEventService } from './services/list-by-event/list-by-event.service';
import { PrismaModule } from '../../database/database.module';
import { CommonModule } from '../../common/common.module';
import { EventModule } from '../event/event.module';

@Module({
  imports: [PrismaModule, CommonModule, EventModule],
  controllers: [GiftController],
  providers: [
    {
      provide: 'ICreateGiftService',
      useClass: CreateGiftService,
    },
    {
      provide: 'IListGiftsByEventService',
      useClass: ListGiftsByEventService,
    },
    {
      provide: 'IGiftRepository',
      useClass: GiftRepository,
    },
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    },
  ],
  exports: [
    'ICreateGiftService',
    'IListGiftsByEventService',
    'IGiftRepository',
    'ICategoryRepository',
  ],
})
export class GiftModule {}
