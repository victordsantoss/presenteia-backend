import type {
  ListGiftsByEventRequestDto,
  ListGiftsByEventResponseDto,
} from '../../dtos/list-gifts-by-event.dto';

export interface IListGiftsByEventService {
  perform(
    eventId: string,
    filters: ListGiftsByEventRequestDto,
  ): Promise<ListGiftsByEventResponseDto>;
}
