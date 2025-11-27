import type { GiftWithAvailabilityDto } from '../../dtos/gift-with-availability.dto';

export interface IListGiftsByEventService {
  perform(eventId: string, categoryId?: string): Promise<GiftWithAvailabilityDto[]>;
}


