import { CreateUser, User } from "../models/index.ts";
import apiClient from "./axiosConfig";
import axios from 'axios';

export const reqRegister = async (user: CreateUser): Promise<User | string> => {
  try {
    console.log("si");
    
    const response = await apiClient.post<{ ok: boolean; status: number; body: unknown }>('/api/users', user);
    console.log(response);
    
    if (response.data.ok) {
      return response.data.body as User;
    }

    throw new Error( 'Error al registrar el usuario');
  } catch (error: unknown) {
    
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.body.message || 'Error de conexión al registrar el usuario');
    } else {
      throw new Error("Fallo al registrar usuario");
    }
  }
};
