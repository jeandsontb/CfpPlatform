# Proposal

## Why

A plataforma possui a funcionalidade de cadastro de eventos (`/event/new`), permitindo aos organizadores cadastrar locais, capacidade e datas para eventos. Para garantir a confiabilidade dessa interface e prevenir regressões sem depender de intervenção manual ou ferramentas externas de IA, é necessário instituir uma suíte de testes ponta a ponta (E2E) tradicionais com Cypress cobrindo os fluxos críticos de validação de formulário e submissão com sucesso.

## What Changes

- **Testes E2E (Cypress)**: Criação da suíte de testes E2E tradicional em `frontend-e2e/src/e2e/event-registration.cy.ts` cobrindo o fluxo de cadastro de eventos (`/event/new`).
- **Cenário de Sucesso**: Navegação até `/event/new`, preenchimento de todos os campos obrigatórios (Nome, Endereço, Capacidade, Data) utilizando seletores CSS convencionais (`id`, `name`, `class`), submissão do formulário e validação da confirmação de sucesso na tela.
- **Cenário de Erro e Validação**: Navegação até `/event/new`, tentativa de submissão do formulário vazio e asserção da exibição das mensagens de validação obrigatórias na interface.
- **Configuração E2E**: Configuração e alinhamento do Cypress no projeto `frontend-e2e` para execução dos testes baseados exclusivamente na sintaxe tradicional do Cypress (`cy.get()`, `cy.contains()`, `should()`).

## Capabilities

### New Capabilities
- `event-registration`: Cadastro, validação de dados e submissão de locais e datas de eventos através da interface web `/event/new`, assegurando feedback visual imediato e validação dos campos obrigatórios.

### Modified Capabilities
<!-- Nenhuma especificação existente teve seus requisitos prévios alterados -->

## Impact

- **Frontend E2E**: Adição do arquivo de teste `frontend-e2e/src/e2e/event-registration.cy.ts` e configuração do Cypress para suportar a suíte E2E.
- **Frontend App**: Validação do comportamento do componente `EventForm` na rota `/event/new` perante interações de preenchimento e submissão.
- **APIs**: Consumo e/ou interceptação do endpoint `POST /api/event` durante os testes E2E.
