const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 8000;

// In-memory store
const users = [];
const wallets = {};
const transactions = {};
const offers = [];
const loans = {};

// Helpers
function genId(prefix='id') { return prefix + '_' + Math.random().toString(36).slice(2,9); }

// Health
app.get('/api/v1/health', (req,res) => res.json({ ok: true }));

// Auth: register
app.post('/api/v1/auth/register', (req,res) => {
  const { email, password, nome_completo, tipo_entidade } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email/password required' });
  if (users.find(u => u.email === email)) return res.status(409).json({ message: 'user exists' });
  const user = { user_id: genId('u'), email, nome_completo, tipo_entidade: tipo_entidade || 'PF', score_credito: 600, kyc_status: 'PENDING' };
  users.push(user);
  // create wallet
  wallets[user.user_id] = { carteira_id: genId('w'), user_id_fk: user.user_id, saldo_disponivel: 0 };
  return res.status(201).json({ user_id: user.user_id });
});

// Auth: login (returns fake token)
app.post('/api/v1/auth/login', (req,res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'invalid credentials' });
  // return token and user id
  const token = 'mock-token-' + user.user_id;
  return res.json({ token, user_id: user.user_id });
});

// Profile
app.get('/api/v1/user/profile', (req,res) => {
  const auth = req.headers.authorization || '';
  const id = auth.split('-').pop();
  const user = users.find(u => u.user_id === id) || users[0];
  if (!user) return res.status(401).json({ message: 'unauth' });
  return res.json(user);
});

// Start KYC
app.post('/api/v1/user/kyc/start', (req,res) => {
  return res.json({ status: 'started' });
});

// Wallet balance
app.get('/api/v1/wallet/balance', (req,res) => {
  const auth = req.headers.authorization || '';
  const id = auth.split('-').pop();
  const user = users.find(u => u.user_id === id) || users[0];
  const w = wallets[user.user_id] || { carteira_id: genId('w'), user_id_fk: user.user_id, saldo_disponivel: 1000 };
  return res.json({ balance: w.saldo_disponivel });
});

// Transactions history
app.get('/api/v1/transaction/history', (req,res) => {
  const auth = req.headers.authorization || '';
  const id = auth.split('-').pop();
  const user = users.find(u => u.user_id === id) || users[0];
  const txs = transactions[user.user_id] || [ { transacao_id: genId('t'), timestamp_utc: new Date().toISOString(), tipo: 'P2P_DEBITO', valor: 200, descricao: 'Mock transfer' } ];
  return res.json(txs);
});

// Marketplace: create offer
app.post('/api/v1/marketplace/offers', (req,res) => {
  const payload = req.body;
  const offer = { oferta_id: genId('offer'), ...payload, status: 'ATIVA' };
  offers.push(offer);
  return res.status(201).json(offer);
});

// accept offer
app.post('/api/v1/marketplace/accept-offer/:offerId', (req,res) => {
  const { offerId } = req.params;
  const offer = offers.find(o => o.oferta_id === offerId);
  if (!offer) return res.status(404).json({ message: 'offer not found' });
  const loan = { emprestimo_id: genId('loan'), oferta_id_fk: offer.oferta_id, valor_concedido: offer.valor_maximo || 0, juros_acordado: offer.juros_taxa_anual || 0, status: 'ATIVO' };
  loans[loan.emprestimo_id] = loan;
  return res.json(loan);
});

// marketplace searches
app.post('/api/v1/marketplace/searches', (req,res) => {
  const payload = req.body;
  const search = { busca_id: genId('search'), ...payload, status: 'ATIVA' };
  return res.status(201).json(search);
});

app.get('/api/v1/marketplace/matches/:searchId', (req,res) => {
  return res.json([]);
});

// Loans endpoints
app.get('/api/v1/loan/my-loans', (req,res) => {
  return res.json(Object.values(loans));
});

app.get('/api/v1/loan/:loanId/installments', (req,res) => {
  const { loanId } = req.params;
  const loan = loans[loanId];
  if (!loan) return res.status(404).json({ message: 'loan not found' });
  const installments = [ { parcela_id: genId('p'), numero_parcela: 1, valor_parcela: loan.valor_concedido || 0, status: 'PENDENTE' } ];
  return res.json(installments);
});

app.post('/api/v1/loan/:loanId/pay-installment', (req,res) => {
  const { loanId } = req.params;
  const loan = loans[loanId];
  if (!loan) return res.status(404).json({ message: 'loan not found' });
  return res.json({ ok: true });
});

// Seed a default user so frontend can login
users.push({ user_id: 'u_default', email: 'test@example.com', nome_completo: 'Test User', tipo_entidade: 'PF', score_credito: 700, kyc_status: 'VERIFIED' });
wallets['u_default'] = { carteira_id: 'w_default', user_id_fk: 'u_default', saldo_disponivel: 1000 };
transactions['u_default'] = [ { transacao_id: genId('t1'), timestamp_utc: new Date().toISOString(), tipo: 'EMPRESTIMO_CONCEDIDO', valor: 500, descricao: 'Mock loan' } ];

app.listen(PORT, () => console.log('Mock server listening on', PORT));
