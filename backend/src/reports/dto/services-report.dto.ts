import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ServicesReportDto {
  @IsNumber()
  @IsOptional()
  serviceId?: number;

  @IsString()
  @IsOptional()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate: string;

  @IsNumber()
  @IsOptional()
  categoriaId?: number;
}
