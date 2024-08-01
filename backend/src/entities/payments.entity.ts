import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Service } from './service.entity';

@Entity({ name: 'pagamentos' })
export class Payment {
  @PrimaryGeneratedColumn()
  id_pagamento: number;

  @Column()
  data_pagamento: Date;

  @Column()
  valor_servico: number;

  @Column()
  percent_desconto: number;

  @Column()
  valor_desconto: number;

  @Column()
  valor_total: number;

  @Column()
  status_pagamento: string;

  @Column()
  servico: number;

  @ManyToOne(() => Service, (service) => service.id_servico)
  @JoinColumn({ name: 'servico' })
  servico_pagamento: Service;
}
