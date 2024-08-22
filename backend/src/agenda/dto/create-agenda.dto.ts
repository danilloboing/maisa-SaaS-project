import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

import { CreatePaymentDto } from 'src/payments/dto/create-payment.dto';
import { StatusAgenda } from 'src/enums/status-agenda.enum';

export class CreateAgendaDto extends CreatePaymentDto {
  @IsString()
  @Matches(/^\d{4}\/\d{2}\/\d{2}$/, {
    message: 'A data deve ser no formato YYYY/MM/DD',
  })
  @IsNotEmpty()
  data: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'O horário deve ser no formato HH:MM:SS',
  })
  horario_inicio: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'O horário deve ser no formato HH:MM:SS',
  })
  horario_fim: string;

  @IsString()
  @IsOptional()
  observacao: string;

  @IsNumber()
  @IsNotEmpty()
  id_cliente: number;

  @IsNumber()
  @IsNotEmpty()
  id_servico: number;

  @IsEnum(StatusAgenda, { message: 'Status inválido' })
  @IsNotEmpty()
  status: string;
}