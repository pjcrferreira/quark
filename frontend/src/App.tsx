import { useState } from 'react';
import { Dashboard } from './components/dashboard';
import { Transactions } from './components/transactions';
import { Transfer } from './components/transfer';
import { CreditMarketplace } from './components/credit-marketplace';
import { InvestmentDashboard } from './components/investment-dashboard';
import { Navigation } from './components/navigation';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'transfer':
        return <Transfer />;
      case 'credit':
        return <CreditMarketplace />;
      case 'investment':
        return <InvestmentDashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div 
      className="min-h-screen pb-20"
      style={{
        background: 'linear-gradient(135deg, #4E5283 0%, #7871AA 50%, #AA9FB1 100%)'
      }}
    >
      <div className="container mx-auto px-4 py-6 max-w-md">
        {renderSection()}
      </div>
      
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
    </div>
  );
}