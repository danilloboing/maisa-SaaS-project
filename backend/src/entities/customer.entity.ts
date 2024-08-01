import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class Customer {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column()
  nome_cliente: string;

  @Column()
  email: string;

  @Column()
  endereco_cliente: string;

  @Column()
  celular: string;

  @Column()
  data_criacao: Date;
}
