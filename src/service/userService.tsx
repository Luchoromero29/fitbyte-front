import { User } from "../models";
import apiClient from "./axiosConfig";

export const reqUpdateUserId = async (user: User): Promise<User> => {
  try {
    const response = await apiClient.put<User>(`/api/users/${user.id}`, user);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error de conexión para actualizar el usuario");
    } else {
      throw new Error("Error desconocido al actualizar el usuario");
    }
  }
};

export const reqSetPreferenceId = async (userId: number, preferenceId: number): Promise<User> => {
  try {
    const response = await apiClient.put<User>(`/api/users/preference/${userId}`, { preferenceId });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error de conexión para establecer la preferencia");
    } else {
      throw new Error("Error desconocido al establecer la preferencia");
    }
  }
};

export const reqGetUserById = async (id: number): Promise<User> => {
  try {
    const response = await apiClient.get(`/api/users/${id}`).then((res) => res.data);
    console.log(response);
    
    return response.body as User;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Error de conexión para traer el usuario");
    } else {
      throw new Error("Error desconocido al traer el usuario");
    }
  }
};
