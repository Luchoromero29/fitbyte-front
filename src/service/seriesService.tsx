import { CreateSerie, Serie } from "../models";
import apiClient from "./axiosConfig";

export const reqGetSeriesByActivityId = async (
    id: number
  ): Promise<Array<Serie>> => {
    try {
      const data = await apiClient
        .get(`/api/serie/activity/${id}`)
        .then((response) => response.data);
  
      return data;
    } catch {
      throw new Error(error.message || "Error de conexion para traer los planes");
    }
  };

  export const reqCreateSerie = async (
    serie: CreateSerie
  ): Promise<Serie> => {
    try {
      const data = await apiClient
      .post(`/api/serie`, serie)
      .then((response) => response.data);
  
      return data;
    } catch (error) {
      // Manejo de errores de la red u otros errores
      throw new Error(error.message || "Error de conexion para crear la rutina");
    }
  };
  

  export const reqDeleteSerie = async (
    id: number
  ): Promise<Response> => {
    try {
      const data = await apiClient
      .delete(`/api/serie/${id}`)
      .then((response) => response.data);
  
      return data;
    } catch (error) {
      // Manejo de errores de la red u otros errores
      throw new Error(error.message || "Error de conexion para crear la rutina");
    }
  };
  