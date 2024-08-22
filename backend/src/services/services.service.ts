import { Service } from 'src/entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const service = this.serviceRepository.create(createServiceDto);
    return await this.serviceRepository.save(service);
  }

  async findAll() {
    const services = await this.serviceRepository.find({
      relations: ['categoria'],
    });

    return services;
  }

  async findOne(id: number) {
    const service = await this.serviceRepository.findOne({
      where: { id: id },
      relations: ['categoria'],
    });

    if (!service) {
      throw new Error('Serviço não encontrado');
    }

    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.serviceRepository.findOne({
      where: { id: id },
    });

    if (!service) {
      throw new Error('Serviço não encontrado');
    }

    const updatedService = await this.serviceRepository
      .update(id, updateServiceDto)
      .then(() => {
        return this.serviceRepository.findOne({ where: { id: id } });
      });

    return updatedService;
  }
}
