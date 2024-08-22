import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Agenda } from './agenda.entity';

@Entity({ name: 'pagamentos' })
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data_pagamento: string;

  @Column()
  valor: number;

  @Column()
  percent_desconto: number;

  @Column()
  valor_desconto: number;

  @Column()
  valor_total: number;

  @Column()
  status: string;

  @OneToOne(() => Agenda, (agenda) => agenda.pagamento)
  agenda: Agenda;
}
