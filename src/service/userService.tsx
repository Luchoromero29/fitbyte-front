import { User } from "../models";
import apiClient from "./axiosConfig"


export const reqUpdateUserId = (user: User): Promise<User> => {
    try {
        const data = apiClient
            .put(`/api/users/${user.id}`, user)
            .then((response) => response.data)

            return data;

    } catch (error) {
        throw new Error(error.message || "Error de conexion para traer los planes");
    }
}

export const reqSetPreferenceId = (userId: number, preferenceId: number): Promise<User> => {
    try {
        const data = apiClient
            .put(`/api/users/preference/${userId}`, {preferenceId: preferenceId})
            .then((response) => response.data)

            return data;    

    } catch (error) {
        throw new Error(error.message || "Error de conexion para traer los planes");
    }
}