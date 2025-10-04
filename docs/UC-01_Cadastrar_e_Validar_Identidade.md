**ID:** UC-01

**Atores:** Novo Usuário (potencial Credor ou Mutuário)

**Descrição:** Este caso de uso descreve o processo de um novo usuário se registrar na plataforma e completar a verificação de identidade (KYC/KYB) para poder transacionar.

**Pré-condições:** O usuário deve possuir um e-mail válido e os documentos necessários para a verificação (CPF para 'PF', CNPJ para 'PJ').

**Fluxo Principal:**

1. O usuário acessa a plataforma e inicia o processo de cadastro.
2. O usuário preenche o formulário com seus dados, incluindo nome completo/razão social, e-mail e tipo de entidade ('PF' ou 'PJ').
3. O sistema cria o registro do usuário na tabela `USUARIO` com `kyc_status` definido como 'PENDING'.
4. O usuário é direcionado para iniciar o processo de validação de identidade.
5. O sistema, através de uma integração com um serviço externo, realiza a verificação de identidade (KYC/KYB).
6. Após a confirmação bem-sucedida, o sistema atualiza o `kyc_status` do usuário para 'VERIFIED'.

**Fluxos Alternativos/Exceções:**

*   **5a.** Se a verificação de identidade falhar, o `kyc_status` do usuário é atualizado para 'FAILED'. O usuário é informado e pode ser solicitado a reenviar a documentação.

**Pós-condições:**

*   O usuário possui uma conta na plataforma com status 'VERIFIED' e está habilitado a realizar operações financeiras.
*   Uma `CARTEIRA` é criada e associada ao `user_id`.
