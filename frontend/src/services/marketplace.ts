import api from './api';

export const marketplaceService = {
  createOffer: (payload: any) => api.post('/marketplace/offers', payload),
  acceptOffer: (offerId: string) => api.post(`/marketplace/accept-offer/${offerId}`),
  createSearch: (payload: any) => api.post('/marketplace/searches', payload),
  matches: (searchId: string) => api.get(`/marketplace/matches/${searchId}`),
};
