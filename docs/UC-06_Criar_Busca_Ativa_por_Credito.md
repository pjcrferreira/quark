**UC-06: Criar Busca Ativa por Crédito**
**ID:** UC-06

**Atores:** Mutuário (ator principal), Credor (ator secundário)

**Descrição:** Um Mutuário, em vez de procurar ofertas existentes, cria uma "busca" ou "demanda" por crédito com suas condições ideais. Credores podem então visualizar essas buscas e identificar oportunidades de empréstimo que se alinham às suas estratégias de investimento.

**Pré-condições:** O Mutuário está autenticado e com o kyc_status como 'VERIFIED'.

**Fluxo Principal:**

1.  O Mutuário navega para a seção do marketplace e escolhe a opção para "Buscar Crédito" ou "Criar Demanda".
2.  O Mutuário preenche um formulário especificando o `valor_desejado`, o `juros_maximo_aceito` e o `prazo_desejado`. Esta ação corresponde ao endpoint `POST /api/v1/marketplace/searches`.
3.  O sistema valida os dados e cria um novo registro na tabela `BUSCA_CREDITO` com o status 'ATIVA'.
4.  O sistema confirma ao Mutuário que sua busca por crédito foi criada com sucesso.
5.  Posteriormente, um Credor autenticado pode consultar as buscas ativas que correspondem aos seus critérios de investimento, utilizando uma funcionalidade da plataforma que interage com o endpoint `GET /api/v1/marketplace/matches/{search_id}`.

**Fluxos Alternativos/Exceções:**

*   **3a.** Se os dados fornecidos pelo Mutuário forem inválidos, o sistema exibirá uma mensagem de erro, e a busca não será criada.

**Pós-condições:**

*   Uma nova busca por crédito está ativa e visível para os Credores na plataforma.
