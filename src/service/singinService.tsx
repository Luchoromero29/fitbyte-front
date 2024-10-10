
import { AuthResponse, ResponseLogin } from "../models";
import apiClient from "./axiosConfig";



export const reqLogout = async (): Promise<void> => {
  try {
    const response = await apiClient.post<{ ok: boolean; status: number }>('/api/logout', {}, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // En lugar de 'credentials: "include"'
    });

    if (!response.data.ok) {
      throw new Error("Error al cerrar sesión");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error en la solicitud de cierre de sesión:", error.message);
    } else {
      console.error("Error inesperado en la solicitud de cierre de sesión");
    }
  }
};

export const reqLogin = async (email: string | null, password: string | null): Promise<ResponseLogin> => {
  try {
    const response: ResponseLogin = await apiClient.post<ResponseLogin>('/api/login', { email, password }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((response) => { return response.data; });

    
    if (!response) {
      throw new Error("Error al iniciar sesión");
    }

    return response; // Devuelve el token si la respuesta es exitosa
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error en la solicitud de inicio de sesión:", error.message);
      throw new Error(error.message || "Error al iniciar sesión");
    } else {
      throw new Error("Error inesperado al iniciar sesión");
    }
  }
};

// interface VerifyAuthResponse {
//   token: string;
//   data: {
//     exp: number; // La fecha de expiración del token en formato Unix timestamp
//     iat: number; // La fecha de creación del token en formato Unix timestamp
//     user: User; // Define el tipo correcto basado en tu modelo de usuario
//   }
// }



export const reqVerifyAuth = async (): Promise<AuthResponse | null> => {
  try {
    console.log("aca llega joya");
    
    const response = await apiClient.get<AuthResponse>('/api/verify-auth', {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // En lugar de 'credentials: "include"'
    });

    

    if (response.status === 401) {
      // Manejo específico para el error 401 Unauthorized
      return null; // O maneja de otra manera según sea necesario
    }

    if (!response.data) {
      throw new Error("Failed to verify auth");
    }

    
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error al verificar la autenticación:", error.message);
    } else {
      console.error("Error inesperado al verificar la autenticación");
    }
    return null;
  }
};