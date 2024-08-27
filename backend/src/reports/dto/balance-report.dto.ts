import { IsOptional, IsString, Matches } from 'class-validator';

export class BalanceReportDto {
  @IsString()
  @Matches(/^\d{4}\/\d{2}\/\d{2}$/, {
    message: 'A data deve ser no formato YYYY/MM/DD',
  })
  @IsOptional()
  startDate?: string;

  @IsString()
  @Matches(/^\d{4}\/\d{2}\/\d{2}$/, {
    message: 'A data deve ser no formato YYYY/MM/DD',
  })
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
