import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import { Customer } from './customer.entity';
import { Payment } from './payments.entity';
import { Service } from './service.entity';

@Entity({ name: 'agendamentos' })
export class Agenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  data: string;

  @Column()
  horario_inicio: string;

  @Column()
  horario_fim: string;

  @Column()
  observacao: string;

  @Column()
  status: string;

  @Column()
  id_servico: number;

  @Column()
  id_cliente: number;

  @Column()
  id_pagamento: number;

  @ManyToOne(() => Service, (service) => service.agendas)
  @JoinColumn({ name: 'id_servico' })
  servico: Service;

  @ManyToOne(() => Customer, (cliente) => cliente.agendas)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Customer;

  @OneToOne(() => Payment, (pagamento) => pagamento.agenda)
  @JoinColumn({ name: 'id_pagamento' })
  pagamento: Payment;
}
