import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ArrowLeft, Shield, AlertCircle, CheckCircle, Info } from "lucide-react";
import { useState } from "react";

interface OfferDetailProps {
  offerId: number;
  onBack: () => void;
}

export function OfferDetail({ offerId, onBack }: OfferDetailProps) {
  const [acceptanceStep, setAcceptanceStep] = useState<"terms" | "confirming" | "confirmed">("terms");
  
  // Mock offer data
  const offer = {
    id: offerId,
    lender: "Banco Digital",
    amount: "R$ 5.000,00",
    rate: "2,5%",
    term: "12 meses",
    cet: "3,2%",
    annualRate: "30,4%",
    totalAmount: "R$ 6.520,00",
    monthlyPayment: "R$ 543,33",
    processingFee: "R$ 50,00",
    iof: "R$ 38,00"
  };

  const handleAcceptLoan = () => {
    setAcceptanceStep("confirming");
    setTimeout(() => {
      setAcceptanceStep("confirmed");
    }, 3000);
  };

  if (acceptanceStep === "confirmed") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h5 className="text-white">Empréstimo Confirmado</h5>
        </div>

        <Card style={{ backgroundColor: '#CCA7A2' }} className="border-none">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle size={48} className="text-green-300 mx-auto" />
              <div>
                <h4 className="text-white">Empréstimo Aprovado!</h4>
                <p className="text-white/80">O valor será creditado em sua carteira em até 2 horas</p>
              </div>
              <div className="p-4 rounded-lg bg-white/20">
                <p className="text-white/80 text-sm">Valor aprovado</p>
                <p className="text-2xl font-bold text-white">{offer.amount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          className="w-full h-12 text-white font-medium"
          style={{ backgroundColor: '#4E5283' }}
          onClick={onBack}
        >
          Voltar ao Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2" onClick={onBack}>
          <ArrowLeft size={20} />
        </Button>
        <h5 className="text-white">Detalhe da Oferta</h5>
      </div>

      {/* Offer Summary */}
      <Card style={{ backgroundColor: '#CCA7A2' }} className="border-none">
        <CardHeader>
          <CardTitle className="text-white">{offer.lender}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-white/80 text-sm">Valor solicitado</p>
            <div className="text-3xl font-bold text-white">{offer.amount}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-white/80 text-sm">Taxa mensal</p>
              <p className="text-xl font-bold text-white">{offer.rate}</p>
            </div>
            <div className="text-center">
              <p className="text-white/80 text-sm">Prazo</p>
              <p className="text-xl font-bold text-white">{offer.term}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card style={{ backgroundColor: '#AA9FB1' }} className="border-none">
        <CardHeader>
          <CardTitle className="text-white">Termos do Empréstimo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/80 text-sm">Taxa de juros anual</span>
              <span className="text-white font-medium">{offer.annualRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80 text-sm">CET (Custo Efetivo Total)</span>
              <span className="text-white font-medium">{offer.cet}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80 text-sm">Taxa de processamento</span>
              <span className="text-white font-medium">{offer.processingFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/80 text-sm">IOF</span>
              <span className="text-white font-medium">{offer.iof}</span>
            </div>
            <div className="border-t border-white/20 pt-3">
              <div className="flex justify-between">
                <span className="text-white font-medium">Valor total a pagar</span>
                <span className="text-white font-bold text-lg">{offer.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white font-medium">Parcela mensal</span>
                <span className="text-white font-bold text-lg">{offer.monthlyPayment}</span>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="p-3 rounded-lg bg-yellow-500/20 flex gap-3">
            <Info size={16} className="text-yellow-300 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm">Informações Importantes</p>
              <p className="text-white/80 text-xs">
                • Pagamento da primeira parcela em 30 dias<br/>
                • Antecipação permitida sem multa<br/>
                • Atraso acima de 15 dias: juros de 1% a.m.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Warning */}
      <div className="p-4 rounded-lg bg-red-500/20 flex gap-3">
        <AlertCircle size={16} className="text-red-300 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-white font-medium text-sm">Confirmação de Segurança</p>
          <p className="text-white/80 text-xs">
            Esta operação é irreversível. Certifique-se de que compreende todos os termos antes de prosseguir.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {acceptanceStep === "terms" && (
          <Button 
            className="w-full h-12 text-white font-medium"
            style={{ backgroundColor: '#4E5283' }}
            onClick={handleAcceptLoan}
          >
            Aceitar Empréstimo
          </Button>
        )}
        
        {acceptanceStep === "confirming" && (
          <Button 
            className="w-full h-12 text-white font-medium"
            style={{ backgroundColor: '#7871AA' }}
            disabled
          >
            Processando... Por favor aguarde
          </Button>
        )}
        
        <Button 
          variant="outline"
          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
          onClick={onBack}
        >
          Voltar às Ofertas
        </Button>
      </div>
    </div>
  );
}