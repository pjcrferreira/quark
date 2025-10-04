import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Search, Filter, Eye, ArrowUpRight, ArrowDownLeft, CreditCard } from "lucide-react";
import { useState } from "react";

export function Transactions() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  const transactions = [
    { 
      id: "TX001", 
      description: "Transferência P2P - @miguel123", 
      amount: "R$ 250,00", 
      type: "p2p_sent", 
      date: "Hoje", 
      timestamp: "2024-01-15T14:30:25Z",
      status: "confirmed"
    },
    { 
      id: "TX002", 
      description: "Empréstimo Recebido - Banco Digital", 
      amount: "R$ 5.000,00", 
      type: "loan_received", 
      date: "Ontem", 
      timestamp: "2024-01-14T09:15:42Z",
      status: "confirmed"
    },
    { 
      id: "TX003", 
      description: "Pagamento Parcela #1 - Banco Digital", 
      amount: "R$ 458,33", 
      type: "loan_payment", 
      date: "2 dias", 
      timestamp: "2024-01-13T16:45:18Z",
      status: "confirmed"
    },
    { 
      id: "TX004", 
      description: "Transferência P2P - @ana_silva", 
      amount: "R$ 89,00", 
      type: "p2p_received", 
      date: "3 dias", 
      timestamp: "2024-01-12T11:22:33Z",
      status: "confirmed"
    },
    { 
      id: "TX005", 
      description: "Pagamento Parcela #2 - Fintech Alpha", 
      amount: "R$ 195,67", 
      type: "loan_payment", 
      date: "5 dias", 
      timestamp: "2024-01-10T08:30:15Z",
      status: "confirmed"
    },
  ];

  const filterTypes = [
    { id: "all", label: "TODAS", icon: null },
    { id: "p2p", label: "P2P", icon: ArrowUpRight },
    { id: "loan", label: "EMPRÉSTIMOS", icon: CreditCard },
    { id: "payment", label: "PAGAMENTOS", icon: ArrowDownLeft },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "p2p") return transaction.type.includes("p2p");
    if (selectedFilter === "loan") return transaction.type.includes("loan_received");
    if (selectedFilter === "payment") return transaction.type.includes("loan_payment");
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-white">Histórico de Transações</h5>
        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
          <Filter size={16} />
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={16} />
        <Input 
          placeholder="Buscar transações..." 
          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto">
        {filterTypes.map((filter) => {
          const Icon = filter.icon;
          const isActive = selectedFilter === filter.id;
          
          return (
            <Button 
              key={filter.id}
              variant="outline" 
              size="sm" 
              className={`flex items-center gap-1 whitespace-nowrap ${
                isActive 
                  ? 'border-none text-white' 
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
              style={isActive ? { backgroundColor: '#7871AA' } : undefined}
              onClick={() => setSelectedFilter(filter.id)}
            >
              {Icon && <Icon size={14} />}
              {filter.label}
            </Button>
          );
        })}
      </div>

      {/* Transactions List */}
      <Card style={{ backgroundColor: '#AA9FB1' }} className="border-none">
        <CardContent className="p-0">
          <div className="space-y-0">
            {filteredTransactions.map((transaction) => {
              const getTransactionIcon = (type: string) => {
                if (type.includes("p2p_sent")) return <ArrowUpRight size={16} className="text-red-300" />;
                if (type.includes("p2p_received")) return <ArrowDownLeft size={16} className="text-green-300" />;
                if (type.includes("loan_received")) return <CreditCard size={16} className="text-green-300" />;
                if (type.includes("loan_payment")) return <ArrowUpRight size={16} className="text-red-300" />;
                return <ArrowUpRight size={16} className="text-white" />;
              };

              const getAmountColor = (type: string) => {
                if (type.includes("received")) return "text-green-300";
                return "text-white";
              };

              const getAmountPrefix = (type: string) => {
                if (type.includes("received")) return "+";
                return "-";
              };

              return (
                <div key={transaction.id} className="p-4 border-b border-white/10 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{transaction.description}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-white/70 text-xs">{transaction.date}</p>
                          <Badge className="text-xs px-2 py-0" style={{ backgroundColor: '#4E5283' }}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${getAmountColor(transaction.type)}`}>
                        {getAmountPrefix(transaction.type)}{transaction.amount}
                      </p>
                      <Button variant="ghost" size="sm" className="text-white/60 hover:bg-white/10 p-1 h-auto">
                        <Eye size={12} />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Transaction ID and Timestamp */}
                  <div className="mt-2 pt-2 border-t border-white/5">
                    <div className="flex justify-between text-xs text-white/50">
                      <span>ID: {transaction.id}</span>
                      <span>{transaction.timestamp}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Load More */}
      <Button 
        variant="outline" 
        className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        Carregar mais transações
      </Button>
    </div>
  );
}