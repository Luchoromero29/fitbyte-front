import { Plan } from "../models/entities.ts";
import apiClient from "./axiosConfig.tsx";
import axios from 'axios';

export const reqCreatePlan = async (
  userId: number,
  name: string,
  description: string
): Promise<Plan> => {
  try {
    const response = await apiClient.post<{ ok: boolean; status: number; body: Plan }>('/api/plan', {
      name,
      description,
      userId,
    });

    if (response.data.ok && response.data.body) {
      return response.data.body;
    }

    throw new Error("Error al crear el plan.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al crear el plan");
    } else {
      throw new Error("Error inesperado al crear el plan");
    }
  }
};

export const reqGetPlanById = async (id: number): Promise<Plan> => {
  try {
    const response = await apiClient.get<{ ok: boolean; status: number; body: Plan }>(`/api/plan/${id}`);

    if (response.data.ok && response.data.body) {
      return response.data.body;
    }

    throw new Error("No se encontró el plan.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al mostrar el plan");
    } else {
      throw new Error("Error inesperado al mostrar el plan");
    }
  }
};

export const reqGetAllPlansByUserId = async (
  userId: number
): Promise<Array<Plan>> => {
  try {
    const response = await apiClient.get<{ ok: boolean; status: number; body: Array<Plan> }>(`/api/plan/user/${userId}`);

    if (response.data.ok && response.data.body) {
      return response.data.body;
    }

    throw new Error("No se encontraron planes para el usuario.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al mostrar el plan");
    } else {
      throw new Error("Error inesperado al mostrar el plan");
    }
  }
};

export const reqUpdatePlan = async (plan: Plan): Promise<Plan> => {
  try {
    const response = await apiClient.put<{ ok: boolean; status: number; body: Plan }>(`/api/plan/${plan.id}`, plan);

    if (response.data.ok && response.data.body) {
      return response.data.body;
    }

    throw new Error("Error al actualizar el plan.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al actualizar el plan");
    } else {
      throw new Error("Error inesperado al actualizar el plan");
    }
  }
};

export const reqDeletePlan = async (id: number): Promise<{ ok: boolean; status: number }> => {
  try {
    const response = await apiClient.delete<{ ok: boolean; status: number }>(`/api/plan/${id}`);
    
    if (response.data.ok) {
      return response.data;
    }

    throw new Error("Error al eliminar el plan.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al eliminar el plan");
    } else {
      throw new Error("Error inesperado al eliminar el plan");
    }
  }
};
