**ID:** UC-03

**Ator:** Mutuário

**Descrição:** Um usuário Mutuário encontra uma oferta de crédito compatível no marketplace, aceita os termos, formaliza o empréstimo e recebe o valor em sua carteira digital.

**Pré-condições:** O Mutuário está autenticado e com status 'VERIFIED'. Existe pelo menos uma oferta 'ATIVA' para a qual ele é elegível. O Credor da oferta possui saldo suficiente em sua carteira.

**Fluxo Principal:**

1. O Mutuário acessa a listagem de ofertas do marketplace.
2. O sistema filtra e exibe as ofertas para as quais o score e setor do Mutuário são elegíveis , conforme o diagrama de sequência.
3. O Mutuário seleciona uma oferta e revisa os detalhes.
4. O Mutuário aceita a oferta, disparando o endpoint para criação do empréstimo.
5. O sistema realiza uma transação atômica:
    a. Cria um registro na tabela `EMPRESTIMO` com status 'ATIVO', associando o Credor, o Mutuário e a oferta.
    b. Debita o `valor_concedido` da `CARTEIRA` do Credor e credita na `CARTEIRA` do Mutuário.
    c. Cria os registros correspondentes na tabela `PARCELA`.
6. O sistema atualiza o status da `OFERTA_CREDITO` para 'COMPROMETIDA'.

**Fluxos Alternativos/Exceções:**

*   **4a.** Se o Credor não tiver saldo suficiente no momento da aceitação, a operação é cancelada e o Mutuário é notificado.

**Pós-condições:** Um contrato de empréstimo é formalizado, os fundos são transferidos para o Mutuário, e o cronograma de pagamento é gerado.
