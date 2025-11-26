import type { CreateEventDto } from '../../dtos/create-event.dto';
import type { EventDto } from '../../dtos/event.dto';

export interface ICreateEventService {
  perform(eventData: CreateEventDto, userId: string): Promise<EventDto>;
}
