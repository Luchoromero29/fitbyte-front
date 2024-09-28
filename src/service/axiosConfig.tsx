import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Reemplaza con la URL base de tu API
  //baseURL: 'https://42cxgwtl-3000.brs.devtunnels.ms/',
  timeout: 10000, // Tiempo máximo de espera para una solicitud
  headers: {
    'Content-Type': 'application/json',
    // Otros encabezados comunes pueden ir aquí
  },
  withCredentials: true,
});

export default apiClient;
