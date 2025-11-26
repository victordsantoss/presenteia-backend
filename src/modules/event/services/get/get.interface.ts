import type { EventDto } from '../../dtos/event.dto';

export interface IGetEventService {
  perform(slug: string): Promise<EventDto>;
}
