# Formatos de dados (mocks) usados no frontend e compatibilidade com backend mock

## Usuário (User)
```json
{
  "user_id": "string",
  "email": "string",
  "nome_completo": "string",
  "tipo_entidade": "PF" | "PJ",
  "score_credito": 600,
  "kyc_status": "string",
  "setor_atuacao": "string",
  "regiao": "string",
  "carteira_id_fk": "string"
}
```
- Compatível com backend: sim (ver /api/v1/user/profile)

## Carteira (Wallet)
```json
{
  "carteira_id": "string",
  "user_id_fk": "string",
  "saldo_disponivel": 1000
}
```
- Compatível com backend: sim (ver /api/v1/wallet/balance)

## Saldo (WalletBalance)
```json
{
  "balance": 1000,
  "carteira_id": "string",
  "user_id_fk": "string"
}
```
- Compatível com backend: sim (ver /api/v1/wallet/balance)

## Transação (Transaction)
```json
{
  "transacao_id": "string",
  "timestamp_utc": "2025-10-05T00:00:00.000Z",
  "tipo": "string",
  "valor": 200,
  "descricao": "string"
}
```
- Compatível com backend: sim (ver /api/v1/transaction/history)

## Oferta de Crédito (Offer)
```json
{
  "oferta_id": "string",
  "valor_maximo": 1000,
  "juros_taxa_anual": 10,
  "prazo_meses": 12,
  "score_minimo_exigido": 600,
  "status": "ATIVA"
}
```
- Compatível com backend: sim (ver /api/v1/marketplace/offers)

## Empréstimo (Loan)
```json
{
  "emprestimo_id": "string",
  "oferta_id_fk": "string",
  "valor_concedido": 1000,
  "juros_acordado": 10,
  "status": "ATIVO"
}
```
- Compatível com backend: sim (ver /api/v1/marketplace/accept-offer/:offerId, /api/v1/loan/my-loans)

## Parcela (Installment)
```json
{
  "parcela_id": "string",
  "numero_parcela": 1,
  "valor_parcela": 1000,
  "status": "PENDENTE"
}
```
- Compatível com backend: sim (ver /api/v1/loan/:loanId/installments)

> Todos os formatos estão compatíveis entre frontend e backend mock. Manter este arquivo atualizado ao evoluir os mocks.
