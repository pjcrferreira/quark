import React, { useEffect, useState } from 'react';
import { walletService } from '../services/wallet';

export default function WalletBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    walletService.getBalance()
      .then(r => setBalance(r.data?.balance ?? r.data?.saldo ?? null))
      .catch(()=> setBalance(null))
      .finally(()=> setLoading(false));
  }, []);

  if (loading) return <div>Carregando saldo...</div>;
  return <div>Saldo disponível: R$ {balance?.toFixed(2) ?? '—'}</div>;
}
