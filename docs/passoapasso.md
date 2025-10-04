# Passo a Passo Detalhado: UC-01 - Cadastrar e Validar Identidade

## Visão Geral

Este documento detalha o passo a passo para a implementação do caso de uso **UC-01: Cadastrar e Validar Identidade**. O objetivo é guiar o desenvolvimento do backend, frontend e a integração com serviços externos para o processo de cadastro e verificação de identidade de novos usuários na plataforma Quark.

## Tecnologias Propostas

*   **Backend:** Node.js com Express.js (com base no arquivo `dependencias_node.json`).
*   **Banco de Dados:** PostgreSQL (sugerido pela estrutura relacional das classes).
*   **Frontend:** React (uma escolha moderna e popular para interfaces de usuário).
*   **Serviço de KYC:** Integração com uma API de verificação de identidade (ex: Serpro, ClearSale, ou um serviço de mock para desenvolvimento).

---

## Detalhamento da Implementação

### Backend

#### 1. Configuração do Ambiente de Desenvolvimento

*   **Tarefa:** Inicializar o projeto Node.js e instalar as dependências principais.
*   **Passos:**
    1.  Crie um diretório `backend` na raiz do projeto.
    2.  Dentro de `backend`, execute `npm init -y` para criar um `package.json`.
    3.  Instale as dependências: `npm install express pg cors dotenv`.
        *   `express`: Para criar o servidor e as rotas da API.
        *   `pg`: Driver para conectar com o banco de dados PostgreSQL.
        *   `cors`: Para permitir requisições do frontend.
        *   `dotenv`: Para gerenciar variáveis de ambiente (chaves de API, senhas de banco de dados).

#### 2. Modelagem e Configuração do Banco de Dados

*   **Tarefa:** Criar as tabelas `USUARIO` e `CARTEIRA` e configurar a conexão.
*   **Passos:**
    1.  Crie um arquivo de script SQL (`schema.sql`) para definir a estrutura das tabelas:
        ```sql
        CREATE TYPE kyc_status_enum AS ENUM ('PENDING', 'VERIFIED', 'FAILED');
        CREATE TYPE tipo_entidade_enum AS ENUM ('PF', 'PJ');

        CREATE TABLE USUARIO (
            user_id SERIAL PRIMARY KEY,
            tipo_entidade tipo_entidade_enum NOT NULL,
            nome_completo VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            cpf_cnpj_hash VARCHAR(255) NOT NULL, -- Armazenar o hash, não o dado bruto
            score_credito INTEGER,
            kyc_status kyc_status_enum DEFAULT 'PENDING',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE CARTEIRA (
            carteira_id SERIAL PRIMARY KEY,
            user_id_fk INTEGER UNIQUE REFERENCES USUARIO(user_id),
            saldo_disponivel NUMERIC(15, 2) DEFAULT 0.00,
            status VARCHAR(50) DEFAULT 'ativa',
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        ```
    2.  Crie um arquivo de configuração (`db.js`) para gerenciar a conexão com o banco de dados usando o `pg`.

#### 3. Desenvolvimento da API REST

*   **Tarefa:** Criar os endpoints para o cadastro e consulta de status.
*   **Passos:**
    1.  **Endpoint `POST /api/v1/users/register`**:
        *   **Lógica:**
            1.  Receber `nome_completo`, `email`, `tipo_entidade`, e `cpf_cnpj` do corpo da requisição.
            2.  Validar os dados (e.g., formato do e-mail, campos não nulos).
            3.  Gerar um hash do `cpf_cnpj` antes de salvar.
            4.  Inserir o novo usuário na tabela `USUARIO` com `kyc_status` = `'PENDING'`.
            5.  Retornar o `user_id` e uma mensagem de sucesso.
            6.  **Importante:** Não disparar o processo de KYC aqui. Ele será um passo separado.
    2.  **Endpoint `POST /api/v1/users/{id}/initiate-kyc`**:
        *   **Lógica:**
            1.  Receber o `id` do usuário como parâmetro.
            2.  Chamar o serviço de integração com a API de KYC (ver próximo item).
            3.  O processo de KYC é assíncrono. O serviço externo notificará o backend sobre o resultado através de um webhook.
    3.  **Endpoint (Webhook) `POST /api/v1/kyc/webhook`**:
        *   **Lógica:**
            1.  Endpoint a ser consumido pelo serviço externo de KYC.
            2.  Receber o `user_id` e o resultado da verificação (`status`: 'VERIFIED' ou 'FAILED').
            3.  Atualizar o `kyc_status` do usuário no banco de dados.
            4.  **Se `kyc_status` for 'VERIFIED'**:
                *   Criar uma nova entrada na tabela `CARTEIRA` associada ao `user_id`.
                *   Potencialmente, enviar um e-mail ao usuário informando sobre a aprovação.

#### 4. Serviço de Integração KYC

*   **Tarefa:** Criar um módulo para se comunicar com a API de KYC.
*   **Passos:**
    1.  Crie um arquivo `kycService.js`.
    2.  Implemente uma função `startKycProcess(userData)` que:
        *   Recebe os dados do usuário.
        *   Formata os dados conforme a documentação da API de KYC.
        *   Faz a chamada HTTP para a API externa, enviando os dados e o `webhook_url` para notificação.
        *   Armazene a chave da API de KYC de forma segura usando `dotenv`.

---

### Frontend (React)

#### 1. Estrutura de Pastas e Arquivos

*   **Tarefa:** Organizar o projeto React.
*   **Passos:**
    1.  Use `create-react-app` ou Vite para inicializar o projeto: `npx create-react-app frontend`.
    2.  Crie uma estrutura de pastas como:
        ```
        /src
        |-- /components   # Componentes reutilizáveis (Button, Input, etc.)
        |-- /pages        # Páginas da aplicação (RegisterPage, KycStatusPage)
        |-- /services     # Funções de chamada à API (api.js)
        |-- /hooks        # Hooks customizados
        ```

#### 2. Componentes da UI de Cadastro

*   **Tarefa:** Criar o formulário de registro.
*   **Passos:**
    1.  Crie a página `RegisterPage.js`.
    2.  Dentro dela, crie um formulário com os campos:
        *   `nome_completo` (input de texto)
        *   `email` (input de email)
        *   `cpf_cnpj` (input de texto com máscara)
        *   `tipo_entidade` (radio button ou select com 'Pessoa Física' e 'Pessoa Jurídica')
    3.  Implemente a validação de formulário no lado do cliente (e.g., campos obrigatórios, formato de e-mail).

#### 3. Comunicação com a API

*   **Tarefa:** Conectar o formulário ao backend.
*   **Passos:**
    1.  Crie um arquivo `services/api.js` para centralizar as chamadas de API (usando `axios` ou `fetch`).
    2.  Na submissão do formulário em `RegisterPage.js`:
        *   Chame a função do `api.js` que faz a requisição `POST /api/v1/users/register`.
        *   Ao receber a resposta de sucesso, redirecione o usuário para uma página de "próximos passos" ou "status de verificação".

#### 4. Página de Status de KYC

*   **Tarefa:** Criar uma página que informa o usuário sobre o status da verificação.
*   **Passos:**
    1.  Crie a página `KycStatusPage.js`.
    2.  Esta página pode mostrar mensagens como:
        *   "Seu cadastro foi recebido! Estamos validando seus dados..." (`PENDING`)
        *   "Verificação concluída com sucesso! Você já pode usar a plataforma." (`VERIFIED`)
        *   "Houve um problema na verificação. Por favor, verifique seus dados e tente novamente." (`FAILED`)
    3.  A página pode fazer polling (consultas periódicas) a um endpoint `GET /api/v1/users/{id}/status` para atualizar o status em tempo real, ou ser atualizada via WebSockets.

---

### Testes

#### 1. Testes de Unidade (Backend)

*   **Framework:** Jest ou Mocha.
*   **O que testar:**
    *   Validações de dados nos modelos.
    *   Lógica de hash de CPF/CNPJ.
    *   Funções puras.

#### 2. Testes de Integração (Backend)

*   **Framework:** Supertest com Jest.
*   **O que testar:**
    *   O fluxo completo do endpoint `POST /api/v1/users/register` (requisição -> inserção no banco).
    *   O fluxo do webhook, simulando uma chamada do serviço de KYC.

#### 3. Testes de Componentes (Frontend)

*   **Framework:** React Testing Library com Jest.
*   **O que testar:**
    *   Renderização correta do formulário de registro.
    *   Validação de campos e exibição de mensagens de erro.

#### 4. Testes End-to-End (E2E)

*   **Framework:** Cypress ou Playwright.
*   **Cenário de teste:**
    1.  Navegar para a página de registro.
    2.  Preencher e submeter o formulário.
    3.  Verificar se o usuário é redirecionado para a página de status.
    4.  Simular a resposta do webhook no backend e verificar se a UI na página de status é atualizada para "VERIFIED".


1. Integração do Serviço de KYC (Know Your Customer)
O KYC não é opcional; é a porta de entrada para qualquer operação financeira e um requisito regulatório. Sua implementação deve ocorrer logo no início do desenvolvimento.

Localização no Plano: Fase 1 (Core de Usuários e Transacional)
Passo a Passo Detalhado:

Fase 0 - Pesquisa e Contratação:

Ação: A equipe de produto/negócios, com apoio técnico, deve pesquisar, selecionar e contratar um provedor de KYC/KYB brasileiro.

Estrutura: Obter acesso ao ambiente de sandbox do provedor e às suas chaves de API. Esta etapa é um pré-requisito para o desenvolvimento.

Fase 1 - Desenvolvimento (Backend):

Criação do Módulo de Serviço: Dentro do backend (quark-backend), será criado um novo módulo: /app/services/kyc_service.py.

Abstração (Adapter Pattern): A estrutura dentro deste módulo não fará chamadas diretas à API do provedor. Em vez disso, criaremos uma classe de "adaptador" (ex: KYCManager). Isso permite que, para o ambiente de desenvolvimento local, possamos usar um mock (um simulador) do serviço.

Estrutura (Mock): A classe MockKYCAdapter terá um método como iniciar_verificacao(user_id). Para fins de teste, este método simplesmente alterará o kyc_status do usuário no banco de dados para 'VERIFIED' após um tempo simulado.


Implementação do Endpoint: O endpoint POST /api/v1/user/kyc/start  será implementado. Sua única responsabilidade é chamar o método 

iniciar_verificacao() do KYCManager.

Lógica de Bloqueio: Os endpoints transacionais (como o de transferência P2P) serão modificados para verificar o kyc_status do usuário. Se o status não for 'VERIFIED', a API retornará um erro 403 Forbidden, impedindo a transação.

Fase 1 - Desenvolvimento (Frontend):

Estrutura de UI: Serão criados componentes React para gerenciar o fluxo de KYC:

KYCStatusBanner.jsx: Um banner que informa ao usuário seu status atual (PENDING, FAILED) e o orienta sobre os próximos passos.

KYCUploadForm.jsx: Um formulário para o usuário enviar os documentos necessários, que fará a chamada para o endpoint do backend.

Controle de Acesso: A lógica do frontend usará o AuthContext para verificar o kyc_status do usuário. Funcionalidades como "Transferir" ou "Criar Oferta" ficarão desabilitadas até que o status seja 'VERIFIED'.

Final da Fase 1 - Integração Real:

Ação: O MockKYCAdapter no backend é substituído pelo RealKYCAdapter, que conterá a lógica real para se comunicar com a API do provedor de KYC contratado, enviando os dados e tratando os webhooks de resposta para atualizar o kyc_status do usuário.

2. Implementação do Apache Kafka (Ledger e Arquitetura de Eventos)
Kafka é um componente de arquitetura para garantir desacoplamento e escalabilidade. Introduzi-lo muito cedo pode retardar a entrega do MVP. Portanto, sua implementação é estratégica e faseada.

Localização no Plano: Fase 3 (Ciclo de Vida do Empréstimo) e Pós-MVP
Passo a Passo Detalhado:

Fase 0 e 1 - Preparação da Infraestrutura:

Estrutura: O arquivo docker-compose.yml já incluirá os serviços para kafka e zookeeper. Isso significa que, desde o início, o ambiente de desenvolvimento local já terá o Kafka disponível, mesmo que a aplicação ainda não o utilize.

Fase 1 e 2 - MVP Funcional SEM Kafka:

Ação: Durante as fases iniciais, a tabela TRANSACAO no PostgreSQL atuará como o ledger primário e suficiente para a validação do MVP. As operações (transferência, aceite de oferta) serão síncronas e dependerão unicamente do COMMIT no PostgreSQL.

Justificativa: Esta abordagem permite entregar o fluxo de negócio principal de forma mais rápida e com menor complexidade.

Fase 3 - Introdução da Publicação de Eventos (Ledger Imutável):

Ação: A implementação de Kafka começa aqui, no lado do produtor.

Estrutura (Backend):

No Wallet & P2P Service, após uma transação ser confirmada com sucesso no PostgreSQL (depois do db.commit()), o serviço irá construir uma mensagem (evento) e publicá-la em um tópico Kafka.

Tópico Kafka: transacoes_financeiras

Estrutura do Evento (JSON):

JSON

{
  "evento_id": "uuid",
  "tipo_evento": "PAGAMENTO_PARCELA_REALIZADO",
  "timestamp_utc": "2025-10-04T15:37:26Z",
  "dados": {
    "transacao_id_db": 12345,
    "emprestimo_id": 678,
    "parcela_id": 910,
    "carteira_origem": "uuid_mutuario",
    "carteira_destino": "uuid_credor",
    "valor": 250.75
  }
}

Resultado: Neste ponto, o Kafka já está funcionando como um ledger de eventos imutável e auditável, cumprindo um de seus objetivos primários no escopo.


Fase 4 (Pós-MVP) - Implementação do Consumo de Eventos (Desacoplamento):

Ação: Agora, outros serviços começam a consumir os eventos para reagir a eles de forma assíncrona.

Estrutura (Backend):

O Credit & Score Service implementará um worker ou consumer do Kafka.

Este worker irá "escutar" o tópico transacoes_financeiras.

Ao receber um evento como PAGAMENTO_PARCELA_REALIZADO, ele irá disparar a lógica interna para recalcular o score_credito do usuário envolvido.


Resultado: O cálculo do score, que não é crítico para o sucesso da transação em si, agora ocorre de forma desacoplada, exatamente como descrito no fluxo do escopo. Isso torna a API de pagamento mais rápida e o sistema como um todo mais resiliente