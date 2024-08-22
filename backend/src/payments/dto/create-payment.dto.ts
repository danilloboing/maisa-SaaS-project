import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  data_pagamento: string;

  @IsNumber()
  @IsOptional()
  valor: number;

  @IsNumber()
  @IsOptional()
  percent_desconto?: number;

  @IsString()
  status: string;
}
