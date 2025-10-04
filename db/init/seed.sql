-- seed.sql
-- Gera alguns usuários de teste (PF e PJ)
INSERT INTO usuario (user_id, tipo_entidade, nome_completo, nome_fantasia, email, cpf_cnpj_hash, data_fundacao_nasc, score_credito, setor_atuacao, regiao, kyc_status)
VALUES
  (gen_random_uuid(), 'PF', 'Ana Silva', NULL, 'ana.silva@example.com', encode(digest('11122233344','sha256'), 'hex'), '1990-05-12', 720, 'Tech', 'SP', 'VERIFIED'),
  (gen_random_uuid(), 'PF', 'Bruno Costa', NULL, 'bruno.costa@example.com', encode(digest('22233344455','sha256'), 'hex'), '1985-11-02', 610, 'Agronegócio', 'MG', 'PENDING'),
  (gen_random_uuid(), 'PJ', 'AgroAlpha Ltda', 'AgroAlpha', 'contato@agroalpha.com', encode(digest('12345678000199','sha256'), 'hex'), '2010-03-15', 650, 'Agronegócio', 'RS', 'VERIFIED');

-- Cria carteiras para os usuários (liga por user_id)
INSERT INTO carteira (carteira_id, user_id_fk, saldo_disponivel, status)
SELECT gen_random_uuid(), user_id, CASE
    WHEN email = 'ana.silva@example.com' THEN 10000.00
    WHEN email = 'bruno.costa@example.com' THEN 250.00
    WHEN email = 'contato@agroalpha.com' THEN 50000.00
    ELSE 0 END, 'ativa'
FROM usuario
WHERE email IN ('ana.silva@example.com','bruno.costa@example.com','contato@agroalpha.com');

-- Transações de exemplo (P2P: Ana -> Bruno)
WITH origem AS (
  SELECT carteira_id AS id FROM carteira c JOIN usuario u ON u.user_id = c.user_id_fk WHERE u.email = 'ana.silva@example.com'
),
destino AS (
  SELECT carteira_id AS id FROM carteira c JOIN usuario u ON u.user_id = c.user_id_fk WHERE u.email = 'bruno.costa@example.com'
)
INSERT INTO transacao (transacao_id, tipo, valor, origem_carteira_id_fk, destino_carteira_id_fk, descricao)
SELECT gen_random_uuid(), 'P2P_DEBITO', 200.00, o.id, d.id, 'Transferência P2P: Ana -> Bruno'
FROM origem o, destino d;

-- Atualiza saldos para refletir a transação (exemplo; em app real: transação dentro de tx)
UPDATE carteira SET saldo_disponivel = saldo_disponivel - 200.00
WHERE user_id_fk = (SELECT user_id FROM usuario WHERE email = 'ana.silva@example.com');

UPDATE carteira SET saldo_disponivel = saldo_disponivel + 200.00
WHERE user_id_fk = (SELECT user_id FROM usuario WHERE email = 'bruno.costa@example.com');

-- Oferta de crédito (AgroAlpha cria oferta)
INSERT INTO oferta_credito (oferta_id, credor_user_id_fk, valor_maximo, juros_taxa_anual, prazo_meses, score_minimo_exigido, setor_elegivel, data_expiracao, status)
VALUES (gen_random_uuid(), (SELECT user_id FROM usuario WHERE email='contato@agroalpha.com'), 100000.00, 9.5, 24, 600, 'Agronegócio', now() + interval '30 days', 'ATIVA');

-- Busca de crédito (Bruno busca 500)
INSERT INTO busca_credito (busca_id, mutuario_user_id_fk, valor_desejado, juros_maximo_aceito, prazo_desejado, data_expiracao, status)
VALUES (gen_random_uuid(), (SELECT user_id FROM usuario WHERE email='bruno.costa@example.com'), 500.00, 12.0, 12, now() + interval '15 days', 'ATIVA');

-- Simula um empréstimo gerado a partir de oferta/busca
INSERT INTO emprestimo (emprestimo_id, oferta_id_fk, busca_id_fk, mutuario_user_id_fk, credor_user_id_fk, valor_concedido, juros_acordado, data_contrato, status)
VALUES (
  gen_random_uuid(),
  (SELECT oferta_id FROM oferta_credito WHERE credor_user_id_fk = (SELECT user_id FROM usuario WHERE email='contato@agroalpha.com') LIMIT 1),
  (SELECT busca_id FROM busca_credito WHERE mutuario_user_id_fk = (SELECT user_id FROM usuario WHERE email='bruno.costa@example.com') LIMIT 1),
  (SELECT user_id FROM usuario WHERE email='bruno.costa@example.com'),
  (SELECT user_id FROM usuario WHERE email='contato@agroalpha.com'),
  500.00,
  11.0,
  now(),
  'ATIVO'
);

-- Cria 3 parcelas para o empréstimo
WITH e AS (
  SELECT emprestimo_id FROM emprestimo WHERE mutuario_user_id_fk = (SELECT user_id FROM usuario WHERE email='bruno.costa@example.com') ORDER BY data_contrato DESC LIMIT 1
)
INSERT INTO parcela (parcela_id, emprestimo_id_fk, numero_parcela, data_vencimento, valor_parcela, status)
SELECT gen_random_uuid(), e.emprestimo_id, seq, (current_date + (seq * interval '30 days'))::date, ROUND((500.00/3)::numeric,2), 'PENDENTE'
FROM e, generate_series(1,3) AS seq;

-- Cria um registro de transação do emprestimo (emprestimo concedido: AgroAlpha -> Bruno)
WITH cred AS (SELECT c.carteira_id FROM carteira c JOIN usuario u ON u.user_id = c.user_id_fk WHERE u.email='contato@agroalpha.com'),
     mutu AS (SELECT c.carteira_id FROM carteira c JOIN usuario u ON u.user_id = c.user_id_fk WHERE u.email='bruno.costa@example.com'),
     emp AS (SELECT emprestimo_id FROM emprestimo WHERE mutuario_user_id_fk = (SELECT user_id FROM usuario WHERE email='bruno.costa@example.com') LIMIT 1)
INSERT INTO transacao (transacao_id, tipo, valor, origem_carteira_id_fk, destino_carteira_id_fk, referencia_entidade_id, descricao)
SELECT gen_random_uuid(), 'EMPRESTIMO_CONCEDIDO', 500.00, cred.carteira_id, mutu.carteira_id, emp.emprestimo_id, 'Empréstimo concedido AgroAlpha -> Bruno'
FROM cred, mutu, emp;

-- Atualiza saldos para refletir empréstimo
UPDATE carteira SET saldo_disponivel = saldo_disponivel - 500.00
WHERE user_id_fk = (SELECT user_id FROM usuario WHERE email='contato@agroalpha.com');

UPDATE carteira SET saldo_disponivel = saldo_disponivel + 500.00
WHERE user_id_fk = (SELECT user_id FROM usuario WHERE email='bruno.costa@example.com');
