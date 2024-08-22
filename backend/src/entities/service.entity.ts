import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { ServiceCategory } from './service_category.entity';
import { Agenda } from './agenda.entity';

@Entity({ name: 'servicos' })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  preco: number;

  @ManyToOne(
    () => ServiceCategory,
    (serviceCategory) => serviceCategory.servicos,
  )
  @JoinColumn({ name: 'categoria_servico' })
  categoria: ServiceCategory;

  @Column()
  is_active: boolean;

  @OneToMany(() => Agenda, (agenda) => agenda.servico)
  agendas: Agenda[];
}
