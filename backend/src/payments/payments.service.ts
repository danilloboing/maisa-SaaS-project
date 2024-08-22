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

  async create(createPaymentDto: CreatePaymentDto) {
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

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = this.paymentRepository.create(updatePaymentDto);
    payment.id = id;
    return this.paymentRepository.save(payment);
  }
}
