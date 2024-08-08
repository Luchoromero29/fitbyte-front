import { API_BACK } from "./Config.tsx";

export const reqCreatePlan = async (userId: number, name: string, description: string): Promise<Response> => {
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
        userId
      })
    });

    // Verifica si la respuesta no es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear el plan');
    }

    return response;
  } catch (error) {
    // Manejo de errores de la red u otros errores
    throw new Error(error.message || 'Error de conexion para crear el plan');
  }
};

export const reqGetAllPlans = async (): Promise<Response> => {
    try {
      const response = await fetch(`${API_BACK}/api/plan`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      // Verifica si la respuesta no es exitosa
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al traer los planes');
      }
  
      return response;
    } catch (error) {
      // Manejo de errores de la red u otros errores
      throw new Error(error.message || 'Error de conexion para traer los planes');
    }
  };
