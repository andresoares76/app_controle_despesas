import axios from 'axios';

// Criação do cliente axios
const api = axios.create({
  baseURL: 'http://localhost:3001', // Apontando para o seu backend
});

// Interceptor para enviar o token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para capturar 401 e forçar logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/'; // Redireciona para login
    }
    return Promise.reject(error);
  }
);

export default api;
