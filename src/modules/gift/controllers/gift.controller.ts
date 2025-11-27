import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { CreateGiftDto } from '../dtos/create-gift.dto';
import { GiftDto } from '../dtos/gift.dto';
import { GiftWithAvailabilityDto } from '../dtos/gift-with-availability.dto';
import { CategoryDto } from '../dtos/category.dto';
import type { ICreateGiftService } from '../services/create/create.interface';
import type { IListGiftsByEventService } from '../services/list-by-event/list-by-event.interface';
import type { IListCategoriesByEventService } from '../services/list-categories-by-event/list-categories-by-event.interface';

@ApiTags('Gifts')
@Controller('gifts')
export class GiftController {
  constructor(
    @Inject('ICreateGiftService')
    private readonly createGiftService: ICreateGiftService,
    @Inject('IListGiftsByEventService')
    private readonly listGiftsByEventService: IListGiftsByEventService,
    @Inject('IListCategoriesByEventService')
    private readonly listCategoriesByEventService: IListCategoriesByEventService,
  ) {}

  @Post('events/:eventId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Adicionar presente ao evento' })
  @ApiResponse({
    status: 201,
    description: 'Presente criado com sucesso.',
    type: GiftDto,
  })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado.' })
  @ApiBody({
    type: CreateGiftDto,
    description: 'Dados do presente',
  })
  async create(
    @Body() giftData: CreateGiftDto,
    @Param('eventId') eventId: string,
    @Request() req: any,
  ): Promise<GiftDto> {
    return await this.createGiftService.perform(giftData, eventId);
  }

  @Get('events/:eventId')
  @ApiOperation({ summary: 'Listar presentes do evento com disponibilidade' })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'ID da categoria para filtrar presentes',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de presentes com informações de disponibilidade.',
    type: [GiftWithAvailabilityDto],
  })
  @ApiResponse({ status: 404, description: 'Evento não encontrado.' })
  async listByEvent(
    @Param('eventId') eventId: string,
    @Query('categoryId') categoryId?: string,
  ): Promise<GiftWithAvailabilityDto[]> {
    return await this.listGiftsByEventService.perform(eventId, categoryId);
  }

  @Get('events/:eventId/categories')
  @ApiOperation({
    summary: 'Listar categorias com presentes vinculados ao evento',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias que possuem presentes no evento.',
    type: [CategoryDto],
  })
  @ApiResponse({ status: 404, description: 'Evento não encontrado.' })
  async listCategoriesByEvent(
    @Param('eventId') eventId: string,
  ): Promise<CategoryDto[]> {
    return await this.listCategoriesByEventService.perform(eventId);
  }
}

