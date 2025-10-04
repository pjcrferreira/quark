import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { OfferDetail } from "./offer-detail";
import { TrendingUp, Shield, Clock, CheckCircle, Star, Filter } from "lucide-react";
import { useState } from "react";

export function CreditMarketplace() {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  
  if (selectedOffer) {
    return (
      <OfferDetail 
        offerId={selectedOffer} 
        onBack={() => setSelectedOffer(null)} 
      />
    );
  }
  const userScore = 750; // Current user score
  
  const offers = [
    {
      id: 1,
      lender: "Banco Digital",
      amount: "R$ 5.000",
      rate: "2,5%",
      term: "12 meses",
      minScore: 700,
      eligibility: "Elegível",
      color: "#4E5283",
      featured: true,
      cet: "3,2%",
      maxAmount: "R$ 15.000"
    },
    {
      id: 2,
      lender: "Fintech Alpha",
      amount: "R$ 3.000",
      rate: "3,2%",
      term: "6 meses",
      minScore: 650,
      eligibility: "Elegível",
      color: "#4E5283",
      featured: false,
      cet: "4,1%",
      maxAmount: "R$ 8.000"
    },
    {
      id: 3,
      lender: "Crédito Fácil",
      amount: "R$ 8.000",
      rate: "4,1%",
      term: "18 meses",
      minScore: 750,
      eligibility: "Elegível",
      color: "#4E5283",
      featured: false,
      cet: "5,3%",
      maxAmount: "R$ 20.000"
    },
    {
      id: 4,
      lender: "Banco Premium",
      amount: "R$ 12.000",
      rate: "1,8%",
      term: "24 meses",
      minScore: 800,
      eligibility: "Não Elegível",
      color: "#AA9FB1",
      featured: false,
      cet: "2,9%",
      maxAmount: "R$ 50.000"
    }
  ];

  const eligibleOffers = offers.filter(offer => userScore >= offer.minScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h5 className="text-white">Marketplace de Ofertas</h5>
        <p className="text-white/80">Ofertas filtradas pela sua elegibilidade</p>
      </div>

      {/* Score Display and Eligibility */}
      <Card style={{ backgroundColor: '#CCA7A2' }} className="border-none">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/20">
                <Shield size={16} className="text-white" />
                <span className="text-white text-sm font-medium">Score: {userScore}</span>
              </div>
              <Badge className="text-xs" style={{ backgroundColor: '#4E5283' }}>
                Bom Score
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/80 text-sm">Ofertas elegíveis</p>
                <p className="text-xl font-bold text-white">{eligibleOffers.length}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Melhor taxa</p>
                <p className="text-xl font-bold text-white">2,5% a.m.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eligibility Notice */}
      <div 
        className="p-4 rounded-lg border-l-4"
        style={{ backgroundColor: '#7871AA', borderLeftColor: '#4E5283' }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle size={20} className="text-white" />
          <div>
            <p className="text-white font-medium text-sm">Elegibilidade Confirmada</p>
            <p className="text-white/80 text-xs">Você tem ofertas pré-aprovadas disponíveis</p>
          </div>
        </div>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h6 className="text-white">Ofertas Elegíveis ({eligibleOffers.length})</h6>
          <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Filter size={14} />
          </Button>
        </div>
        
        {eligibleOffers.map((offer) => (
          <Card 
            key={offer.id} 
            style={{ backgroundColor: '#AA9FB1' }} 
            className={`border-none ${offer.featured ? 'ring-2 ring-yellow-400' : ''}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-white text-base">{offer.lender}</CardTitle>
                  {offer.featured && <Star size={16} className="text-yellow-400 fill-yellow-400" />}
                </div>
                <Badge 
                  className="text-xs"
                  style={{ backgroundColor: '#4E5283', color: 'white' }}
                >
                  Elegível
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/70 text-xs">Valor sugerido</p>
                  <p className="text-white font-bold text-lg">{offer.amount}</p>
                  <p className="text-white/60 text-xs">até {offer.maxAmount}</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs">Taxa ao mês</p>
                  <p className="text-white font-bold text-lg">{offer.rate}</p>
                  <p className="text-white/60 text-xs">CET: {offer.cet}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/70 text-xs">Prazo</p>
                  <p className="text-white font-medium">{offer.term}</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs">Score mínimo</p>
                  <p className="text-white font-medium">{offer.minScore}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  className="flex-1 text-white font-medium"
                  style={{ backgroundColor: '#4E5283' }}
                  onClick={() => setSelectedOffer(offer.id)}
                >
                  Ver Detalhes
                </Button>
                <Button 
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <TrendingUp size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Non-eligible offers */}
        {offers.filter(offer => userScore < offer.minScore).length > 0 && (
          <div className="space-y-2">
            <h6 className="text-white/60 text-sm">Ofertas Não Elegíveis</h6>
            {offers.filter(offer => userScore < offer.minScore).map((offer) => (
              <Card key={offer.id} style={{ backgroundColor: '#AA9FB1', opacity: 0.6 }} className="border-none">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 font-medium">{offer.lender}</p>
                      <p className="text-white/60 text-sm">Score necessário: {offer.minScore}</p>
                    </div>
                    <Badge className="text-xs" style={{ backgroundColor: '#AA9FB1' }}>
                      Score Insuficiente
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Action Button */}
      <Button 
        className="w-full h-12 text-white font-medium"
        style={{ backgroundColor: '#4E5283' }}
      >
        Simular Nova Proposta
      </Button>
    </div>
  );
}