# Design

## Context

A aplicação frontend possui o formulário de cadastro de eventos na rota `/event/new`, implementado pelo componente `EventForm` (`frontend/src/app/components/event-form/event-form.tsx`) utilizando `react-hook-form`. 

Os campos do formulário possuem identificadores semânticos:
- `#event-name`: Nome do evento (`input[type="text"]`)
- `#event-address`: Endereço (`input[type="text"]`)
- `#event-capacity`: Capacidade (`input[type="number"]`)
- `#event-date`: Data do evento (`input[type="date"]`)
- `button[type="submit"]`: Botão de envio com o texto "Cadastrar Evento"
- `span#*-error`: Mensagens de erro de validação
- `div#event-form-success`: Alerta de sucesso exibido após a resposta favorável da API

Atualmente, o projeto possui as dependências do Cypress instaladas (`cypress` e `@nx/cypress`), mas necessita da estrutura de testes e arquivos de suporte para executar as validações de ponta a ponta (E2E) com fidelidade e sem dependência de bibliotecas de terceiros ou ferramentas de IA.

## Goals / Non-Goals

**Goals:**
- Implementar a suíte de testes E2E com Cypress no arquivo `frontend-e2e/src/e2e/event-registration.cy.ts`.
- Validar o fluxo de sucesso: preenchimento de todos os campos obrigatórios via seletores convencionais (`#id`, `name`, `class`), submissão e confirmação de sucesso com `#event-form-success`.
- Validar o fluxo de erro: tentativa de submissão do formulário vazio e asserção da renderização das mensagens nativas de erro de validação (`#event-name-error`, `#event-address-error`, `#event-capacity-error`, `#event-date-error`).
- Utilizar exclusivamente comandos nativos da API do Cypress (`cy.visit()`, `cy.get()`, `cy.contains()`, `.type()`, `.should()`, `cy.intercept()`).
- Assegurar a configuração necessária para o Cypress no monorepo Nx (`cypress.config.ts` e suporte a TypeScript em `frontend-e2e`).

**Non-Goals:**
- Não utilizar plugins externos ou ferramentas de IA (como ZeroStep ou Cypress AI).
- Não alterar a lógica de produção do `EventForm` nem contratos de DTOs existentes.
- Não remover ou sobrescrever os testes do Playwright existentes em `frontend-e2e`.

## Decisions

### 1. Localização e Nomenclatura da Suíte E2E
- **Decisão**: Criar o arquivo em `frontend-e2e/src/e2e/event-registration.cy.ts`.
- **Alternativas consideradas**: `apps/frontend-e2e/...` (a estrutura do monorepo é plana na raiz, portanto a localização canônica é `frontend-e2e/src/e2e/`).
- **Motivo**: Mantém alinhamento com a convenção do Nx e isola os testes Cypress dos arquivos `*.spec.ts` do Playwright.

### 2. Disparo de Validações em Formulário Vazio
- **Decisão**: Utilizar `cy.get('form').submit()` para disparar a submissão do formulário vazio.
- **Alternativas consideradas**: Clicar no botão com `{ force: true }` ou disparar eventos de `blur` em cada campo.
- **Motivo**: Como o botão possui `disabled={!isValid}`, o Cypress respeita a acessibilidade por padrão e previne cliques convencionais. O comando `cy.get('form').submit()` dispara o evento de submissão diretamente no formulário, acionando o handler do `react-hook-form` que gera e exibe todas as mensagens de erro de validação simultaneamente de forma limpa e idiomática.

### 3. Interceptação da API com `cy.intercept`
- **Decisão**: Utilizar `cy.intercept('POST', '**/api/event*', ...)` para isolar o teste E2E e validar o status de submissão de forma determinística.
- **Alternativas consideradas**: Depender exclusivamente da API NestJS em execução real com banco em memória.
- **Motivo**: `cy.intercept` garante que o teste seja resiliente a oscilações de rede, dados pré-existentes ou ambiente de CI, permitindo ainda validar o payload enviado no corpo da requisição.

### 4. Configuração de Suporte do Cypress
- **Decisão**: Criar ou ajustar `frontend-e2e/cypress.config.ts` e arquivos de suporte mínimos (`cypress/support/e2e.ts`) com `baseUrl: 'http://localhost:3000'` e padrão de busca `src/e2e/**/*.cy.{ts,js}`.
- **Motivo**: Garante que o comando `npx cypress run` ou o plugin do Nx executem a suíte sem fricção.

## Risks / Trade-offs

- **[Risco] Botão desabilitado bloqueia clique direto no cenário de erro** → **Mitigação**: Disparar `cy.get('form').submit()`, que aciona o fluxo de validação completa do `react-hook-form` exibindo as mensagens nativas esperadas.
- **[Risco] Colisão entre TypeScript do Playwright e Cypress** → **Mitigação**: Configurar o `tsconfig.json` do `frontend-e2e` para incluir os tipos do Cypress sem interferir nas definições globais do Playwright.
- **[Risco] Variação na porta de desenvolvimento do frontend (3000 vs 3300)** → **Mitigação**: Definir `baseUrl: 'http://localhost:3000'` como padrão no Cypress, permitindo sobrescrita via variável de ambiente `CYPRESS_BASE_URL`.
