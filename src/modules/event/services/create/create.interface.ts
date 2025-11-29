import type { CreateEventRequestDto } from '../../dtos/create-event.dto';
import type { EventDto } from '../../dtos/event.dto';

export interface ICreateEventService {
  perform(eventData: CreateEventRequestDto, userId: string): Promise<EventDto>;
}
