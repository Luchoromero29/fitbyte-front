import { Routine } from "../models";
import { Day } from "../models/types";
import apiClient from "./axiosConfig";

export const reqGetAllRoutinesByPlanId = async (
  planId: string
): Promise<Array<Routine>> => {
  try {
    const data = await apiClient
      .get(`/api/routine/plan/${planId}`)
      .then((response) => response.data);

    return data;
  } catch {
    throw new Error(error.message || "Error de conexion para traer los planes");
  }
};

export const reqGetRoutineById = async (
  id: string
): Promise<Routine> => {
  try {
    const data = await apiClient
      .get(`/api/routine/${id}`)
      .then((response) => response.data);

    return data;
  } catch {
    throw new Error(error.message || "Error de conexion para traer los planes");
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
