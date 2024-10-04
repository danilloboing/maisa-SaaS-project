import api from "@/services/api";
import { CreateServiceForm, UpdateServiceForm } from "@/types/services";

const servicesPath = '/services';

export async function getServicesQuerie() {
    try {
        const response = await api.get(servicesPath);
        return response.data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createServiceQuerie(data: CreateServiceForm) {
    try {
        const response = await api.post(servicesPath, data);
        return response.data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function updateServiceQuerie(data: UpdateServiceForm) {
    console.log(data);
    try {
        const response = await api.patch(`${servicesPath}/${data.id}`, data);
        return response.data.result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}