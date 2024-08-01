import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categoria_servico' })
export class ServiceCategory {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column()
  nome_categoria: string;
}
