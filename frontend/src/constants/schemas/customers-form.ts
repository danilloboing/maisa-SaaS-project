import { CreateCustomerForm } from '@/types/customers';
import * as yup from 'yup';

export const customersSchema: yup.ObjectSchema<CreateCustomerForm> = yup.object(
  {
    id: yup.number(),
    nome: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    endereco: yup.string().required('Endereço é obrigatório'),
    celular: yup
      .string()
      .required('Celular é obrigatório')
      .min(15, 'Celular inválido')
      .max(15, 'Celular inválido'),
  }
);
