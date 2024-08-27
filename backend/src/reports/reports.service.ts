import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BalanceReportDto } from './dto/balance-report.dto';
import { AgendaReportDto } from './dto/agenda-report.dto';
import { Customer } from 'src/entities/customer.entity';
import { Service } from 'src/entities/service.entity';
import { Agenda } from 'src/entities/agenda.entity';
import { Payment } from 'src/entities/payments.entity';
import { SheetsService } from 'src/sheets/sheets.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Agenda)
    private agendaRepository: Repository<Agenda>,

    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,

    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private readonly sheetsService: SheetsService,
  ) {}

  async getAgendaReport(dto: AgendaReportDto) {
    const allData = [];

    const columns = [
      'Data',
      'Hora',
      'Cliente',
      'Serviço',
      'Desconto',
      'Valor',
      'Status de Atendimento',
      'Status de Pagamento',
      'Observações',
    ];

    const queryBuilder = this.agendaRepository
      .createQueryBuilder('agenda')
      .leftJoinAndSelect('agenda.cliente', 'cliente')
      .leftJoinAndSelect('agenda.servico', 'servico')
      .leftJoinAndSelect('agenda.pagamento', 'pagamento');

    if (dto.startDate && dto.endDate) {
      if (dto.startDate > dto.endDate) {
        throw new Error('Data de início não pode ser maior que a data de fim');
      }
      queryBuilder.andWhere('agenda.data BETWEEN :startDate AND :endDate', {
        startDate: dto.startDate,
        endDate: dto.endDate,
      });
    } else if (dto.startDate) {
      queryBuilder.andWhere('agenda.data >= :startDate', {
        startDate: dto.startDate,
      });
    } else if (dto.endDate) {
      queryBuilder.andWhere('agenda.data <= :endDate', {
        endDate: dto.endDate,
      });
    }

    if (dto.serviceId) {
      queryBuilder.andWhere('agenda.servico.id = :serviceId', {
        serviceId: dto.serviceId,
      });
    }

    if (dto.customerId) {
      queryBuilder.andWhere('cliente.id = :customerId', {
        customerId: dto.customerId,
      });
    }

    try {
      const agendamentos = await queryBuilder.getMany();

      for (const agendamento of agendamentos) {
        allData.push([
          agendamento.data,
          `${agendamento.horario_fim}/${agendamento.horario_inicio}`,
          agendamento.cliente.nome,
          agendamento.servico.nome,
          agendamento.pagamento.valor_desconto,
          agendamento.pagamento.valor,
          agendamento.status,
          agendamento.pagamento.status,
          agendamento.observacao,
        ]);
      }

      return await this.sheetsService.generateSheet(columns, allData);
    } catch (error) {
      throw new Error('Erro ao gerar o relatório de agendamentos');
    }
  }

  async getBalanceReport(dto: BalanceReportDto) {
    const allData = [];

    const columns = [
      'Data Serviço',
      'Cliente',
      'Data Pagamentos',
      'Valor',
      '% Desconto',
      'Valor Desconto',
      'Total',
      'Status',
    ];

    const queryBuilder = this.paymentRepository
      .createQueryBuilder('pagamentos')
      .leftJoinAndSelect('pagamentos.agenda', 'agenda')
      .leftJoinAndSelect('agenda.cliente', 'cliente');

    if (dto.startDate && dto.endDate) {
      if (dto.startDate > dto.endDate) {
        throw new Error('Data de início não pode ser maior que a data de fim');
      }
      queryBuilder.andWhere('pagamentos.data BETWEEN :startDate AND :endDate', {
        startDate: dto.startDate,
        endDate: dto.endDate,
      });
    } else if (dto.startDate) {
      queryBuilder.andWhere('pagamentos.data >= :startDate', {
        startDate: dto.startDate,
      });
    } else if (dto.endDate) {
      queryBuilder.andWhere('pagamentos.data <= :endDate', {
        endDate: dto.endDate,
      });
    }

    if (dto.status) {
      queryBuilder.andWhere('pagamentos.status = :status', {
        status: dto.status,
      });
    }

    try {
      const pagamentos = await queryBuilder.getMany();

      for (const pagamento of pagamentos) {
        allData.push([
          new Date(pagamento.data_pagamento).toLocaleDateString('pt-br', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          pagamento.agenda.cliente.nome,
          new Date(pagamento.agenda.data).toLocaleDateString('pt-br', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          pagamento.valor,
          pagamento.percent_desconto,
          pagamento.valor_desconto,
          pagamento.valor_total,
          pagamento.status,
        ]);
      }

      return await this.sheetsService.generateSheet(columns, allData);
    } catch (error) {
      throw new Error('Erro ao gerar o relatório de balanço');
    }
  }

  async getCustomersReport() {
    const allData = [];

    const columns = [
      'Nome',
      'E-mail',
      'Endereço',
      'Telefone',
      'Total Gasto',
      'Total de Serviços',
    ];

    const queryBuilder = this.customerRepository
      .createQueryBuilder('cliente')
      .leftJoinAndSelect('cliente.agendas', 'agendas')
      .leftJoinAndSelect('agendas.pagamento', 'pagamento');

    try {
      const clientes = await queryBuilder.getMany();

      for (const cliente of clientes) {
        const totalGasto = cliente.agendas.reduce(
          (acc, agenda) => acc + agenda.pagamento.valor_total,
          0,
        );

        allData.push([
          cliente.nome,
          cliente.email,
          cliente.endereco,
          cliente.celular,
          totalGasto,
          cliente.agendas.length,
        ]);
      }

      return await this.sheetsService.generateSheet(columns, allData);
    } catch (error) {
      throw new Error('Erro ao gerar o relatório de clientes');
    }
  }

  async getServicesReport() {
    const allData = [];

    const columns = [
      'Serviço',
      'Preço',
      'Categoria',
      'Agendados',
      'Realizados',
      'Cancelados',
    ];

    const queryBuilder = this.serviceRepository
      .createQueryBuilder('servicos')
      .leftJoinAndSelect('servicos.categoria', 'categoria')
      .leftJoinAndSelect('servicos.agendas', 'agendas');

    try {
      const servicos = await queryBuilder.getMany();

      for (const servico of servicos) {
        const agendados = servico.agendas.filter(
          (agenda) => agenda.status === 'Agendado',
        ).length;
        const realizados = servico.agendas.filter(
          (agenda) => agenda.status === 'Realizado',
        ).length;
        const cancelados = servico.agendas.filter(
          (agenda) => agenda.status === 'Cancelado',
        ).length;

        allData.push([
          servico.nome,
          servico.preco,
          servico.categoria.nome,
          agendados,
          realizados,
          cancelados,
        ]);
      }
      console.log(allData);

      return await this.sheetsService.generateSheet(columns, allData);
    } catch (error) {
      throw new Error('Erro ao gerar o relatório de serviços');
    }
  }
}
