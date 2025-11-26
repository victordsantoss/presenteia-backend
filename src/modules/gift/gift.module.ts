import { Module } from '@nestjs/common';
import { GiftController } from './controllers/gift.controller';
import { GiftRepository } from './repositories/gift/gift.repository';
import { CategoryRepository } from './repositories/category/category.repository';
import { CreateGiftService } from './services/create/create.service';
import { PrismaModule } from '../../database/database.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [PrismaModule, CommonModule],
  controllers: [GiftController],
  providers: [
    {
      provide: 'ICreateGiftService',
      useClass: CreateGiftService,
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
  exports: ['ICreateGiftService', 'IGiftRepository', 'ICategoryRepository'],
})
export class GiftModule {}
