import { AgendaContext } from '@/contexts/AgendaContext';
import { AgendaContextValues } from '@/types/agenda';
import { useContext } from 'react';

export const useAgenda = () => {
  return useContext(AgendaContext) as AgendaContextValues;
};
