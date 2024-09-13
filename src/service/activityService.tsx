import { Activity, CreateActivity } from "../models";
import apiClient from "./axiosConfig";
import axios from 'axios';

export const reqGetActivitiesByRoutineId = async (
  routineId: string
): Promise<Array<Activity>> => {
  try {
    const response = await apiClient.get<{ ok: boolean; status: number; body: Array<Activity> }>(`/api/activity/routine/${routineId}`);
    if (response.data.ok && response.data.body) {
      return response.data.body;
    }
    throw new Error("No se encontraron actividades para la rutina.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al obtener actividades");
    } else {
      throw new Error("Error inesperado al obtener actividades");
    }
  }
};

export const reqCreateActivity = async (
  activity: CreateActivity
): Promise<Activity> => {
  try {
    const response = await apiClient.post<{ ok: boolean; status: number; body: Activity }>('/api/activity', activity);
    if (response.data.ok && response.data.body) {
      return response.data.body;
    }
    throw new Error("Error al crear la actividad.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al crear la actividad");
    } else {
      throw new Error("Error inesperado al crear la actividad");
    }
  }
};

export const reqUpdateActivity = async (
  activity: Activity
): Promise<Activity> => {
  try {
    const response = await apiClient.put<{ ok: boolean; status: number; body: Activity }>(`/api/activity/${activity.id}`, activity);
    if (response.data.ok && response.data.body) {
      return response.data.body;
    }
    throw new Error("Error al actualizar la actividad.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al actualizar la actividad");
    } else {
      throw new Error("Error inesperado al actualizar la actividad");
    }
  }
};

export const reqDeleteActivity = async (
  id: number
): Promise<{ ok: boolean; status: number }> => {
  try {
    const response = await apiClient.delete<{ ok: boolean; status: number }>(`/api/activity/${id}`);
    if (response.data.ok) {
      return response.data;
    }
    throw new Error("Error al eliminar la actividad.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al eliminar la actividad");
    } else {
      throw new Error("Error inesperado al eliminar la actividad");
    }
  }
};
