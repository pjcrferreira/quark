**ID:** UC-04

**Atores:** Usuário (Credor ou Mutuário)

**Descrição:** Um usuário transfere fundos de sua carteira digital para a carteira de outro usuário dentro da plataforma.

**Pré-condições:** O usuário está autenticado, com status 'VERIFIED', e possui saldo disponível (`saldo_disponivel`) maior ou igual ao valor da transferência.

**Fluxo Principal:**

1. O usuário acessa a funcionalidade de transferência P2P em seu dashboard.
2. O usuário informa o ID do destinatário e o valor a ser transferido.
3. O sistema valida se o saldo do usuário é suficiente.
4. O sistema executa a transação de forma atômica: debita o valor da carteira de origem e credita na carteira de destino.
5. O sistema cria um registro imutável na tabela `TRANSACAO` com o tipo 'P2P_DEBITO' para fins de auditoria.
6. O sistema exibe uma confirmação de "Transferência realizada" para o usuário.

**Fluxos Alternativos/Exceções:**

*   **3a.** Se o saldo for insuficiente, a transação é bloqueada e o usuário é notificado.
*   **2a.** Se o ID do destinatário for inválido, o sistema informa o erro ao usuário.

**Pós-condições:** O saldo das carteiras de origem e destino são atualizados, e a transação é registrada de forma permanente.
