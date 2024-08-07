import { API_BACK } from "./Config.tsx";

export const reqGetAllExercise = async (): Promise<Response> => {
  try {
    const response = await fetch(`${API_BACK}/api/exercise`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });

    // Verifica si la respuesta no es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al recuperar los ejercicios');
    }

    return response;
  } catch (error) {
    // Manejo de errores de la red u otros errores
    throw new Error(error.message || 'Error al registrar el usuario');
  }
};
