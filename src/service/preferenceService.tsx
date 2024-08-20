import { CreatePreferenceUser, PreferenceUser } from "../models";
import apiClient from "./axiosConfig";

export const reqGetPreferenceByUserId = async (
    userId: number
  ): Promise<PreferenceUser> => {
    try {
      const data = await apiClient
        .get(`/api/preference/user/${userId}`)
        .then((response) => response.data);
  
      return data;
    } catch (error) {
      throw new Error(error.message || "Error de conexion para traer los planes");
    }
  };

  export const reqCreatePreference = async (
    preference: CreatePreferenceUser
  ): Promise<PreferenceUser> => {
    try {
      const data = await apiClient
        .post(`/api/preference`, preference)
        .then((response) => response.data);
  
      return data;
    } catch (error) {
      throw new Error(error.message || "Error de conexion para traer los planes");
    }
  };