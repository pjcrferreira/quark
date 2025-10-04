**ID:** UC-02

**Ator:** Credor

**Descrição:** Um usuário Credor cria e publica uma oferta de crédito no marketplace, definindo os termos sob os quais está disposto a emprestar fundos.

**Pré-condições:** O Credor deve estar autenticado na plataforma e possuir o status 'VERIFIED'.

**Fluxo Principal:**

1. O Credor acessa a área do marketplace e seleciona a opção para criar uma nova oferta.
2. O Credor preenche o formulário com os termos da oferta: valor máximo, taxa de juros anual, prazo em meses e o score de crédito mínimo exigido do mutuário.
3. O sistema valida os dados da oferta, conforme ilustrado no diagrama de sequência.
4. O sistema persiste a nova oferta na tabela `OFERTA_CREDITO` com o status 'ATIVA' , tornando-a visível para mutuários elegíveis.
5. O sistema exibe uma mensagem de sucesso para o Credor, confirmando a criação da oferta.

**Fluxos Alternativos/Exceções:**

*   **3a.** Se os dados forem inválidos (ex: taxa de juros negativa), o sistema exibirá uma mensagem de erro e não criará a oferta.

**Pós-condições:** A nova oferta de crédito está disponível no marketplace para ser consultada e aceita por mutuários que atendam aos critérios.
