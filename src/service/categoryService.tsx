import apiClient from "./axiosConfig";
import { Category } from "../models";
import axios from 'axios';

export const reqGetCategoryById = async (id: number): Promise<Category> => {
  try {
    const response = await apiClient.get<{ ok: boolean; status: number; body: Category }>(`/api/category/${id}`);
    if (response.data.ok && response.data.body) {
      return response.data.body;
    }
    throw new Error("No se encontró la categoría.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al obtener la categoría");
    } else {
      throw new Error("Error inesperado al obtener la categoría");
    }
  }
};
