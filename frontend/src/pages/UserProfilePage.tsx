
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

export default function UserProfilePage() {
  const { user } = useAuth();

  if (!user) return <div>Carregando perfil...</div>;

  return (
    <Card style={{ maxWidth: 500, margin: '2rem auto', backgroundColor: '#CCA7A2' }} className="border-none">
      <CardHeader>
        <CardTitle className="text-white">Perfil do Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-white">
          <div><b>Nome:</b> {user.nome_completo}</div>
          <div><b>Email:</b> {user.email}</div>
          <div><b>Tipo:</b> {user.tipo_entidade}</div>
          <div><b>Score de Crédito:</b> {user.score_credito}</div>
          <div><b>Status KYC:</b> {user.kyc_status}</div>
          {user.setor_atuacao && <div><b>Setor:</b> {user.setor_atuacao}</div>}
          {user.regiao && <div><b>Região:</b> {user.regiao}</div>}
          <div style={{marginTop:24}}>
            <b>Carteira:</b> {user.carteira_id_fk || '---'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
