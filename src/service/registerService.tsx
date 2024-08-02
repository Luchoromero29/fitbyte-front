import { API_BACK } from "./Config.tsx";
import { CreateUser } from "../models/index.ts";

export const reqRegister = async (user: CreateUser): Promise<Response> => {
  try {
    const response = await fetch(`${API_BACK}/api/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // Verifica si la respuesta no es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar el usuario');
    }

    return response;
  } catch (error) {
    // Manejo de errores de la red u otros errores
    throw new Error(error.message || 'Error al registrar el usuario');
  }
};
