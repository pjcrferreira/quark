import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Dashboard } from './components/dashboard';
import { Transactions } from './components/transactions';
import { Transfer } from './components/transfer';
import { CreditMarketplace } from './components/credit-marketplace';
import { InvestmentDashboard } from './components/investment-dashboard';
import { Navigation } from './components/navigation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import { useAuth } from './context/AuthContext';
import { JSX } from 'react';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

export default function App() {
  return (
    <div 
      className="min-h-screen pb-20"
      style={{
        background: 'linear-gradient(135deg, #4E5283 0%, #7871AA 50%, #AA9FB1 100%)'
      }}
    >
      <div className="container mx-auto px-4 py-6 max-w-md">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
          <Route path="/transfer" element={<PrivateRoute><Transfer /></PrivateRoute>} />
          <Route path="/credit" element={<PrivateRoute><CreditMarketplace /></PrivateRoute>} />
          <Route path="/investment" element={<PrivateRoute><InvestmentDashboard /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
      <Navigation />
    </div>
  );
}