import { PreferenceUser } from "../models";
import apiClient from "./axiosConfig";
import axios from 'axios';

export const reqGetPreferenceByUserId = async (
  userId: number
): Promise<PreferenceUser> => {
  try {
    const response = await apiClient.get<{ ok: boolean; status: number; body: PreferenceUser }>(`/api/preference/user/${userId}`);

    if (response.data.ok && response.data.body) {
      return response.data.body;
    }

    throw new Error("No se encontró la preferencia del usuario.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al obtener la preferencia del usuario");
    } else {
      throw new Error("Error inesperado al obtener la preferencia del usuario");
    }
  }
};

export const reqCreatePreference = async (
  userId: number
): Promise<PreferenceUser> => {
  try {
    const response = await apiClient.post<{ ok: boolean; status: number; body: PreferenceUser }>('/api/preference', userId);

    if (response.data.ok && response.data.body) {
      return response.data.body;
    }

    throw new Error("Error al crear la preferencia.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al crear la preferencia");
    } else {
      throw new Error("Error inesperado al crear la preferencia");
    }
  }
};

export const reqUpdatePreference = async (
  preference: PreferenceUser
): Promise<PreferenceUser> => {
  try {
    const response = await apiClient.put<{ ok: boolean; status: number; body: PreferenceUser }>(`/api/preference/${preference.id}`, preference);

    if (response.data.ok && response.data.body) {
      return response.data.body;
    }

    throw new Error("Error al actualizar la preferencia.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al actualizar la preferencia");
    } else {
      throw new Error("Error inesperado al actualizar la preferencia");
    }
  }
};
