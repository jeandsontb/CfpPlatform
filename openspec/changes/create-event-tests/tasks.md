# Tasks

## 1. Configuração do Cypress no Projeto E2E

- [x] 1.1 Criar a configuração do Cypress em `frontend-e2e/cypress.config.ts` definindo `baseUrl` apontando para o frontend (`http://localhost:3000`), `specPattern` para `src/e2e/**/*.cy.{js,jsx,ts,tsx}` e arquivo de suporte básico em `frontend-e2e/cypress/support/e2e.ts`, verificando que o Cypress carrega as configurações sem erros.
- [x] 1.2 Atualizar `frontend-e2e/tsconfig.json` para incluir as definições de tipos do Cypress e o padrão de arquivos `src/e2e/**/*.cy.ts`, verificando a compilação de tipos TypeScript sem conflitos.

## 2. Implementação dos Testes E2E de Cadastro de Eventos

- [x] 2.1 Criar o arquivo `frontend-e2e/src/e2e/event-registration.cy.ts` e implementar o Cenário de Sucesso: visitar `/event/new`, interceptar o `POST` para a API de eventos (`/api/event*`), preencher os campos (Nome, Endereço, Capacidade e Data) utilizando seletores CSS convencionais (`#event-name`, `#event-address`, `#event-capacity`, `#event-date`), submeter através do botão `button[type="submit"]` e verificar a exibição da mensagem de sucesso (`#event-form-success`) usando asserções tradicionais `should()`.
- [x] 2.2 Implementar o Cenário de Erro no mesmo arquivo: visitar `/event/new`, submeter o formulário vazio através de `cy.get('form').submit()` e validar com asserções tradicionais do Cypress (`cy.get()`, `cy.contains()`, `should('be.visible')`) a presença das mensagens de erro nativas para todos os campos obrigatórios (`#event-name-error`, `#event-address-error`, `#event-capacity-error` e `#event-date-error`).

## 3. Execução e Validação da Suíte

- [x] 3.1 Executar os testes E2E com Cypress via terminal e verificar a passagem completa de todos os testes sem falhas e sem uso de bibliotecas de terceiros ou IA.
