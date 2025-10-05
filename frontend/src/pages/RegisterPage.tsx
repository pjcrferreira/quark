
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState<'PF'|'PJ'>('PF');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [err, setErr] = useState('');
  const { register } = useAuth();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    setSuccess('');
    try {
      await register({ email, password, nome_completo: nome, tipo_entidade: tipo });
      await authService.startKyc();
      setSuccess('Cadastro realizado! Validação de identidade iniciada. Faça login para continuar.');
      setTimeout(() => nav('/login'), 2000);
    } catch (e: any) {
      setErr(e?.response?.data?.message || e.message || 'Erro no cadastro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-[#e9eafc] to-[#f7f7fb] px-2">
      <Card style={{ backgroundColor: '#CCA7A2' }} className="border-none">
        <form onSubmit={submit} className="rounded-[2.5rem] p-4 sm:p-8 flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-center text-[#4E5283] mb-2">Cadastro</h1>
          {err && <div className="text-red-600 text-sm text-center font-medium bg-red-50 border border-red-200 rounded p-2" role="alert">{err}</div>}
          {success && <div className="text-green-700 text-sm text-center font-medium bg-green-50 border border-green-200 rounded p-2" role="status">{success}</div>}
          {/* Nome */}
          <div className="space-y-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg"><FiUser /></span>
              <Input 
                value={nome}
                onChange={e=>setNome(e.target.value)}
                placeholder="Nome completo"
                required
                className="pl-12 h-14 text-base font-bold bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
          </div>
          {/* Email */}
          <div className="space-y-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg"><FiMail /></span>
              <Input 
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                autoComplete="username"
                className="pl-12 h-14 text-base font-bold bg-white/10 border-white/20 text-white placeholder:text-white/60"
                aria-invalid={!!err}
                required
              />
            </div>
          </div>
          {/* Senha */}
          <div className="space-y-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg"><FiLock /></span>
              <Input 
                value={password}
                onChange={e=>setPassword(e.target.value)}
                placeholder="Senha"
                type="password"
                autoComplete="new-password"
                className="pl-12 h-14 text-base font-bold bg-white/10 border-white/20 text-white placeholder:text-white/60"
                aria-invalid={!!err}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-white text-sm">Tipo de conta</label>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Selecione o tipo de conta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PF">Pessoa Física</SelectItem>
                <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={loading} className="bg-[#4E5283] text-white rounded-lg py-2 font-semibold hover:bg-[#7871AA] transition disabled:opacity-60 disabled:cursor-not-allowed w-full flex items-center justify-center gap-2">
            {loading && <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>}
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
          <div className="text-center text-sm mt-2">
            Já tem conta?{' '}
            <Link to="/login" className="text-[#4E5283] font-semibold underline underline-offset-2 hover:text-[#7871AA] transition">Entrar</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
