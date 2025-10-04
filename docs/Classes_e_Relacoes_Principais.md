**Classes e Relações Principais**
As classes representam as principais entidades do sistema, mapeadas diretamente da estrutura do banco de dados proposta.

**Classes:**

*   **USUARIO:** Representa a entidade central que pode ser um Credor ou um Mutuário.
    *   **Atributos:** `user_id`, `tipo_entidade` ('PF' ou 'PJ'), `nome_completo`, `email`, `cpf_cnpj_hash`, `score_credito`, `kyc_status`.
*   **CARTEIRA:** Representa a conta financeira de cada usuário na plataforma.
    *   **Atributos:** `carteira_id`, `user_id_fk`, `saldo_disponivel`, `status` ('ativa', 'bloqueada').
*   **OFERTA_CREDITO:** Modela a proposta de empréstimo criada por um Credor.
    *   **Atributos:** `oferta_id`, `credor_user_id_fk`, `valor_maximo`, `juros_taxa_anual`, `prazo_meses`, `score_minimo_exigido`.
*   **BUSCA_CREDITO:** Modela a solicitação de empréstimo criada por um Mutuário.
    *   **Atributos:** `busca_id`, `mutuario_user_id_fk`, `valor_desejado`, `juros_maximo_aceito`, `prazo_desejado`.
*   **EMPRESTIMO:** Representa o contrato de empréstimo formalizado entre um Credor e um Mutuário.
    *   **Atributos:** `emprestimo_id`, `oferta_id_fk`, `mutuario_user_id_fk`, `credor_user_id_fk`, `valor_concedido`, `juros_acordado`, `status` ('ATIVO', 'PAGO', 'DEFAULT').
*   **PARCELA:** Modela cada uma das prestações de um contrato de empréstimo.
    *   **Atributos:** `parcela_id`, `emprestimo_id_fk`, `numero_parcela`, `data_vencimento`, `valor_parcela`, `status` ('PENDENTE', 'PAGO', 'ATRASO').
*   **TRANSACAO:** Registro imutável de todas as movimentações financeiras na plataforma.
    *   **Atributos:** `transacao_id`, `timestamp_utc`, `tipo`, `valor`, `origem_carteira_id_fk`, `destino_carteira_id_fk`.
