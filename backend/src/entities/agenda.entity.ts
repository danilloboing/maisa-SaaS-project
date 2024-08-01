import { StatusAgenda } from 'src/enums/status-agenda.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Payment } from './payments.entity';

@Entity({ name: 'agendamentos' })
export class Agenda {
  @PrimaryGeneratedColumn()
  id_agendamento: number;

  @Column()
  data: Date;

  @Column()
  horario_inicio: string;

  @Column()
  horario_fim: string;

  @Column()
  observacao_atendimento: string;

  @Column()
  servico: number;

  @Column()
  cliente: number;

  @OneToOne(() => Customer, (customer) => customer.id_cliente)
  cliente_agendamento: Customer;

  @Column()
  status_agendamento: StatusAgenda;

  @Column()
  pagamento: number;

  @OneToMany(() => Payment, (payment) => payment.id_pagamento)
  @JoinColumn({ name: 'pagamento' })
  pagamento_agendamento: Payment;
}
