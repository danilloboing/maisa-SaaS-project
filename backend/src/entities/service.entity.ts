import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ServiceCategory } from './service_category.entity';

@Entity({ name: 'servicos' })
export class Service {
  @PrimaryGeneratedColumn()
  id_servico: number;

  @Column()
  nome_servico: string;

  @Column()
  descricao_servico: string;

  @Column()
  preco: number;

  @Column()
  categoria_servico: number;

  @ManyToOne(
    () => ServiceCategory,
    (serviceCategory) => serviceCategory.id_categoria,
  )
  @JoinColumn({ name: 'categoria_servico' })
  categoria: ServiceCategory;
}
