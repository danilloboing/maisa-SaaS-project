import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from 'src/entities/customer.entity';
import { celularRegex } from 'src/utils/regex-celular';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    await this.checkIfHasActiveCustomer(createCustomerDto.email);

    if (!celularRegex.test(createCustomerDto.celular)) {
      throw new BadRequestException('Número de celular inválido');
    }

    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  findAll() {
    const customers = this.customerRepository.find();
    return customers;
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({
      where: { id: id },
    });

    if (!customer) {
      throw new BadRequestException('Cliente não encontrado');
    }

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    if (updateCustomerDto.email) {
      await this.checkIfHasActiveCustomer(updateCustomerDto.email);
    }

    const customer = await this.customerRepository.findOne({
      where: { id: id },
    });

    if (!customer) {
      throw new BadRequestException('Cliente não encontrado');
    }

    const updatedCustomer = await this.customerRepository
      .update(id, updateCustomerDto)
      .then(() => {
        return this.customerRepository.findOne({
          where: { id: id },
        });
      });

    return updatedCustomer;
  }

  private async checkIfHasActiveCustomer(email: string) {
    const customer = await this.customerRepository.findOne({
      where: { email: email, is_active: true },
    });

    if (customer) {
      throw new BadRequestException('Este E-mail já está em uso');
    }
  }
}
