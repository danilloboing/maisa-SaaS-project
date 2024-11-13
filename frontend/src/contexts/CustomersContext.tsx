import { useToast } from '@/hooks';
import {
  createCustomerQuerie,
  getCustomersQuerie,
  updateCustomerQuerie,
} from '@/queries/customers';
import { ContextProps } from '@/types/context';
import {
  CreateCustomerForm,
  CustomersContextValues,
  CustomerType,
  UpdateCustomerForm,
} from '@/types/customers';
import { createContext, useState } from 'react';

export const CustomersContext = createContext<CustomersContextValues | null>(
  null
);

export function CustomersContextProvider({ children }: ContextProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  const { successToast, errorToast } = useToast();

  const createCustomer = async (data: CreateCustomerForm) => {
    try {
      setIsLoading(true);
      await createCustomerQuerie(data);
      successToast('Cliente criado com sucesso');
      getCustomers();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  const inactiveCustomer = async (id: number) => {
    try {
      await updateCustomerQuerie({ id, is_active: false });
      successToast('Cliente excluído com sucesso');
      getCustomers();
    } catch (error: any) {
      errorToast(error.response.data.message);
    }
  };

  const updateCustomer = async (data: UpdateCustomerForm) => {
    try {
      setIsLoading(true);
      await updateCustomerQuerie(data);
      successToast('Cliente atualizado com sucesso');
      getCustomers();
    } catch (error: any) {
      errorToast(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomers = async () => {
    try {
      setIsLoading(true);
      const response = await getCustomersQuerie();
      setCustomers(response);
    } catch (error) {
      errorToast('Erro ao buscar clientes');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomersContext.Provider
      value={{
        customers,
        isLoading,
        createCustomer,
        inactiveCustomer,
        updateCustomer,
        getCustomers,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
}
