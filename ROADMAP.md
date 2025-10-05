# Roadmap Quark

## Objetivo do Projeto
Como usuário, quero acessar uma plataforma de crédito peer-to-peer, com experiência fluida e visual consistente, para investir, tomar crédito, acompanhar carteira e transações, simulando um marketplace de crédito semelhante ao mercado de ações.

---

## Etapa 1: Autenticação e Cadastro
**Objetivo:** Permitir login e registro de usuários, com fluxo de KYC integrado.
- **Arquivos relevantes:**
  - src/pages/LoginPage.tsx
  - src/pages/RegisterPage.tsx
  - src/context/AuthContext.tsx
  - src/services/auth.ts
  - backend/mock/index.js
- **História de usuário:**
  - Como novo usuário, quero me registrar e validar minha identidade para acessar a plataforma.
  - Como usuário existente, quero fazer login e acessar meu dashboard.

---

## Etapa 2: Rotas protegidas e navegação
**Objetivo:** Proteger rotas sensíveis e garantir navegação entre login, registro, dashboard e perfil.
- **Arquivos relevantes:**
  - src/App.tsx
  - src/pages/LoginPage.tsx
  - src/pages/RegisterPage.tsx
  - src/pages/UserProfilePage.tsx
  - src/context/AuthContext.tsx
- **História de usuário:**
  - Como usuário autenticado, quero acessar o dashboard e meu perfil.
  - Como visitante, quero ser redirecionado ao login se tentar acessar áreas protegidas.

---

## Etapa 3: Integração e formato dos mocks
**Objetivo:** Garantir que os dados mockados do frontend estejam em conformidade com o backend mock, e vice-versa.
- **Arquivos relevantes:**
  - src/services/*.ts
  - src/components/WalletBalance.tsx
  - src/components/TransactionHistory.tsx
  - backend/mock/index.js
- **História de usuário:**
  - Como desenvolvedor, quero que os formatos de dados usados no frontend sejam aceitos e retornados corretamente pelo backend mock, evitando erros de integração.

---

## Etapa 4: Transferência Peer-to-Peer
**Objetivo:** Implementar fluxo de transferência entre usuários, tanto no frontend quanto no backend mock.
- **Arquivos relevantes:**
  - src/components/transfer.tsx
  - src/services/transactions.ts
  - backend/mock/index.js
- **História de usuário:**
  - Como usuário, quero transferir saldo para outro usuário da plataforma e ver a transação refletida no histórico.

---

## Etapa 5: Marketplace de Crédito como Mercado de Ações
**Objetivo:** Evoluir o marketplace para permitir negociação dinâmica de ofertas, visualização de "livro de ofertas" e simulação de book de ordens.
- **Arquivos relevantes:**
  - src/components/credit-marketplace.tsx
  - src/services/marketplace.ts
  - backend/mock/index.js
- **História de usuário:**
  - Como investidor, quero ver ofertas de crédito em tempo real, aceitar, negociar e visualizar histórico de negociações, como em um mercado de ações.

---


## Próximos Passos Imediatos
1. Extrair e documentar o formato dos mocks atuais do frontend (tipos/shape dos dados) e garantir compatibilidade com o backend mock.
2. Planejar e implementar endpoint/fluxo de transferência P2P no backend mock.
3. Planejar evolução do marketplace para simular um book de ofertas (ordens de compra/venda, histórico, etc).

4. Ajustar e aprimorar o visual das páginas de autenticação (LoginPage e RegisterPage)
   - Contexto: As páginas de login e cadastro já seguem um padrão visual moderno, mas podem ser aprimoradas para maior apelo visual, clareza e acessibilidade.
   - Arquivos relevantes: src/pages/LoginPage.tsx, src/pages/RegisterPage.tsx
   - Buscar inspiração nos arquivos de Dashboard e Transactions
   - Critérios de aceitação:
     - Inputs com ícones e feedback visual de foco/erro.
     - Botões com animação de loading e estados claros.
     - Layout responsivo e centralizado, com melhor contraste e espaçamento.
     - Mensagens de erro/sucesso mais visuais e acessíveis.
     - Alternância entre login e registro ainda mais destacada.
     - Manter consistência com o restante do app.

5. Correções visuais e UX nas páginas de autenticação
   - Corrigir bordas dos cards de login e registro para ficarem arredondadas e consistentes com o restante do app.
   - Ajustar os inputs de email e senha para usarem o componente Input do design system, removendo opacidade e mantendo o visual padrão dos outros campos do projeto.
   - Implementar uma tela de carregamento (splash/loading) global, exibida enquanto o app/carregamento inicial está em progresso, evitando glitches visuais e melhorando a experiência do usuário.
   - Critérios de aceitação:
     - Cards de autenticação com bordas arredondadas e sombra suave.
     - Inputs de email/senha visualmente idênticos aos usados no dashboard e demais formulários.
     - Splash/loading exibido durante carregamento inicial do app, sumindo ao finalizar.

> Atualize este roadmap a cada novo planejamento ou etapa concluída.

---

## Diretriz de Planejamento e Uso do Roadmap

**Toda vez que for planejada uma mudança, o planejamento detalhado deve ser registrado na seção de "Próximos Passos Imediatos" deste ROADMAP.md.**

### Como o agente deve agir:
- Antes de implementar qualquer alteração, registre o planejamento detalhado no ROADMAP.md, na seção de próximos passos.
- Use sempre o roadmap como fonte de verdade para embasar decisões, priorizar tarefas e garantir rastreabilidade.
- Ao receber novas instruções do usuário, atualize o roadmap antes de executar ações.
- Marque tarefas como concluídas assim que finalizadas, mantendo o histórico claro.

### Como configurar o modo de agente do VSCode para seguir esta diretriz:
1. **Adote o ROADMAP.md como documento central de planejamento.**
2. **Sempre consulte e atualize o roadmap antes de tomar decisões ou iniciar implementações.**
3. **Ao planejar novas features, bugs ou melhorias, registre-as como próximos passos no roadmap, detalhando contexto, arquivos e critérios de aceitação.**
4. **Utilize o roadmap para justificar e documentar todas as ações do agente, garantindo transparência e rastreabilidade.**
5. **Mantenha o roadmap atualizado e sincronizado com o progresso real do projeto.**

> **Resumo:** O roadmap é a base para toda tomada de decisão do agente. Nenhuma mudança deve ser feita sem antes ser planejada e registrada aqui.
