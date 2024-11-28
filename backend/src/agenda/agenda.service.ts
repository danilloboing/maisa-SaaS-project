import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as moment from 'moment';

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
      where: { is_deleted: false },
    });

    const result = agenda.map((item) => {
      item.pagamento.data_pagamento = moment(
        item.pagamento.data_pagamento,
      ).format('YYYY-MM-DD');
      return {
        ...item,
      };
    });

    return result;
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
    console.log('updateAgendaDto', updateAgendaDto);
    const propriedadesAgenda = [
      'id',
      'nome',
      'data',
      'horario_inicio',
      'horario_fim',
      'status',
      'id_servico',
      'id_cliente',
      'observacao',
    ];

    const propriedadesPayments = [
      'valor',
      'data_pagamento',
      'metodo_pagamento',
      'percent_desconto',
    ];

    const agendaObject = Object.fromEntries(
      Object.entries(updateAgendaDto).filter(([key]) =>
        propriedadesAgenda.includes(key),
      ),
    );

    const paymentObject = Object.fromEntries(
      Object.entries(updateAgendaDto).filter(([key]) =>
        propriedadesPayments.includes(key),
      ),
    );

    const agenda = await this.agendaRepository.findOne({
      where: { id: id },
    });

    if (!agenda) {
      throw new Error('Agenda não encontrada');
    }

    if (updateAgendaDto.percent_desconto) {
      const pagamento = await this.paymentsService.findOne(agenda.id_pagamento);

      if (!pagamento) {
        throw new Error('Pagamento não encontrado');
      }

      paymentObject.percent_desconto = updateAgendaDto.percent_desconto;
      paymentObject.valor = pagamento.valor;
      await this.paymentsService.update(pagamento.id, paymentObject);
    }

    const updatedAgenda = await this.agendaRepository
      .update(id, agendaObject)
      .then(() => {
        return this.agendaRepository.findOne({ where: { id: id } });
      });

    return updatedAgenda;
  }
}
