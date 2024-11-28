import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { BearerTokenGuard } from 'src/guard/bearer-token.guard';

@Controller('agenda')
@UseGuards(BearerTokenGuard)
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  create(@Body() createAgendaDto: CreateAgendaDto) {
    return this.agendaService.create(createAgendaDto);
  }

  @Get()
  findAll() {
    return this.agendaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgendaDto: UpdateAgendaDto) {
    console.log('updateAgendaDto', updateAgendaDto);
    return this.agendaService.update(+id, updateAgendaDto);
  }
}
