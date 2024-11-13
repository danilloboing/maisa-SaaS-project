import api from '@/services/api';

export async function getAgendaQuerie() {
  try {
    const response = await api.get('/agenda');
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createAgendaQuerie(data: any) {
  try {
    const response = await api.post('/agenda', data);
    return response.data.result;
  } catch (error) {
    throw error;
  }
}

export async function updateAgendaQuerie(data: any) {
  try {
    const response = await api.patch(`/agenda/${data.id}`, data);
    return response.data.result;
  } catch (error) {
    throw error;
  }
}

export async function inactiveAgendaQuerie(id: number) {
  try {
    const response = await api.delete(`/agenda/${id}`);
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
