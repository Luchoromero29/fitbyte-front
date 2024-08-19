import { Routine } from "../models";
import { Day } from "../models/types";
import apiClient from "./axiosConfig";

export const reqGetAllRoutinesByPlanId = async (
  planId: string
): Promise<Array<Routine> | null> => {
  try {
    const data = await apiClient
      .get(`/api/routine/plan/${planId}`)
      .then((response) => response.data);

      if (!data) {

        return null;
      }
      return data;
  } catch (error) {
    throw new Error(error.message || "Error de conexion para traer los planes");
  }
};

export const reqGetRoutineById = async (
  id: string
): Promise<Routine | null> => {
  try {
    const response = await apiClient.get(`/api/routine/${id}`);
    const data = response.data;
    if (!data) {

      return null;
    }
    return data;
  } catch (error) {

    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error(error.message || "Error de conexión para traer los planes");
  }
};


export const reqCreateRoutine = async (
  planId: string,
  name: string,
  day: Day
): Promise<Response> => {
  try {
    const data = await apiClient
    .post(`/api/routine`, {planId, name, day})
    .then((response) => response.data);

    return data;
  } catch (error) {
    // Manejo de errores de la red u otros errores
    throw new Error(error.message || "Error de conexion para crear la rutina");
  }
};

export const reqUpdateRoutine = async (
  routine: Routine
): Promise<Response> => {
  try {
    const data = await apiClient
    .put(`/api/routine/${routine.id}`, routine)
    .then((response) => response.data);

    return data;
  } catch (error) {
    // Manejo de errores de la red u otros errores
    throw new Error(error.message || "Error de conexion para crear la rutina");
  }
};

export const reqDeleteRoutine = async (
  id: number
): Promise<Response> => {
  try {
    const data = await apiClient
    .delete(`/api/routine/${id}`)
    .then((response) => response.data);

    return data;
  } catch (error) {
    // Manejo de errores de la red u otros errores
    throw new Error(error.message || "Error de conexion para crear la rutina");
  }
}