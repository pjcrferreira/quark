import api from './api';

export const walletService = {
  getBalance: () => api.get('/wallet/balance'),
};
