# Frontend Quark

Frontend React para o Quark.

## Como rodar

```bash
cd frontend
npm install
npm run dev
```

Acesse http://localhost:5173

## Configuração

- O frontend espera que a API esteja disponível em `http://localhost:8000` (veja `.env`).
- Para testar com o mock server, rode o backend mock conforme instruções na pasta `backend/mock`.

## Funcionalidades integradas

- Cadastro e login de usuário (POST /api/v1/auth/register, /api/v1/auth/login)
- Consulta de perfil (GET /api/v1/user/profile)
- Consulta de saldo (GET /api/v1/wallet/balance)
- Histórico de transações (GET /api/v1/transaction/history)
- Criação e aceitação de ofertas (POST /api/v1/marketplace/offers, /accept-offer/:id)
- Busca ativa por crédito (POST /api/v1/marketplace/searches)
- Listagem de empréstimos e parcelas (GET /api/v1/loan/my-loans, /loan/:id/installments)
- Pagamento de parcela (POST /api/v1/loan/:id/pay-installment)

## Funcionalidades faltantes

- Upload de documentos KYC real
- Websockets/polling para atualização em tempo real
- Integração com backend real e persistência
- Validações avançadas de formulário
  # painel financeiro

  This is a code bundle for painel financeiro. The original project is available at https://www.figma.com/design/nxVv3PsV6hv9I7L7yWOx0k/painel-financeiro.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  