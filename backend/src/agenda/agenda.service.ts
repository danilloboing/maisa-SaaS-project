import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ServicesService } from 'src/services/services.service';
import { PaymentsService } from 'src/payments/payments.service';
import { CustomersService } from 'src/customers/customers.service';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { Agenda } from 'src/entities/agenda.entity';

@Injectable()
export class AgendaService {
  constructor(
    @InjectRepository(Agenda)
    private agendaRepository: Repository<Agenda>,

    private readonly servicesService: ServicesService,
    private readonly paymentsService: PaymentsService,
    private readonly customersService: CustomersService,
  ) {}

  async create(createAgendaDto: CreateAgendaDto) {
    const servico = await this.servicesService.findOne(
      createAgendaDto.id_servico,
    );

    const cliente = await this.customersService.findOne(
      createAgendaDto.id_cliente,
    );

    const pagamento = await this.paymentsService
      .create({
        data_pagamento: createAgendaDto.data_pagamento,
        valor: servico.preco,
        percent_desconto: createAgendaDto.percent_desconto,
        status: 'Pendente',
      })
      .catch((error) => {
        console.log(error);
        throw new Error('Erro ao criar pagamento');
      });

    const agendamento = await this.agendaRepository.save({
      data: createAgendaDto.data,
      horario_inicio: createAgendaDto.horario_inicio,
      horario_fim: createAgendaDto.horario_fim,
      observacao: createAgendaDto.observacao,
      status: createAgendaDto.status,
      id_cliente: cliente.id,
      id_servico: servico.id,
      id_pagamento: pagamento.id,
    });

    return await this.agendaRepository.findOne({
      where: { id: agendamento.id },
      relations: {
        servico: true,
        cliente: true,
        pagamento: true,
      },
    });
  }

  async findAll() {
    const agenda = await this.agendaRepository.find({
      relations: ['servico', 'cliente', 'pagamento'],
    });

    return agenda;
  }

  async findOne(id: number) {
    const agenda = await this.agendaRepository.findOne({
      where: { id: id },
      relations: ['servico', 'cliente', 'pagamento'],
    });

    if (!agenda) {
      throw new Error('Agenda não encontrada');
    }

    return agenda;
  }

  async update(id: number, updateAgendaDto: UpdateAgendaDto) {
    const agenda = await this.agendaRepository.findOne({
      where: { id: id },
    });

    if (!agenda) {
      throw new Error('Agenda não encontrada');
    }

    const updatedAgenda = await this.agendaRepository
      .update(id, updateAgendaDto)
      .then(() => {
        return this.agendaRepository.findOne({ where: { id: id } });
      });

    return updatedAgenda;
  }
}
