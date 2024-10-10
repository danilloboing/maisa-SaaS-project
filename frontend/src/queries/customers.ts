import api from '@/services/api';
import { CreateCustomerForm, UpdateCustomerForm } from '@/types/customers';

export async function getCustomersQuerie() {
  try {
    const response = await api.get('/customers');
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createCustomerQuerie(data: CreateCustomerForm) {
  try {
    const response = await api.post('/customers', data);
    return response.data.result;
  } catch (error: any) {
    throw error;
  }
}

export async function updateCustomerQuerie(data: UpdateCustomerForm) {
  try {
    const response = await api.patch(`/customers/${data.id}`, data);
    return response.data.result;
  } catch (error: any) {
    throw error;
  }
}

export async function inactiveCustomerQuerie(id: number) {
  try {
    const response = await api.delete(`/customers/${id}`);
    return response.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
