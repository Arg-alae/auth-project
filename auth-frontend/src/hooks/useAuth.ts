import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import type { AuthResponse, LoginData, RegisterData } from '../types/auth.types';

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const login = async (data: LoginData) => {
    setLoading(true);
    try {
      const res = await api.post<AuthResponse>('/auth/login', data);
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      toast.success('Connecté avec succès !');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      const res = await api.post<AuthResponse>('/auth/register', data);
      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      toast.success('Compte créé avec succès !');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erreur d inscription');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {}
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    toast.success('Déconnecté avec succès !');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  return { login, register, logout, loading };
}