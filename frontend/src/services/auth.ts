import api from './api';

export type Credentials = { email: string; password: string };
export type RegisterPayload = { email: string; password: string; nome_completo?: string; tipo_entidade?: 'PF'|'PJ' };

export const authService = {
  register: (payload: RegisterPayload) => api.post('/auth/register', payload),
  login: (creds: Credentials) => api.post('/auth/login', creds),
  me: () => api.get('/user/profile'),
  startKyc: () => api.post('/user/kyc/start'),
  setToken: (token: string) => localStorage.setItem('quark:token', token),
  logout: () => localStorage.removeItem('quark:token'),
};
