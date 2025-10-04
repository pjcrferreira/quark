import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav('/dashboard');
    } catch (e: any) {
      setErr(e?.response?.data?.message || e.message || 'Erro ao autenticar');
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:400}}>
      <h1>Login</h1>
      {err && <div style={{color:'red'}}>{err}</div>}
      <div>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
      </div>
      <div>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="senha" type="password" />
      </div>
      <div>
        <button type="submit">Entrar</button>
      </div>
    </form>
  );
}
