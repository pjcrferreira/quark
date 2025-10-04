# Mock API Quark

Mock server para testes locais do frontend.

## Como rodar

```bash
cd backend/mock
npm install
node index.js
```

O servidor estará disponível em http://localhost:8000

## Endpoints implementados

- POST   /api/v1/auth/register
- POST   /api/v1/auth/login
- GET    /api/v1/user/profile
- POST   /api/v1/user/kyc/start
- GET    /api/v1/wallet/balance
- GET    /api/v1/transaction/history
- POST   /api/v1/marketplace/offers
- POST   /api/v1/marketplace/accept-offer/:offer_id
- POST   /api/v1/marketplace/searches
- GET    /api/v1/marketplace/matches/:search_id
- GET    /api/v1/loan/my-loans
- GET    /api/v1/loan/:loan_id/installments
- POST   /api/v1/loan/:loan_id/pay-installment

## Endpoints faltantes

- Qualquer endpoint não listado acima (ex: refresh token, webhooks, etc).

## Observações

- Os dados são mockados e não persistem entre execuções.
- O JWT retornado é fictício e serve apenas para simular autenticação.


## Exemplos de requisições curl

### 1. Cadastro de usuário
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
	-H "Content-Type: application/json" \
	-d '{"email":"ana@example.com","password":"senha123","nome_completo":"Ana Teste","tipo_entidade":"PF"}'
```

### 2. Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"ana@example.com","password":"senha123"}'
```
O token será retornado no campo `token` da resposta.

### 3. Consultar perfil (autenticado)
```bash
curl -X GET http://localhost:8000/api/v1/user/profile \
	-H "Authorization: Bearer <TOKEN_AQUI>"
```

### 4. Consultar saldo da carteira
```bash
curl -X GET http://localhost:8000/api/v1/wallet/balance \
	-H "Authorization: Bearer <TOKEN_AQUI>"
```

### 5. Histórico de transações
```bash
curl -X GET http://localhost:8000/api/v1/transaction/history \
	-H "Authorization: Bearer <TOKEN_AQUI>"
```

### 6. Criar oferta de crédito
```bash
curl -X POST http://localhost:8000/api/v1/marketplace/offers \
	-H "Authorization: Bearer <TOKEN_AQUI>" \
	-H "Content-Type: application/json" \
	-d '{"valor_maximo":1000,"juros_taxa_anual":10,"prazo_meses":12,"score_minimo_exigido":600,"setor_elegivel":"Tech"}'
```

### 7. Aceitar oferta de crédito
```bash
curl -X POST http://localhost:8000/api/v1/marketplace/accept-offer/<OFFER_ID> \
	-H "Authorization: Bearer <TOKEN_AQUI>"
```

### 8. Criar busca ativa por crédito
```bash
curl -X POST http://localhost:8000/api/v1/marketplace/searches \
	-H "Authorization: Bearer <TOKEN_AQUI>" \
	-H "Content-Type: application/json" \
	-d '{"valor_desejado":500,"juros_maximo_aceito":12,"prazo_desejado":6}'
```

### 9. Listar empréstimos do usuário
```bash
curl -X GET http://localhost:8000/api/v1/loan/my-loans \
	-H "Authorization: Bearer <TOKEN_AQUI>"
```

### 10. Listar parcelas de um empréstimo
```bash
curl -X GET http://localhost:8000/api/v1/loan/<LOAN_ID>/installments \
	-H "Authorization: Bearer <TOKEN_AQUI>"
```

### 11. Pagar parcela de empréstimo
```bash
curl -X POST http://localhost:8000/api/v1/loan/<LOAN_ID>/pay-installment \
	-H "Authorization: Bearer <TOKEN_AQUI>" \
	-H "Content-Type: application/json" \
	-d '{"parcela_id":"<PARCELA_ID>","valor_pago":100}'
```

Troque `<TOKEN_AQUI>`, `<OFFER_ID>`, `<LOAN_ID>`, `<PARCELA_ID>` pelos valores reais retornados nas respostas anteriores.