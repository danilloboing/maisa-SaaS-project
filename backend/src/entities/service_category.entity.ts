import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Service } from './service.entity';

@Entity({ name: 'categoria_servico' })
export class ServiceCategory {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column()
  nome: string;

  @OneToMany(() => Service, (service) => service.categoria)
  servicos: Service[];
}
