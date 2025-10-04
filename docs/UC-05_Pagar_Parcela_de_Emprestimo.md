**ID:** UC-05

**Ator:** Mutuário

**Descrição:** O Mutuário realiza o pagamento de uma parcela de um empréstimo ativo, transferindo os fundos para o Credor.

**Pré-condições:** O Mutuário possui um empréstimo com status 'ATIVO' e parcelas com status 'PENDENTE'. O Mutuário possui saldo suficiente em sua carteira para cobrir o valor da parcela.

**Fluxo Principal:**

1. O Mutuário acessa a área "Meus Empréstimos" e seleciona um empréstimo ativo.
2. O sistema exibe o cronograma de parcelas detalhado.
3. O Mutuário seleciona uma parcela 'PENDENTE' e aciona a opção de pagar.
4. O sistema valida o saldo na carteira do Mutuário.
5. O sistema executa uma transação atômica:
    a. Debita o `valor_parcela` da carteira do Mutuário.
    b. Credita o `valor_parcela` na carteira do Credor.
6. O sistema atualiza o status da `PARCELA` para 'PAGO' e registra a `data_pagamento` e o `valor_pago`.
7. O sistema cria um registro na tabela `TRANSACAO` com o tipo 'PAGAMENTO_PARCELA'.

**Fluxos Alternativos/Exceções:**

*   **4a.** Se o saldo do Mutuário for insuficiente, o pagamento é negado e ele é notificado.

**Pós-condições:** A parcela é marcada como paga, os fundos são transferidos para o Credor e a obrigação do Mutuário referente àquela parcela é cumprida.
