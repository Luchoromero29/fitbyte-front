import { Activity } from "../models";
import apiClient from "./axiosConfig";

export const reqGetActivitiesByRoutineId = async (
    routineId: string
  ): Promise<Array<Activity>> => {
    try {
      const data = await apiClient
        .get(`/api/activity/routine/${routineId}`)
        .then((response) => response.data);
  
      return data;
    } catch {
      throw new Error(error.message || "Error de conexion para traer los planes");
    }
  };