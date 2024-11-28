import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from 'src/entities/payments.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  private calculateDiscount(valor: number, percentDesconto: number) {
    const valorDesconto = (valor * percentDesconto) / 100;
    const valorTotal = valor - valorDesconto;
    return { valorDesconto, valorTotal };
  }

  async create(createPaymentDto: CreatePaymentDto) {
    const { percent_desconto, valor } = createPaymentDto;

    if (valor !== undefined && percent_desconto !== undefined) {
      const { valorDesconto, valorTotal } = this.calculateDiscount(
        valor,
        percent_desconto,
      );
      createPaymentDto.valor_desconto = valorDesconto;
      createPaymentDto.valor_total = valorTotal;
    }

    const payment = this.paymentRepository.create(createPaymentDto);
    return await this.paymentRepository.save(payment);
  }

  async findAll() {
    return await this.paymentRepository
      .createQueryBuilder('pagamentos')
      .leftJoinAndSelect('pagamentos.agenda', 'agenda')
      .leftJoinAndSelect('agenda.cliente', 'cliente')
      .leftJoinAndSelect('agenda.servico', 'servico')
      .getMany();
  }

  async findOne(id: number) {
    const payment = await this.paymentRepository
      .createQueryBuilder('pagamentos')
      .leftJoinAndSelect('pagamentos.agenda', 'agenda')
      .leftJoinAndSelect('agenda.cliente', 'cliente')
      .leftJoinAndSelect('agenda.servico', 'servico')
      .where('pagamentos.id = :id', { id })
      .getOne();

    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }

    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const { percent_desconto, valor } = updatePaymentDto;

    if (valor !== undefined && percent_desconto !== undefined) {
      const { valorDesconto, valorTotal } = this.calculateDiscount(
        valor,
        percent_desconto,
      );
      updatePaymentDto.valor_desconto = valorDesconto;
      updatePaymentDto.valor_total = valorTotal;
    }

    const payment = this.paymentRepository.update(id, updatePaymentDto);

    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }

    return payment;
  }
}
