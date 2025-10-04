import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { BarChart3, Send, Receipt, Plus, TrendingUp, History, Eye } from "lucide-react";

export function Dashboard() {
  // Mock data for cash flow chart (entradas vs saídas)
  const cashFlowData = [
    { month: 'Jan', entradas: 4200, saidas: 3800 },
    { month: 'Fev', entradas: 3800, saidas: 4100 },
    { month: 'Mar', entradas: 5200, saidas: 3900 },
    { month: 'Abr', entradas: 4600, saidas: 4200 },
    { month: 'Mai', entradas: 5800, saidas: 4500 },
    { month: 'Jun', entradas: 5100, saidas: 4300 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white">Dashboard Principal</h4>
          <p className="text-white/80">Resumo financeiro e análise de risco</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white font-medium">F</span>
        </div>
      </div>

      {/* Balance Card */}
      <Card style={{ backgroundColor: '#CCA7A2' }} className="border-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Saldo Disponível</CardTitle>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
            <Eye size={16} />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-3xl font-bold text-white">R$ 345.756,87</div>
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm">Conta Corrente</span>
              <Button variant="ghost" size="sm" className="text-white/80 hover:bg-white/10 text-xs">
                VER EXTRATO
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-16 flex-col gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Send size={20} />
          <span className="text-xs">PIX</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex-col gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <BarChart3 size={20} />
          <span className="text-xs">INVESTIR</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex-col gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Receipt size={20} />
          <span className="text-xs">EXTRATO</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex-col gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Plus size={20} />
          <span className="text-xs">CRÉDITO</span>
        </Button>
      </div>

      {/* Cash Flow Chart */}
      <Card style={{ backgroundColor: '#AA9FB1' }} className="border-none">
        <CardHeader>
          <CardTitle className="text-white">Fluxo de Caixa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/80 text-sm">Entradas (últimos 6 meses)</p>
                <p className="text-lg font-bold text-green-300">R$ 28.800</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Saídas (últimos 6 meses)</p>
                <p className="text-lg font-bold text-red-300">R$ 24.800</p>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashFlowData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'white', fontSize: 11 }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="entradas" 
                    stroke="#4ade80" 
                    strokeWidth={2}
                    dot={{ fill: '#4ade80', strokeWidth: 0, r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="saidas" 
                    stroke="#f87171" 
                    strokeWidth={2}
                    dot={{ fill: '#f87171', strokeWidth: 0, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-300"></div>
                <span className="text-white text-xs">Entradas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-300"></div>
                <span className="text-white text-xs">Saídas</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Score Card */}
      <Card style={{ backgroundColor: '#CCA7A2' }} className="border-none">
        <CardHeader>
          <CardTitle className="text-white">Score de Crédito</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">750</div>
              <p className="text-white/80 text-sm">Bom Score • Faixa: 700-850</p>
            </div>
            <Progress value={75} className="bg-white/20" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Ofertas elegíveis</span>
                <span className="text-white font-medium">12 disponíveis</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Limite pré-aprovado</span>
                <span className="text-white font-medium">até R$ 85.000</span>
              </div>
            </div>
            <p className="text-white/80 text-xs text-center">Score atualizado há 2 dias • Próxima atualização em 28 dias</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}