import React, { useEffect, useState } from 'react';
import { transactionService } from '../services/transactions';

export default function TransactionHistory() {
  const [txs, setTxs] = useState<any[]>([]);
  useEffect(() => {
    transactionService.history().then(r => setTxs(r.data || [])).catch(()=>setTxs([]));
  }, []);
  return (
    <div>
      <h3>Histórico</h3>
      <ul>
        {txs.map(tx => <li key={tx.transacao_id || tx.id}>{tx.timestamp_utc || tx.created_at} — {tx.tipo} — R$ {tx.valor}</li>)}
      </ul>
    </div>
  );
}
