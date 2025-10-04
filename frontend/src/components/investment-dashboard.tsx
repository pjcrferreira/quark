import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TrendingUp, Plus, Eye, Settings, Target, Pause, Play, X } from "lucide-react";
import { useState } from "react";

export function InvestmentDashboard() {
  const [view, setView] = useState<"dashboard" | "create" | "reports">("dashboard");
  const performanceData = [
    { month: 'Jan', retorno: 2.1, risco: 1.8 },
    { month: 'Fev', retorno: 2.8, risco: 2.2 },
    { month: 'Mar', retorno: 3.2, risco: 2.8 },
    { month: 'Abr', retorno: 2.5, risco: 2.0 },
    { month: 'Mai', retorno: 4.1, risco: 3.5 },
    { month: 'Jun', retorno: 3.8, risco: 3.1 }
  ];

  const [activeOffers, setActiveOffers] = useState([
    {
      id: 1,
      type: "Crédito Pessoal",
      minScore: 650,
      rate: "2.8%",
      amount: "R$ 50.000",
      applications: 12,
      status: "Ativa",
      niche: "Geral",
      term: "12 meses",
      approved: 8,
      pending: 4
    },
    {
      id: 2,
      type: "Cartão de Crédito",
      minScore: 700,
      rate: "4.2%",
      amount: "R$ 25.000",
      applications: 8,
      status: "Pausada",
      niche: "Urbano/Sul",
      term: "24 meses",
      approved: 3,
      pending: 5
    },
    {
      id: 3,
      type: "Financiamento",
      minScore: 600,
      rate: "3.5%",
      amount: "R$ 100.000",
      applications: 23,
      status: "Ativa",
      niche: "Agronegócio/Centro-Oeste",
      term: "36 meses",
      approved: 15,
      pending: 8
    }
  ]);

  const toggleOfferStatus = (id: number) => {
    setActiveOffers(offers => 
      offers.map(offer => 
        offer.id === id 
          ? { ...offer, status: offer.status === "Ativa" ? "Pausada" : "Ativa" }
          : offer
      )
    );
  };

  const cancelOffer = (id: number) => {
    setActiveOffers(offers => 
      offers.map(offer => 
        offer.id === id 
          ? { ...offer, status: "Cancelada" }
          : offer
      )
    );
  };

  if (view === "create") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2" onClick={() => setView("dashboard")}>
            ←
          </Button>
          <h5 className="text-white">Criação de Oferta</h5>
        </div>

        {/* Risk Parameters Form */}
        <Card style={{ backgroundColor: '#AA9FB1' }} className="border-none">
          <CardHeader>
            <CardTitle className="text-white">Parâmetros de Risco</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm">Taxa de Juros (%)</label>
                <input 
                  type="number" 
                  placeholder="2.5"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60"
                />
              </div>
              <div>
                <label className="text-white text-sm">Prazo (meses)</label>
                <input 
                  type="number" 
                  placeholder="12"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60"
                />
              </div>
            </div>
            
            <div>
              <label className="text-white text-sm">Quantia Disponível (R$)</label>
              <input 
                type="number" 
                placeholder="50000"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60"
              />
            </div>
          </CardContent>
        </Card>

        {/* Risk Module */}
        <Card style={{ backgroundColor: '#CCA7A2' }} className="border-none">
          <CardHeader>
            <CardTitle className="text-white">Módulo de Risco</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-white text-sm">Score Mínimo</label>
              <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
                <option value="600">600 - Risco Alto</option>
                <option value="650">650 - Risco Médio</option>
                <option value="700">700 - Risco Baixo</option>
                <option value="750">750 - Risco Muito Baixo</option>
              </select>
            </div>
            
            <div>
              <label className="text-white text-sm">Filtros de Nicho</label>
              <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white">
                <option value="geral">Geral</option>
                <option value="agro-centro">Agronegócio/Centro-Oeste</option>
                <option value="agro-sul">Agronegócio/Sul</option>
                <option value="urbano-sudeste">Urbano/Sudeste</option>
                <option value="urbano-sul">Urbano/Sul</option>
                <option value="tech">Tecnologia</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Button 
          className="w-full h-12 text-white font-medium"
          style={{ backgroundColor: '#4E5283' }}
          onClick={() => setView("dashboard")}
        >
          Publicar Oferta
        </Button>
      </div>
    );
  }

  if (view === "reports") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2" onClick={() => setView("dashboard")}>
            ←
          </Button>
          <h5 className="text-white">Relatórios de Risco</h5>
        </div>

        {/* Risk Analysis */}
        <Card style={{ backgroundColor: '#AA9FB1' }} className="border-none">
          <CardHeader>
            <CardTitle className="text-white">Análise Consolidada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/80 text-sm">Retorno Projetado</p>
                <p className="text-xl font-bold text-white">R$ 15.840</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Retorno Real</p>
                <p className="text-xl font-bold text-green-300">R$ 16.230</p>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="month" tick={{ fill: 'white', fontSize: 12 }} />
                  <Bar dataKey="retorno" fill="#CCA7A2" />
                  <Bar dataKey="risco" fill="#7871AA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Borrowers Table */}
        <Card style={{ backgroundColor: '#CCA7A2' }} className="border-none">
          <CardHeader>
            <CardTitle className="text-white">Mutuários Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "João Silva", score: 720, amount: "R$ 5.000", status: "Em dia" },
                { name: "Maria Santos", score: 680, amount: "R$ 3.000", status: "Em dia" },
                { name: "Carlos Lima", score: 650, amount: "R$ 8.000", status: "Atraso 5 dias" }
              ].map((borrower, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/10">
                  <div>
                    <p className="text-white font-medium">{borrower.name}</p>
                    <p className="text-white/70 text-sm">Score: {borrower.score}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{borrower.amount}</p>
                    <Badge className={`text-xs ${borrower.status.includes("Atraso") ? "bg-red-500" : "bg-green-500"}`}>
                      {borrower.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-white">
            {view === "dashboard" && "Gestão de Investimentos"}
            {view === "create" && "Criação de Oferta"}
            {view === "reports" && "Relatórios de Risco"}
          </h5>
          <p className="text-white/80">
            {view === "dashboard" && "Acompanhe suas ofertas e empréstimos"}
            {view === "create" && "Defina os parâmetros de risco e retorno"}
            {view === "reports" && "Análise consolidada de investimentos"}
          </p>
        </div>
        {view === "dashboard" && (
          <Button 
            className="text-white font-medium"
            style={{ backgroundColor: '#4E5283' }}
            onClick={() => setView("create")}
          >
            <Plus size={16} className="mr-2" />
            Nova Oferta
          </Button>
        )}
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card style={{ backgroundColor: '#CCA7A2' }} className="border-none">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-white/80 text-sm">Total Investido</p>
              <p className="text-2xl font-bold text-white">R$ 125.340</p>
              <div className="flex items-center gap-1">
                <TrendingUp size={12} className="text-green-300" />
                <span className="text-green-300 text-xs">+12.5% este mês</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#AA9FB1' }} className="border-none">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-white/80 text-sm">Retorno Médio</p>
              <p className="text-2xl font-bold text-white">3.2%</p>
              <p className="text-white/70 text-xs">Taxa mensal média</p>
            </div>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#7871AA' }} className="border-none">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-white/80 text-sm">Ofertas Ativas</p>
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-white/70 text-xs">43 aplicações totais</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card style={{ backgroundColor: '#AA9FB1' }} className="border-none">
        <CardHeader>
          <CardTitle className="text-white">Performance - Retorno vs. Risco</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'white', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'white', fontSize: 12 }}
                />
                <Bar dataKey="retorno" fill="#CCA7A2" radius={[2, 2, 0, 0]} />
                <Bar dataKey="risco" fill="#7871AA" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#CCA7A2' }}></div>
              <span className="text-white text-sm">Retorno</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#7871AA' }}></div>
              <span className="text-white text-sm">Risco</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Offers Table */}
      <Card style={{ backgroundColor: '#AA9FB1' }} className="border-none">
        <CardHeader>
          <CardTitle className="text-white">Ofertas Ativas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeOffers.map((offer) => (
              <div key={offer.id} className="p-4 rounded-lg bg-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h6 className="text-white font-medium">{offer.type}</h6>
                    <p className="text-white/70 text-sm">{offer.niche} • Score mín: {offer.minScore}</p>
                  </div>
                  <Badge 
                    className="text-xs"
                    style={{ 
                      backgroundColor: 
                        offer.status === 'Ativa' ? '#4E5283' : 
                        offer.status === 'Pausada' ? '#7871AA' : '#AA9FB1',
                      color: 'white'
                    }}
                  >
                    {offer.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div>
                    <p className="text-white/70 text-xs">Taxa</p>
                    <p className="text-white font-medium">{offer.rate}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs">Prazo</p>
                    <p className="text-white font-medium">{offer.term}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs">Aprovadas</p>
                    <p className="text-white font-medium text-green-300">{offer.approved}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs">Pendentes</p>
                    <p className="text-white font-medium text-yellow-300">{offer.pending}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => toggleOfferStatus(offer.id)}
                    disabled={offer.status === "Cancelada"}
                  >
                    {offer.status === "Ativa" ? <Pause size={14} className="mr-1" /> : <Play size={14} className="mr-1" />}
                    {offer.status === "Ativa" ? "Pausar" : "Ativar"}
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => cancelOffer(offer.id)}
                    disabled={offer.status === "Cancelada"}
                  >
                    <X size={14} className="mr-1" />
                    Cancelar
                  </Button>
                  
                  <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Eye size={14} className="mr-1" />
                    Ver
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          className="h-12 text-white font-medium"
          style={{ backgroundColor: '#4E5283' }}
          onClick={() => setView("create")}
        >
          <Target size={16} className="mr-2" />
          Criar Nova Oferta
        </Button>
        <Button 
          variant="outline"
          className="h-12 bg-white/10 border-white/20 text-white hover:bg-white/20"
          onClick={() => setView("reports")}
        >
          <BarChart size={16} className="mr-2" />
          Relatórios de Risco
        </Button>
      </div>
    </div>
  );
}