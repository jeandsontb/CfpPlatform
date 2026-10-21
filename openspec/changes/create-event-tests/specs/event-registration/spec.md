# Spec Delta

## Purpose

Permite o cadastro e a validação de locais e datas de eventos na plataforma, assegurando integridade e feedback aos organizadores através de fluxos validados por testes ponta a ponta (E2E).

## ADDED Requirements

### Requirement: Cadastro de evento com dados válidos
O sistema SHALL permitir o preenchimento dos campos obrigatórios (nome, endereço, capacidade e data) e concluir a submissão do evento, apresentando confirmação de sucesso na interface.

#### Scenario: Submissão de evento com sucesso
- **WHEN** o usuário acessa `/event/new`, preenche todos os campos com dados válidos e clica no botão de submissão
- **THEN** o formulário é enviado com sucesso e a interface exibe a mensagem de confirmação do cadastro

### Requirement: Validação de campos obrigatórios no formulário de evento
O sistema SHALL validar a presença e o formato dos campos obrigatórios do evento, exibindo mensagens de erro específicas para campos não preenchidos ou inválidos.

#### Scenario: Exibição de mensagens de erro ao tentar submeter formulário vazio
- **WHEN** o usuário acessa `/event/new` e submete o formulário com os campos vazios
- **THEN** o sistema exibe mensagens de erro de validação para cada um dos campos obrigatórios (nome, endereço, capacidade e data)

### Requirement: Verificação E2E via Cypress com seletores convencionais
A suíte de testes E2E SHALL validar os fluxos da interface utilizando exclusivamente a sintaxe tradicional do Cypress (`cy.get`, `cy.contains`, `should`) e seletores CSS convencionais (`id`, `name`, `class`), sem ferramentas externas de IA.

#### Scenario: Execução dos testes automatizados de ponta a ponta
- **WHEN** a suíte de testes E2E do Cypress for executada no projeto `frontend-e2e`
- **THEN** os cenários de sucesso e validação de erros do formulário de eventos são executados e validados por asserções nativas
