# Design

## Context

A plataforma monorepo Nx é composta por uma API NestJS (`api`), um frontend Next.js App Router (`frontend`) e uma biblioteca compartilhada de tipos (`shared-types`).

Atualmente:
- O backend possui `CfpController` mapeado nas rotas `/api/cfp` e `/api/speakers`, porém apenas com o verbo `@Post()`. O `CfpService` já armazena submissões em memória e contém o método `findAll(): SpeakerDTO[]`.
- O frontend possui a página inicial (`frontend/src/app/page.tsx`) com o componente `CfpForm`, estilizado via CSS Modules (`cfp-form.module.css` e `page.module.css`) com design tokens escuros e cartões com tipografia moderna.
- A comunicação com o backend é concentrada em `frontend/src/app/services/cfp-api.ts`.

Veja `proposal.md` para a motivação completa desta alteração.

## Goals / Non-Goals

**Goals:**
- Expor a rota `@Get()` no `CfpController` retornando `SpeakerDTO[]` chamando `CfpService.findAll()`.
- Criar a função `getCfps(): Promise<SpeakerDTO[]>` em `frontend/src/app/services/cfp-api.ts`.
- Criar o componente `CfpDashboard` com gerenciamento de estado via `useState<SpeakerDTO[]>`, tratamento de estados (carregando, lista vazia, erro e listagem com dados) e tipagem rigorosa.
- Renderizar as palestras com HTML semântico (lista semântica de cards ou tabela acessível) adotando integralmente os mesmos Design Tokens de `page.module.css` e `cfp-form.module.css`.
- Criar a página de rota Next.js em `frontend/src/app/dashboard/page.tsx`.
- Integrar navegação fluida com `next/link` entre a página principal e o dashboard.

**Non-Goals:**
- Não persistir dados em banco de dados externo (manter persistência em memória do serviço).
- Não alterar interfaces existentes em `@cfp-platform/shared-types`.
- Não implementar filtros avançados ou paginação nesta iteração.

## Decisions

### 1. Endpoint HTTP GET no CfpController
- **Escolha**: Adicionar `@Get()` ao `CfpController` invocando `this.cfpService.findAll()`.
- **Justificativa**: Aproveita a implementação já existente e testada no serviço NestJS, mantendo o padrão RESTful.
- **Alternativas consideradas**: Criar um controller separado para o dashboard, rejeitado por violar o princípio de simplicidade e coesão do módulo `CfpModule`.

### 2. Client Component com React Hooks no CfpDashboard
- **Escolha**: Implementar `CfpDashboard` como `'use client'` utilizando `useState<SpeakerDTO[]>`, `useEffect` e controle de loading/error.
- **Justificativa**: Atende diretamente aos requisitos expressos pelo usuário ("Gerenciar o estado com React Hooks (useState<SpeakerDTO[]>), tipado com o SpeakerDTO da lib shared-types") e viabiliza feedback visual interativo imediato.
- **Alternativas consideradas**: Server Component puro com `fetch` assíncrono direto no componente de página, descartado para cumprir a diretriz explícita de controle de estado reativo com hooks.

### 3. Layout Semântico e Design Tokens
- **Escolha**: Utilizar layout semântico composto por cartões (`<article>` e `<section>`) ou tabela (`<table>`) com cabeçalhos acessíveis, empregando CSS Modules (`cfp-dashboard.module.css`) que herdam os tokens visuais já aplicados em `cfp-form.module.css` (fundo `#0f172a`, card `#ffffff` ou translúcido/dark-card, destaques azuis `#2563eb`, tags de badge para GDE `#60a5fa`, estados de loading).
- **Justificativa**: Garante consistência visual absoluta com o formulário original, sem discrepâncias estilísticas.

### 4. Navegação Bidirecional com next/link
- **Escolha**: Adicionar um botão de link discreto e elegante no header/container da página inicial apontando para `/dashboard`, e um botão correspondente no dashboard para retornar ao `/`.
- **Justificativa**: Proporciona navegação SPA nativa do Next.js sem recarregamento da página, preservando a experiência do usuário.

## Risks / Trade-offs

- **[Dados em memória]** → Reiniciar o servidor da API limpa a lista de palestras submetidas.
  - *Mitigação*: Comportamento esperado para o estágio atual do projeto em desenvolvimento.
- **[Sincronização em abas diferentes]** → Submissões feitas em outra aba exigem recarregar a visualização.
  - *Mitigação*: Incluir um botão de recarregar/atualizar dados no cabeçalho do Dashboard para conveniência do usuário.
