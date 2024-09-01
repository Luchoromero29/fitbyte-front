import { ActivePlan} from "../models";
import apiClient from "./axiosConfig";

export const reqGetActivePlanByUserId = async (
    userId: number
  ): Promise<ActivePlan> => {
    try {
      const data = await apiClient
        .get(`/api/activePlan/user/${userId}`)
        .then((response) => response.data);
  
      return data;
    } catch (error) {
      throw new Error(error.message || "Error de conexion para traer los planes");
    }
  };
