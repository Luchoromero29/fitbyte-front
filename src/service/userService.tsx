import { User } from "../models";
import apiClient from "./axiosConfig"


export const reqUpdateUserId = async (user: any): Promise<User> => {
    try {
        const data = await apiClient
            .put(`/api/users/${user.id}`, user)
            .then((response) => response.data)
            
            return data;

    } catch (error) {
        throw new Error(error.message || "Error de conexion para actuializar usuario ");
    }
}

export const reqSetPreferenceId = async  (userId: number, preferenceId: number): Promise<User> => {
    try {
        const data = await  apiClient
            .put(`/api/users/preference/${userId}`, {preferenceId: preferenceId})
            .then((response) => response.data)

            return data;    

    } catch (error) {
        throw new Error(error.message || "Error de conexion para setear preference");
    }
}

export const reqGetUserById = async  (id: number): Promise<User> => {
    try {
        const data = await  apiClient
        .get(`/api/users/${id}`)
        .then((response) => response.data)

        return data;

    } catch (error) {
        throw new Error(error.message || "Error de conexion para traer el usuario");
    }
}
