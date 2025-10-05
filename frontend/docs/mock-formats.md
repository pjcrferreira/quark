## Formatos de dados (mocks) usados no frontend

### Usuário (User)
```
{
  user_id: string,
  email: string,
  nome_completo: string,
  tipo_entidade: 'PF' | 'PJ',
  score_credito: number,
  kyc_status: string,
  setor_atuacao?: string,
  regiao?: string,
  carteira_id_fk?: string
}
```

### Carteira (Wallet)
```
{
  carteira_id: string,
  user_id_fk: string,
  saldo_disponivel: number
}
```

### Saldo (WalletBalance)
```
{
  balance: number,
  carteira_id?: string,
  user_id_fk?: string
}
```

### Transação (Transaction)
```
{
  transacao_id: string,
  timestamp_utc: string,
  tipo: string,
  valor: number,
  descricao: string
}
```

### Oferta de Crédito (Offer)
```
{
  oferta_id: string,
  valor_maximo: number,
  juros_taxa_anual: number,
  prazo_meses: number,
  score_minimo: number,
  status: string
}
```

### Empréstimo (Loan)
```
{
  emprestimo_id: string,
  oferta_id_fk: string,
  valor_concedido: number,
  juros_acordado: number,
  status: string
}
```

### Parcela (Installment)
```
{
  parcela_id: string,
  numero_parcela: number,
  valor_parcela: number,
  status: string
}
```

> Mantenha estes formatos ao criar/atualizar mocks no backend.
