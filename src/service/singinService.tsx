//const API_BACK = process.env.REACT_APP_API_BACK;
import { API_BACK } from "./Config.tsx";

export const reqLogout = async () => {

    try {
      const response = await fetch(`${API_BACK}/api/logout`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }
        });

        return response;
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al iniciar sesión" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

}

export const reqLogin = async (email: string | null , password: string | null): Promise<Response> => {

    try {
        const response = await fetch(`${API_BACK}/api/login`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          return response;
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error al iniciar sesión" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

}

export const reqVerifyAuth = async (): Promise<AuthResponse | null> => {
  try {
    const response = await fetch(`${API_BACK}/api/verify-auth`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      // Manejo específico para el error 401 Unauthorized
      return null; // O maneja de otra manera según sea necesario
    }

    if (!response.ok) {
      throw new Error("Failed to verify auth");
    }

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.message !== "Failed to verify auth") {
      console.error("Error verifying auth:", error);
    }
    return null;
  }
}


interface AuthResponse {
  token: string;
  user: any; // Define el tipo correcto basado en tu modelo de usuario
}