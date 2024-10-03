import { Routine } from "../models";
import { Day } from "../models/types";
import apiClient from "./axiosConfig";
import axios from 'axios';

export const reqGetAllRoutinesByPlanId = async (
  planId: number
): Promise<Array<Routine> | null> => {
  try {
    const response = await apiClient.get<{ ok: boolean; status: number; body: Array<Routine> }>(`/api/routine/plan/${planId}`);
    const data = response.data;
    
    if (data.ok) {
      return data.body;
    }

    return null;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error de conexión para traer las rutinas');
    } else {
      throw new Error('Error inesperado al traer las rutinas');
    }
  }
};

export const reqGetRoutineById = async (
  id: string
): Promise<Routine> => {
  try {
    const response = await apiClient.get<{ ok: boolean; status: number; body: Routine }>(`/api/routine/${id}`);
    const data = response.data;

    if (data.ok) {
      return data.body;
    }

    throw new Error('Rutina no encontrada');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error de conexión para traer la rutina');
    } else {
      throw new Error('Error inesperado al traer la rutina');
    }
  }
};

export const reqCreateRoutine = async (
  planId: string,
  name: string,
  day: Day
): Promise<Routine> => {
  try {
    const response = await apiClient.post<{ ok: boolean; status: number; body: Routine }>(`/api/routine`, { planId, name, day });
    const data = response.data;

    if (data.ok) {
      return data.body;
    }

    throw new Error('Error al crear la rutina');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error de conexión para crear la rutina');
    } else {
      throw new Error('Error inesperado al crear la rutina');
    }
  }
};

export const reqUpdateRoutine = async (
  routine: Routine
): Promise<Routine> => {
  try {
    const response = await apiClient.put<{ ok: boolean; status: number; body: Routine }>(`/api/routine/${routine.id}`, routine);
    const data = response.data;

    if (data.ok) {
      return data.body;
    }

    throw new Error('Error al actualizar la rutina');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error de conexión para actualizar la rutina');
    } else {
      throw new Error('Error inesperado al actualizar la rutina');
    }
  }
};

export const reqDeleteRoutine = async (
  id: number
): Promise<{ ok: boolean; status: number }> => {
  try {
    const response = await apiClient.delete<{ ok: boolean; status: number }>(`/api/routine/${id}`);
    const data = response.data;

    if (data.ok) {
      return data;
    }

    throw new Error('Error al eliminar la rutina');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error de conexión para eliminar la rutina');
    } else {
      throw new Error('Error inesperado al eliminar la rutina');
    }
  }
};

export const reqGetRoutineFromActivePlanByUserId = async (id: number): Promise<Array<Routine>> => {
  try {
    const response = await apiClient.get<{ ok: boolean; status: number, body: Array<Routine> }>(`/api/routine/activeplan/${id}`);
    const data = response.data;

    
    if (data.ok) {
      return data.body;
    }

    throw new Error('Error al traer las rutinas');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error de conexión para traer las rutinas');
    } else {
      throw new Error('Error inesperado al traer las rutinas');
    }
  }
}

export const reqGetTimeForRoutine = async (id: number): Promise<number> => {
  try {
    const response = await apiClient.get<{ ok: boolean; status: number, body: number}>(`/api/routine/duration/${id}`);
    const data = response.data;

    
    if (data.ok) {
      return data.body;
    }

    throw new Error('Error al traer la rutina');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error de conexión para traer la rutina');
    } else {
      throw new Error('Error inesperado al traer la rutina');
    }
  }
}