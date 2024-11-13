import { useToast } from '@/hooks';
import { createAgendaQuerie, getAgendaQuerie, inactiveAgendaQuerie, updateAgendaQuerie } from '@/queries/agenda';
import { AgendaContextValues, AgendaType, CreateAgendaForm, UpdateAgendaForm } from '@/types/agenda';
import { ContextProps } from '@/types/context';
import { createContext, useState } from 'react';

export const AgendaContext = createContext<AgendaContextValues | null>(null);

export const AgendaContextProvider = ({ children }: ContextProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agendas, setAgendas] = useState<AgendaType[]>([]);

  const { successToast, errorToast } = useToast();

  const createAgenda = async (data: CreateAgendaForm) => {
    try {
      setIsLoading(true);
      await createAgendaQuerie(data);
      successToast('Agenda criada com sucesso');
      getAgenda();
    } catch (error) {
      errorToast('Erro ao criar agenda');
    } finally {
      setIsLoading(false);
    }
  };

  const inactiveAgenda = async (id: number) => {
    try {
      setIsLoading(true);
      await updateAgendaQuerie({id, is_deleted: true});
      successToast('Agenda excluída com sucesso');
      getAgenda();
    } catch (error) {
      errorToast('Erro ao excluir agenda');
    } finally {
      setIsLoading(false);
    }
  };

  const updateAgenda = async (data: UpdateAgendaForm) => {
    try {
      setIsLoading(true);
      await updateAgendaQuerie(data);
      successToast('Agenda criada com sucesso');
      getAgenda();
    } catch (error) {
      errorToast('Erro ao criar agenda');
    } finally {
      setIsLoading(false);
    }
  };

  const getAgenda = async () => {
    try {
      setIsLoading(true);
      const response = await getAgendaQuerie();
      setAgendas(response);
    } catch (error) {
      errorToast('Erro ao buscar clientes');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AgendaContext.Provider
      value={{
        agendas,
        isLoading,
        createAgenda,
        inactiveAgenda,
        updateAgenda,
        getAgenda,
      }}
    >
      {children}
    </AgendaContext.Provider>
  );
};
