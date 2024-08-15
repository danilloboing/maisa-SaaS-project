import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  nome_servico: string;

  @IsString()
  @IsNotEmpty()
  descricao_servico: string;

  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @IsNumber()
  @IsNotEmpty()
  categoria_servico: number;
}
