import api from './api';

export const loanService = {
  myLoans: () => api.get('/loan/my-loans'),
  installments: (loanId: string) => api.get(`/loan/${loanId}/installments`),
  payInstallment: (loanId: string, payload: any) => api.post(`/loan/${loanId}/pay-installment`, payload),
};
