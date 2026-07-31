import axios from 'axios';

const axiosClient = axios.create({ 
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000
});

// interceptor general de manejo de errores 
axiosClient.interceptors.response.use(
    response => response,
    error => {
        console.error('Error en respuesta de API:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export { axiosClient };