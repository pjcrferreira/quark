import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const { register } = useAuth();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password, nome_completo: nome, tipo_entidade: 'PF' });
      nav('/login');
    } catch (e: any) {
      alert(e?.response?.data?.message || e.message || 'Erro no cadastro');
    }
  };

  return (
    <form onSubmit={submit} style={{maxWidth:500}}>
      <h1>Register</h1>
      <div>
        <input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Nome completo" />
      </div>
      <div>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
      </div>
      <div>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="senha" type="password" />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
}
