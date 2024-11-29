import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { format, addMonths, startOfMonth, endOfMonth } from 'date-fns';

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

  async getAgendaReportXlsx(dto: AgendaReportDto) {
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

  async getBalanceReportXlsx(dto: BalanceReportDto) {
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

  async getCustomersReportXlsx() {
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

  async getServicesReportXlsx() {
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

      return await this.sheetsService.generateSheet(columns, allData);
    } catch (error) {
      throw new Error('Erro ao gerar o relatório de serviços');
    }
  }

  async getDoneServicesReport() {
    try {
      // Primeiro, vamos buscar o range de datas (primeiro e último serviço)
      const dateRange = await this.agendaRepository
        .createQueryBuilder('agenda')
        .select([
          'MIN(agenda.data) as firstDate',
          'MAX(agenda.data) as lastDate',
        ])
        .where('agenda.status = :status', { status: 'Realizado' })
        .getRawOne();

      console.log(dateRange);
      if (!dateRange.firstDate || !dateRange.lastDate) {
        return [];
      }

      const currentDate = new Date();
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
      );

      const results = await this.agendaRepository
        .createQueryBuilder('agenda')
        .select([
          'DATE_FORMAT(agenda.data, "%Y-%m") as yearMonth',
          'COUNT(*) as total',
          'MAX(DATE_FORMAT(agenda.data, "%M %Y")) as monthYear',
        ])
        .where('agenda.status = :status', { status: 'Realizado' })
        .andWhere('agenda.data BETWEEN :startDate AND :endDate', {
          startDate: dateRange.firstDate,
          endDate,
        })
        .groupBy('yearMonth')
        .orderBy('yearMonth', 'ASC')
        .getRawMany();

      const formattedResults = this.fillMissingMonths(
        results,
        new Date(dateRange.firstDate),
        endDate,
      );

      return formattedResults;
    } catch (error) {
      throw new Error(
        'Erro ao buscar os serviços realizados: ' + error.message,
      );
    }
  }

  private fillMissingMonths(
    results: any[],
    startDate: Date,
    endDate: Date,
  ): any[] {
    const months: any[] = [];
    const current = new Date(startDate);
    const resultsMap = new Map(results.map((item) => [item.yearMonth, item]));

    while (current <= endDate) {
      const yearMonth = current.toISOString().slice(0, 7);
      const existingData = resultsMap.get(yearMonth);

      months.push({
        yearMonth,
        month: current.toLocaleString('pt-BR', {
          month: '2-digit',
          year: 'numeric',
        }),
        total: existingData ? parseInt(existingData.total) : 0,
      });

      current.setMonth(current.getMonth() + 1);
    }

    return months;
  }

  async getServicesByCategoryReport() {
    try {
      const results = await this.agendaRepository
        .createQueryBuilder('agenda')
        .select([
          'servico.nome as serviceName',
          'categoria.nome as categoryName',
          'COUNT(*) as total',
        ])
        .innerJoin('agenda.servico', 'servico')
        .innerJoin('servico.categoria', 'categoria')
        .where('agenda.status = :status', { status: 'Realizado' })
        .groupBy('servico.id, categoria.id_categoria')
        .orderBy('total', 'DESC')
        .getRawMany();

      return results.map((item) => ({
        service: item.serviceName,
        category: item.categoryName,
        total: parseInt(item.total, 10),
      }));
    } catch (error) {
      throw new Error(
        'Erro ao buscar os serviços por categoria: ' + error.message,
      );
    }
  }

  async getRevenueReport() {
    try {
      // Busca os pagamentos realizados e calcula o faturamento
      const results = await this.paymentRepository
        .createQueryBuilder('pagamentos')
        .select([
          'SUM(pagamentos.valor_total) as totalRevenue',
          'COUNT(pagamentos.id) as totalTransactions',
        ])
        .where('pagamentos.status = :status', { status: 'pago' })
        .getRawOne();

      return {
        totalRevenue: parseFloat(results.totalRevenue || 0),
        totalTransactions: parseInt(results.totalTransactions || 0, 10),
      };
    } catch (error) {
      throw new Error('Erro ao buscar o faturamento: ' + error.message);
    }
  }

  async getMonthlyRevenueReport() {
    try {
      const { firstDate, lastDate } = await this.paymentRepository
        .createQueryBuilder('pagamentos')
        .select([
          'MIN(pagamentos.data_pagamento) as firstDate',
          'MAX(pagamentos.data_pagamento) as lastDate',
        ])
        .where('pagamentos.status = :status', { status: 'pago' })
        .getRawOne();

      if (!firstDate || !lastDate) {
        return [];
      }

      const start = startOfMonth(new Date(firstDate));
      const end = endOfMonth(new Date(lastDate));

      const allMonths = [];
      let current = start;

      while (current <= end) {
        allMonths.push(format(current, 'yyyy-MM'));
        current = addMonths(current, 1);
      }

      const results = await this.paymentRepository
        .createQueryBuilder('pagamentos')
        .select([
          'DATE_FORMAT(pagamentos.data_pagamento, "%Y-%m") as month',
          'SUM(pagamentos.valor_total) as totalRevenue',
          'COUNT(pagamentos.id) as totalTransactions',
        ])
        .where('pagamentos.status = :status', { status: 'pago' })
        .groupBy('DATE_FORMAT(pagamentos.data_pagamento, "%Y-%m")')
        .orderBy('month', 'ASC')
        .getRawMany();

      const revenueMap = new Map(
        results.map((item) => [
          item.month,
          {
            totalRevenue: parseFloat(item.totalRevenue || 0),
            totalTransactions: parseInt(item.totalTransactions || 0, 10),
          },
        ]),
      );

      const finalResults = allMonths.map((month) => ({
        month,
        totalRevenue: revenueMap.get(month)?.totalRevenue || 0,
        totalTransactions: revenueMap.get(month)?.totalTransactions || 0,
      }));

      return finalResults;
    } catch (error) {
      throw new Error('Erro ao buscar o faturamento por mês: ' + error.message);
    }
  }

  async getServicesByStatusReport() {
    try {
      const results = await this.agendaRepository
        .createQueryBuilder('agenda')
        .select(['agenda.status as status', 'COUNT(*) as total'])
        .groupBy('agenda.status')
        .orderBy('total', 'DESC')
        .getRawMany();

      return results.map((item) => ({
        status: item.status,
        total: parseInt(item.total, 10),
      }));
    } catch (error) {
      throw new Error(
        'Erro ao buscar o relatório de serviços por status: ' + error.message,
      );
    }
  }
}
