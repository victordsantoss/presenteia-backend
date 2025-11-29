import type {
  CreateGiftRequestDto,
  CreateGiftResponseDto,
} from '../../dtos/create-gift.dto';

export interface ICreateGiftService {
  perform(
    giftData: CreateGiftRequestDto,
    eventId: string,
  ): Promise<CreateGiftResponseDto>;
}
