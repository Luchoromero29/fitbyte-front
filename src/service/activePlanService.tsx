import { ActivePlan, Plan } from "../models";
import apiClient from "./axiosConfig";
import axios from 'axios';

export const reqGetActivePlanByUserId = async (
  userId: number
): Promise<Plan > => {
  try {
    const response = await apiClient.get<{ ok: boolean; status: number; body: Plan }>(
      `/api/activePlan/user/${userId}`
    );

    if (response.data.ok && response.data.body) {
      return response.data.body;
    }

    throw new Error("No se encontró un plan activo para el usuario.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al obtener el plan activo");
    } else {
      throw new Error("Error inesperado al obtener el plan activo");
    }
  }
};

export const reqCreateActivePlan = async (
  planId: number,
  userId: number
): Promise<ActivePlan> => {
  try {
    const response = await apiClient.post<{ ok: boolean; status: number; body: ActivePlan }>(
      `/api/activePlan`,
      { planId, userId }
    );

    if (response.data.ok && response.data.body) {
      return response.data.body;
    }

    throw new Error("Error al establecer el plan activo.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al establecer el plan activo");
    } else {
      throw new Error("Error inesperado al establecer el plan activo");
    }
  }
};

export const reqUpdateActivePlan = async (
  id: number,
  planId: number = 0
): Promise<ActivePlan> => {
  try {

    
    const response = await apiClient.put<{ ok: boolean; status: number; body: ActivePlan }>(
      `/api/activePlan/${id}`,
      { planId }
    );
    
    if (response.data.ok && response.data.body) {
      return response.data.body;
    }

    throw new Error("Error al actualizar el plan activo.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al actualizar el plan activo");
    } else {
      throw new Error("Error inesperado al actualizar el plan activo");
    }
  }
};

export const reqUpdateActivePlanByUserId = async (
  userId: number,
  planId: number
): Promise<ActivePlan> => {
  try {

    
    const response = await apiClient.put<{ ok: boolean; status: number; body: ActivePlan }>(
      `/api/activePlan/user/${userId}`,
      { planId }
    );
    
    if (response.data.ok && response.data.body) {
      return response.data.body;
    }

    throw new Error("Error al actualizar el plan activo.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al actualizar el plan activo");
    } else {
      throw new Error("Error inesperado al actualizar el plan activo");
    }
  }
};

export const reqDeleteActivePlan = async (id: number): Promise<string> => {
  try {
    const response = await apiClient.delete<{ ok: boolean; status: number; message: string }>(
      `/api/activePlan/${id}`
    );

    if (!response.data.ok) {
      return Promise.reject("Error al eliminar el plan activo.");
    }

    return response.data.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error de conexión al eliminar el plan activo");
    } else {
      throw new Error("Error inesperado al eliminar el plan activo");
    }
  }
};
