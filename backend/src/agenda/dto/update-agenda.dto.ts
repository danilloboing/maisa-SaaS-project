import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendaDto } from './create-agenda.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateAgendaDto extends PartialType(CreateAgendaDto) {
  @IsBoolean()
  @IsOptional()
  is_deleted: boolean;
}
