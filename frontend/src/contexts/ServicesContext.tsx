import { useToast } from '@/hooks';
import { createServiceQuerie, getServicesQuerie, updateServiceQuerie } from '@/queries/services';
import { ContextProps } from '@/types/context';
import {
  ServicesContextValues,
  ServiceType,
  CreateServiceForm,
  UpdateServiceForm,
} from '@/types/services';
import { createContext, useCallback, useState } from 'react';

export const ServicesContext = createContext<ServicesContextValues | null>(
  null
);

export function ServicesContextProvider({ children }: ContextProps) {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { successToast, errorToast } = useToast();

  async function createService(data: CreateServiceForm) {
    try {
      setIsLoading(true);
      await createServiceQuerie(data);
      successToast('Serviço criado com sucesso');
      getServices();

    } catch (error) {
      console.error(error);
      errorToast('Erro ao criar serviço');
    } finally {
      setIsLoading(false);
    }
  }

  async function inactiveService(id: number) {
    try {
      await updateServiceQuerie({
        id: id,
        is_active: false
      })
      successToast('Serviço excluído com sucesso');
      getServices();
    } catch (error) {
      errorToast('Erro ao excluir um serviço')
    }
  }

  async function updateService(data: UpdateServiceForm) {
    try{
      setIsLoading(true);
      await updateServiceQuerie(data);
      successToast('Serviço atualizado com sucesso');
      getServices();
    } catch {
      errorToast('Erro ao editar o serviço')
    } finally {
      setIsLoading(false);
    }
  }

  const getServices = useCallback(async () => {
    try {
      const response = await getServicesQuerie();

      setServices(response);
    } catch (error) {
      console.error(error);
      errorToast('Erro ao buscar serviços');
  }
}, [services]);

  return (
    <ServicesContext.Provider
      value={{
        services,
        isLoading,
        createService,
        inactiveService,
        updateService,
        getServices,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}
