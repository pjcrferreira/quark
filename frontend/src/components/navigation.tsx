import { Button } from "./ui/button";
import { Home, CreditCard, TrendingUp, Receipt, Send } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const sections = [
    { id: '/dashboard', label: 'Carteira', icon: Home },
    { id: '/transfer', label: 'PIX', icon: Send },
    { id: '/transactions', label: 'Extrato', icon: Receipt },
    { id: '/credit', label: 'Crédito', icon: CreditCard },
    { id: '/investment', label: 'Investir', icon: TrendingUp },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-white/20 px-4 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = location.pathname === section.id;
          return (
            <Button
              key={section.id}
              variant="ghost"
              size="sm"
              className={`flex-col gap-1 h-auto py-2 px-3 ${
                isActive 
                  ? 'text-[#4E5283]' 
                  : 'text-gray-600 hover:text-[#4E5283]'
              }`}
              onClick={() => navigate(section.id)}
            >
              <Icon size={20} />
              <span className="text-xs">{section.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}