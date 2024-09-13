import apiClient from "./axiosConfig";
import { Exercise } from "../models/entities";
import axios from 'axios';

export const reqGetAllExercise = async (): Promise<Array<Exercise>> => {
  try {
    const response = await apiClient.get<{ ok: boolean; status: number; body: Array<Exercise> }>('/api/exercise');
    
    if (response.data.ok && response.data.body) {
      return response.data.body;
    }

    throw new Error("No se encontraron ejercicios.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al obtener los ejercicios");
    } else {
      throw new Error("Error inesperado al obtener los ejercicios");
    }
  }
};
