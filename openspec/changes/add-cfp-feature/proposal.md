# Proposal

## Why

A plataforma CFP necessita de um fluxo estruturado e confiável para que palestrantes possam submeter propostas de palestras (Call for Papers). Esta funcionalidade estabelece o primeiro ponto de contato dos palestrantes com o evento, demandando validação estrita dos dados para evitar submissões inconsistentes e uma interface acessível e responsiva.

## What Changes

- **Backend (NestJS em `api`)**:
  - Criação do módulo/controlador/serviço para recebimento de submissões de palestras (ex: `POST /api/speakers` ou `POST /api/cfp`).
  - Habilitação de CORS no NestJS (`main.ts`) para aceitar requisições originadas do frontend na porta 3300.
  - Validação estrita do payload via `@Body()` utilizando `class-validator` e `class-transformer`, baseando-se nas propriedades do `SpeakerDTO`.
  - Retorno HTTP 400 Bad Request com mensagens de erro descritivas para payloads inválidos ou incompletos.
  - Testes unitários garantindo a rejeição de requisições com dados inválidos (400) e aceitação de dados válidos.

- **Frontend (Next.js em `frontend`)**:
  - Remoção de toda a estrutura demonstrativa antiga do template Nx (`page.tsx`), deixando apenas a interface limpa com o formulário de CFP.
  - Configuração do frontend para consumir a rota do backend na porta 3300 (`http://localhost:3300/api/cfp`).
  - Implementação do formulário de submissão de palestras consumindo o contrato tipado `SpeakerDTO` de `@cfp-platform/shared-types`.
  - Gerenciamento reativo de estado do formulário e submissão, mantendo estado inicial limpo e bloqueando o botão de envio em caso de formulário inválido ou submissão em andamento.
  - Conformidade com padrões WAI-ARIA para acessibilidade (rótulos acessíveis, feedback de erro via `aria-describedby` e `aria-invalid`, estados via `aria-busy` e `aria-disabled`).
  - Testes unitários validando o estado inicial dos seletores de estado, validação dos campos e bloqueio/desbloqueio do botão de envio.

- **Shared (`shared-types`)**:
  - Reutilização e consumo do contrato `SpeakerDTO` exportado em `@cfp-platform/shared-types` por ambas as aplicações.

## Capabilities

### New Capabilities
- `cfp-submission`: Fluxo de submissão e validação de propostas de palestras para o Call for Papers via API NestJS e interface Next.js.

### Modified Capabilities
*(Nenhuma capacidade pré-existente alterada)*

## Impact

- **APIs e Contratos**: Nova rota HTTP `POST` no backend consumindo e validando o contrato `SpeakerDTO`, exposta na porta 3300 com CORS habilitado.
- **Dependências Backend**: Adição de `class-validator` e `class-transformer` em `package.json` para suportar validação de DTOs no NestJS.
- **Frontend**: Limpeza da página inicial (`page.tsx`) removendo o template padrão do Nx, configuração do consumo da API na porta 3300 em `cfp-api.ts` e testes unitários associados.
