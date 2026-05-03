import axios from 'axios';
import type { AppDispatch } from '@/store/store';
import { resetAuth } from '@/store/auth-slice';
import { navigateTo } from '@/lib/navigation';

let dispatch: AppDispatch;
export const injectDispatch = (d: AppDispatch) => { dispatch = d; };

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
    withCredentials: true,
});

const AUTH_ENDPOINTS = ['/api/v1/auth/login', '/api/v1/auth/register', '/api/v1/auth/refresh-token'];

// Response interceptor: on 401, attempt one token refresh then retry
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isAuthEndpoint = AUTH_ENDPOINTS.some(ep => originalRequest.url?.includes(ep));

        // Only attempt refresh for non-auth endpoints, and only once
        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true;

            try {
                await apiClient.post('/api/v1/auth/refresh-token');
                return apiClient(originalRequest);
            } catch {
                // Refresh failed — reset auth state and let React Router redirect
                dispatch(resetAuth());
                navigateTo('/auth/login');
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
