import api from './api';

export const transactionService = {
  history: (params?: any) => api.get('/transaction/history', { params }),
};
