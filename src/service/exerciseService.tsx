import { Exercise } from "../models/entities.ts";
import apiClient from "./axiosConfig.tsx";


export const reqGetAllExercise = async (): Promise<Array<Exercise>> => {
  try {
    const data = await apiClient
      .get(`/api/exercise`)
      .then((response) => response.data);

    // Verifica si la respuesta no es exitosa
    return data;
  } catch (error) {
    // Manejo de errores de la red u otros errores
    throw new Error(error.message || "Error al registrar el usuario");
  }
};
