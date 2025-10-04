-- schema.sql
-- Habilita extensão para gerar UUIDs e funções criptográficas
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tipos enum
CREATE TYPE IF NOT EXISTS kyc_status_enum AS ENUM ('PENDING', 'VERIFIED', 'FAILED');
CREATE TYPE IF NOT EXISTS tipo_entidade_enum AS ENUM ('PF', 'PJ');
CREATE TYPE IF NOT EXISTS carteira_status_enum AS ENUM ('ativa', 'bloqueada');
CREATE TYPE IF NOT EXISTS transacao_tipo_enum AS ENUM ('P2P_DEBITO', 'EMPRESTIMO_CONCEDIDO', 'PAGAMENTO_PARCELA');

-- Tabela USUARIO
CREATE TABLE IF NOT EXISTS usuario (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo_entidade tipo_entidade_enum NOT NULL,
  nome_completo VARCHAR(255) NOT NULL,
  nome_fantasia VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  cpf_cnpj_hash VARCHAR(128) NOT NULL,
  data_fundacao_nasc DATE,
  data_cadastro TIMESTAMPTZ DEFAULT now(),
  score_credito INTEGER,
  setor_atuacao VARCHAR(120),
  regiao VARCHAR(120),
  kyc_status kyc_status_enum DEFAULT 'PENDING'
);

-- Tabela CARTEIRA
CREATE TABLE IF NOT EXISTS carteira (
  carteira_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id_fk UUID UNIQUE REFERENCES usuario(user_id) ON DELETE CASCADE,
  saldo_disponivel NUMERIC(15,2) DEFAULT 0.00,
  status carteira_status_enum DEFAULT 'ativa',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela TRANSACAO (ledger imutável)
CREATE TABLE IF NOT EXISTS transacao (
  transacao_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp_utc TIMESTAMPTZ DEFAULT now(),
  tipo transacao_tipo_enum NOT NULL,
  valor NUMERIC(15,2) NOT NULL CHECK (valor >= 0),
  origem_carteira_id_fk UUID REFERENCES carteira(carteira_id),
  destino_carteira_id_fk UUID REFERENCES carteira(carteira_id),
  referencia_entidade_id UUID,
  descricao TEXT
);

-- Tabela OFERTA_CREDITO
CREATE TABLE IF NOT EXISTS oferta_credito (
  oferta_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  credor_user_id_fk UUID REFERENCES usuario(user_id) ON DELETE SET NULL,
  valor_maximo NUMERIC(15,2) NOT NULL,
  juros_taxa_anual NUMERIC(5,2) NOT NULL,
  prazo_meses INTEGER NOT NULL,
  score_minimo_exigido INTEGER,
  setor_elegivel VARCHAR(120),
  data_expiracao TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'ATIVA'
);

-- Tabela BUSCA_CREDITO
CREATE TABLE IF NOT EXISTS busca_credito (
  busca_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mutuario_user_id_fk UUID REFERENCES usuario(user_id) ON DELETE SET NULL,
  valor_desejado NUMERIC(15,2) NOT NULL,
  juros_maximo_aceito NUMERIC(5,2),
  prazo_desejado INTEGER,
  data_expiracao TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'ATIVA'
);

-- Tabela EMPRESTIMO
CREATE TABLE IF NOT EXISTS emprestimo (
  emprestimo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  oferta_id_fk UUID REFERENCES oferta_credito(oferta_id),
  busca_id_fk UUID REFERENCES busca_credito(busca_id),
  mutuario_user_id_fk UUID REFERENCES usuario(user_id),
  credor_user_id_fk UUID REFERENCES usuario(user_id),
  valor_concedido NUMERIC(15,2),
  juros_acordado NUMERIC(5,2),
  data_contrato TIMESTAMPTZ DEFAULT now(),
  status VARCHAR(20) DEFAULT 'ATIVO'
);

-- Tabela PARCELA
CREATE TABLE IF NOT EXISTS parcela (
  parcela_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  emprestimo_id_fk UUID REFERENCES emprestimo(emprestimo_id) ON DELETE CASCADE,
  numero_parcela INTEGER NOT NULL,
  data_vencimento DATE,
  valor_parcela NUMERIC(15,2),
  valor_pago NUMERIC(15,2) DEFAULT 0,
  data_pagamento TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'PENDENTE'
);

-- Índices úteis
CREATE INDEX IF NOT EXISTS idx_usuario_email ON usuario(email);
CREATE INDEX IF NOT EXISTS idx_carteira_user ON carteira(user_id_fk);
CREATE INDEX IF NOT EXISTS idx_transacao_timestamp ON transacao(timestamp_utc);
