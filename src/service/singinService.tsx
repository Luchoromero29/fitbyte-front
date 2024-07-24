
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