import { CreateServiceForm } from '@/types/services';
import * as yup from 'yup';

export const servicesSchema: yup.ObjectSchema<CreateServiceForm> = yup.object({
  id: yup.number(),
  nome: yup.string().required('Nome é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  preco: yup
    .number()
    .required('Preço é obrigatório'),
  categoriaServico: yup.number().required('Categoria é obrigatória'),
});
