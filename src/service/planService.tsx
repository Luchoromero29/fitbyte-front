import { Plan } from "../models/entities.ts";
import apiClient from "./axiosConfig.tsx";
import { API_BACK } from "./Config.tsx";

export const reqCreatePlan = async (
  userId: number,
  name: string,
  description: string
): Promise<Response> => {
  try {
    const response = await fetch(`${API_BACK}/api/plan`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        userId,
      }),
    });

    // Verifica si la respuesta no es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear el plan");
    }

    return response;
  } catch (error) {
    // Manejo de errores de la red u otros errores
    throw new Error(error.message || "Error de conexion para crear el plan");
  }
};

export const reqGetAllPlansByUserId = async (
  userId: number
): Promise<Response> => {
  try {
    const response = await fetch(`${API_BACK}/api/plan/user/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verifica si la respuesta no es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al traer los planes");
    }

    return response;
  } catch (error) {
    // Manejo de errores de la red u otros errores
    throw new Error(error.message || "Error de conexion para traer los planes");
  }
};

export const reqUpdatePlan = async (
  plan: Plan
): Promise<Response> => {
  try {
    const response = apiClient
    .put(`/api/plan/${plan.id}`, plan)
    .then((response) => response.data);

    return response;
  } catch (error) {
    // Manejo de errores de la red u otros errores
    throw new Error(error.message || "Error de conexion para actualizar el plan");
  }
}

export const reqDeletePlan = async (id: number): Promise<any> => {
  try {
    const response = await apiClient.delete(`/api/plan/${id}`);
    return response.data;
  } catch (error) {
    // Manejo de errores de la red u otros errores
    throw new Error(error.message || "Error de conexión al eliminar el plan");
  }
};
