
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { FiMail, FiLock } from 'react-icons/fi';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    try {
      await login(email, password);
      nav('/dashboard');
    } catch (e: any) {
      setErr(e?.response?.data?.message || e.message || 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-[#e9eafc] to-[#f7f7fb] px-2">
      <Card style={{ backgroundColor: '#CCA7A2' }} className="border-none">
        <form onSubmit={submit} className="rounded-[2.5rem] p-4 sm:p-8 flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-center text-[#4E5283] mb-2">Entrar</h1>
          {err && <div className="text-red-600 text-sm text-center font-medium bg-red-50 border border-red-200 rounded p-2" role="alert">{err}</div>}
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
                autoComplete="current-password"
                className="pl-12 h-14 text-base font-bold bg-white/10 border-white/20 text-white placeholder:text-white/60"
                aria-invalid={!!err}
                required
              />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="bg-[#4E5283] text-white rounded-lg py-2 font-semibold hover:bg-[#7871AA] transition disabled:opacity-60 disabled:cursor-not-allowed w-full flex items-center justify-center gap-2">
            {loading && <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>}
            Entrar
          </Button>
          <div className="text-center text-sm mt-2">
            Não tem conta?{' '}
            <Link to="/register" className="text-[#4E5283] font-semibold underline underline-offset-2 hover:text-[#7871AA] transition">Cadastre-se</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
