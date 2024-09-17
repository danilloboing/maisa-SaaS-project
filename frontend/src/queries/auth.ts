import api from "@/services/api";
import { API_URL } from "@/constants/env";
import { LoginData, UserInfo } from "@/types/auth";

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

export async function getInfoUser(): Promise<UserInfo | null>{
  try {
    const result = await localStorage.getItem('user')

    if (result) {
      return await JSON.parse(result)
    }

    return null
  } catch (error) {
    return null;
  }
}
