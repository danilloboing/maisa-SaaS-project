import { IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class AgendaReportDto {
  @IsString()
  @Matches(/^\d{4}\-\d{2}\-\d{2}$/, {
    message: 'A data deve ser no formato YYYY/MM/DD',
  })
  @IsOptional()
  startDate?: string;

  @IsString()
  @Matches(/^\d{4}\-\d{2}\-\d{2}$/, {
    message: 'A data deve ser no formato YYYY/MM/DD',
  })
  @IsOptional()
  endDate?: string;

  @IsNumber()
  @IsOptional()
  customerId?: number;

  @IsNumber()
  @IsOptional()
  serviceId?: number;
}
