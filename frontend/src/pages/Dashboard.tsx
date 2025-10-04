import React from 'react';
import WalletBalance from '../components/WalletBalance';
import TransactionHistory from '../components/TransactionHistory';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Dashboard</h2>
        <div>
          <span>{user?.nome_completo || user?.email}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <main>
        <WalletBalance />
        <TransactionHistory />
      </main>
    </div>
  );
}
