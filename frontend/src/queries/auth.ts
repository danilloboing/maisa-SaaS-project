import api from "@/services/api";
import { API_URL } from "@/constants/env";
import { LoginData } from "@/types/auth";

export async function loginQuerie(data: LoginData) {
  try {
    const response = await api.post(`${API_URL}/auth/login`, data);

    return response.data.result;
  } catch (error) {
    return error;
  }
}

export function getUserToken() {
  try {
    const token = localStorage.getItem('token');

    if (token) return token;

    return null;
  } catch (error) {
    return error;
  }
}

export function removeUserInfos() {
  try {
    localStorage.clear();
  } catch (error) {
    return error;
  }
}
