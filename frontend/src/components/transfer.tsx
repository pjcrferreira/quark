import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, User, Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

export function Transfer() {
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [securityStatus, setSecurityStatus] = useState<"idle" | "validating" | "approved" | "flagged">("idle");
  
  // Mock security validation
  const validateTransfer = () => {
    setSecurityStatus("validating");
    setTimeout(() => {
      setSecurityStatus(recipientId.includes("fraud") ? "flagged" : "approved");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
          <ArrowLeft size={20} />
        </Button>
        <h5 className="text-white">Transferência P2P</h5>
      </div>

      {/* Balance Display */}
      <Card style={{ backgroundColor: '#CCA7A2' }} className="border-none">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-white/80 text-sm">Saldo disponível</p>
            <div className="text-2xl font-bold text-white">R$ 345.756,87</div>
          </div>
        </CardContent>
      </Card>

      {/* Transfer Form */}
      <Card style={{ backgroundColor: '#AA9FB1' }} className="border-none">
        <CardHeader>
          <CardTitle className="text-white">Transferir Agora</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Amount */}
          <div className="space-y-2">
            <Label className="text-white text-sm">Valor</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg">R$</span>
              <Input 
                placeholder="0,00"
                className="pl-12 text-2xl font-bold bg-white/10 border-white/20 text-white placeholder:text-white/60 h-14"
              />
            </div>
          </div>

          {/* Recipient */}
          <div className="space-y-2">
            <Label className="text-white text-sm">ID do Destinatário</Label>
            <Input 
              placeholder="Digite o ID do usuário (ex: @usuario123)"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            {recipientId && (
              <Button 
                size="sm" 
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={validateTransfer}
              >
                Validar Destinatário
              </Button>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label className="text-white text-sm">Mensagem (opcional)</Label>
            <Input 
              placeholder="Digite uma mensagem..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>

          {/* Transfer Type */}
          <div className="space-y-2">
            <Label className="text-white text-sm">Tipo de transferência</Label>
            <Select>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="PIX - Instantâneo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pix">PIX - Instantâneo</SelectItem>
                <SelectItem value="ted">TED - Mesmo dia</SelectItem>
                <SelectItem value="doc">DOC - Próximo dia útil</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Security Module - Antifraude */}
      {securityStatus !== "idle" && (
        <Card style={{ backgroundColor: '#AA9FB1' }} className="border-none">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield size={20} />
              Módulo de Antifraude
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityStatus === "validating" && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/20">
                  <Clock size={16} className="text-yellow-300" />
                  <div>
                    <p className="text-white font-medium text-sm">Validando transação...</p>
                    <p className="text-white/70 text-xs">Verificando dados do destinatário</p>
                  </div>
                </div>
              )}
              
              {securityStatus === "approved" && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/20">
                  <CheckCircle size={16} className="text-green-300" />
                  <div>
                    <p className="text-white font-medium text-sm">Transação Aprovada</p>
                    <p className="text-white/70 text-xs">Destinatário validado com sucesso</p>
                  </div>
                </div>
              )}
              
              {securityStatus === "flagged" && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/20">
                  <AlertTriangle size={16} className="text-red-300" />
                  <div>
                    <p className="text-white font-medium text-sm">Atenção Requerida</p>
                    <p className="text-white/70 text-xs">Esta transação requer confirmação adicional</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Contacts */}
      <Card style={{ backgroundColor: '#AA9FB1' }} className="border-none">
        <CardHeader>
          <CardTitle className="text-white text-sm">Transferir para</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 cursor-pointer hover:bg-white/15 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">MIGUEL PIRES DOS SANTOS</p>
                <p className="text-white/70 text-xs">**** 4829</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          className="w-full h-12 text-white font-medium"
          style={{ backgroundColor: '#4E5283' }}
          disabled={securityStatus === "validating" || securityStatus === "flagged"}
        >
          {securityStatus === "validating" ? "Validando..." : "Transferir Agora"}
        </Button>
        
        {securityStatus === "flagged" && (
          <Button 
            className="w-full h-12 text-white font-medium"
            style={{ backgroundColor: '#7871AA' }}
          >
            Confirmar com Segurança Adicional
          </Button>
        )}
        
        <p className="text-white/70 text-xs text-center">
          Esta transação será processada instantaneamente entre usuários da plataforma
        </p>
      </div>
    </div>
  );
}