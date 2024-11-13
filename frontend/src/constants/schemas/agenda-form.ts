import { CreateAgendaForm } from '@/types/agenda';
import * as yup from 'yup';

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

export const agendaSchema: yup.ObjectSchema<CreateAgendaForm> = yup.object({
  id: yup.number(),
  id_servico: yup.number().required('Serviço é obrigatório'),
  id_cliente: yup.number().required('Cliente é obrigatório'),
  observacao: yup.string().required('Descrição é obrigatória'),
  data: yup.string().required('Data é obrigatória'),
  status: yup.string().required('Status é obrigatório'),
  data_pagamento: yup.string().required('Data de pagamento é obrigatória'),
  percent_desconto: yup.number().required('Desconto é obrigatório'),
  horario_inicio: yup
    .string()
    .required('Horário de início é obrigatório')
    .matches(timeRegex, 'Formato inválido. Use HH:mm:ss'),
  horario_fim: yup
    .string()
    .required('Horário de fim é obrigatório')
    .matches(timeRegex, 'Formato inválido. Use HH:mm:ss')
    .test(
      'horario-maior', 
      'Horário de fim deve ser maior que o de início',
      function(horario_fim) {
        const inicio = this.parent.horario_inicio?.split(':') || [];
        const fim = horario_fim?.split(':') || [];
        
        if (inicio.length < 2 || fim.length < 2) return true;
        
        const inicioMinutos = parseInt(inicio[0]) * 60 + parseInt(inicio[1]);
        const fimMinutos = parseInt(fim[0]) * 60 + parseInt(fim[1]);
        
        return fimMinutos > inicioMinutos;
      }
    ),
});
