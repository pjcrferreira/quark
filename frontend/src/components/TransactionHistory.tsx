
import React, { useEffect, useState } from 'react';
import { transactionService } from '../services/transactions';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

export default function TransactionHistory() {
  const [txs, setTxs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    transactionService.history().then(r => setTxs(r.data || [])).catch(()=>setTxs([])).finally(()=>setLoading(false));
  }, []);
  return (
    <Card style={{ backgroundColor: '#AA9FB1' }} className="border-none mb-4">
      <CardContent>
        {loading ? (
          <div className="text-white/80">Carregando...</div>
        ) : txs.length === 0 ? (
          <div className="text-white/80">Nenhuma transação encontrada.</div>
        ) : (
          <ul className="text-white/90 text-sm space-y-1">
            {txs.map(tx => (
              <li key={tx.transacao_id || tx.id} className="flex justify-between border-b border-white/10 py-1">
                <span>{tx.timestamp_utc?.slice(0,10) || tx.created_at?.slice(0,10)}</span>
                <span>{tx.tipo}</span>
                <span>R$ {tx.valor}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
