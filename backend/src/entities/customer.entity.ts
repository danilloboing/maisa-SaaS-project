import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Agenda } from './agenda.entity';

@Entity({ name: 'clientes' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  endereco: string;

  @Column()
  celular: string;

  @Column()
  data_criacao: Date;

  @Column()
  is_active: boolean;

  @OneToMany(() => Agenda, (agenda) => agenda.cliente)
  agendas: Agenda[];
}
