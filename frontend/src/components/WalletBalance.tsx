
import React, { useEffect, useState } from 'react';
import { walletService } from '../services/wallet';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export default function WalletBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    walletService.getBalance()
      .then(r => setBalance(r.data?.balance ?? r.data?.saldo ?? null))
      .catch(()=> setBalance(null))
      .finally(()=> setLoading(false));
  }, []);

  return (
    <Card style={{ backgroundColor: '#CCA7A2' }} className="border-none mb-4">
      <CardContent>
        <div className="text-3xl font-bold text-white">
          {loading ? 'Carregando...' : `R$ ${balance?.toFixed(2) ?? '—'}`}
        </div>
      </CardContent>
    </Card>
  );
}
