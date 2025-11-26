import type { CreateGiftDto } from '../../dtos/create-gift.dto';
import type { GiftDto } from '../../dtos/gift.dto';

export interface ICreateGiftService {
  perform(giftData: CreateGiftDto, eventId: string): Promise<GiftDto>;
}
