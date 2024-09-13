import { CreateSerie, Serie } from "../models";
import apiClient from "./axiosConfig";
import axios from 'axios';

export const reqGetSeriesByActivityId = async (
  id: number
): Promise<Array<Serie>> => {
  try {
    const response = await apiClient.get<{ ok: boolean; status: number; body: Array<Serie> }>(`/api/serie/activity/${id}`);
    const data = response.data;

    if (data.ok) {
      return data.body;
    }

    throw new Error("No se encontraron series para la actividad.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al obtener las series");
    } else {
      throw new Error( "Error inesperado al obtener las series");
    }
  }
};

export const reqCreateSerie = async (
  serie: CreateSerie
): Promise<Serie> => {
  try {
    const response = await apiClient.post<{ ok: boolean; status: number; body: Serie }>(`/api/serie`, serie);
    const data = response.data;

    if (data.ok) {
      return data.body;
    }

    throw new Error("Error al crear la serie.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al crear la serie");
    } else {
      throw new Error("Error inesperado al crear la serie");
    }
  }
};

export const reqUpdateSerie = async (
  serie: Serie
): Promise<Serie> => {
  try {
    const response = await apiClient.put<{ ok: boolean; status: number; body: Serie }>(`/api/serie/${serie.id}`, serie);
    const data = response.data;

    if (data.ok) {
      return data.body;
    }

    throw new Error("Error al actualizar la serie.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al actualizar la serie");
    } else {
      throw new Error( "Error inesperado al actualizar la serie");
    }
  }
};

export const reqDeleteSerie = async (
  id: number
): Promise<{ ok: boolean; status: number }> => {
  try {
    const response = await apiClient.delete<{ ok: boolean; status: number }>(`/api/serie/${id}`);
    const data = response.data;

    if (data.ok) {
      return data;
    }

    throw new Error("Error al eliminar la serie.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al eliminar la serie");
    } else {
      throw new Error("Error inesperado al eliminar la serie");
    }
  }
};
