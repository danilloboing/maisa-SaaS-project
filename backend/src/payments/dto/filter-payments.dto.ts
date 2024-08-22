import { IsNumber } from 'class-validator';

export class FilterPaymentsDto {
  @IsNumber()
  page: number;

  @IsNumber()
  limit: number;

  @IsNumber()
  id_cliente: number;

  @IsNumber()
  id_servico: number;
}
