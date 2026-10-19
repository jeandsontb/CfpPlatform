# Tasks

## 1. Backend (NestJS) - Endpoint de Listagem

- [x] 1.1 Adicionar o decorator `@Get()` e o método `findAll(): SpeakerDTO[]` no `CfpController` (`api/src/app/cfp/cfp.controller.ts`) chamando `this.cfpService.findAll()`, e atualizar os testes unitários em `api/src/app/cfp/cfp.controller.spec.ts` para validar o retorno da lista de palestras.
- [x] 1.2 Executar a suíte de testes da API via `npx nx test api` e verificar que as rotas de submissão e consulta passam sem falhas.

## 2. Frontend Client & Integração de API

- [x] 2.1 Implementar a função `getCfps(): Promise<SpeakerDTO[]>` no serviço `frontend/src/app/services/cfp-api.ts` com tratamento adequado de erros HTTP e tipagem estrita de `SpeakerDTO`.
- [x] 2.2 Criar ou atualizar os testes do serviço da API verificando cenários de sucesso e resposta com erro na recuperação das palestras.

## 3. Componente CfpDashboard & Design Tokens

- [x] 3.1 Criar o componente `CfpDashboard` (`frontend/src/app/components/cfp-dashboard/cfp-dashboard.tsx` e arquivo de exportação `index.ts`) com `'use client'`, gerenciando o estado com `useState<SpeakerDTO[]>`, `useEffect` para fetch, tratamento de loading (`aria-busy`), tratamento de erro acessível e renderização de estado vazio.
- [x] 3.2 Criar o arquivo de estilos `frontend/src/app/components/cfp-dashboard/cfp-dashboard.module.css` implementando HTML semântico (tabela responsiva ou cards semânticos) aplicando rigorosamente a identidade visual e os Design Tokens do `CfpForm` e `page.module.css`.
- [x] 3.3 Adicionar testes unitários para o `CfpDashboard` verificando exibição das palestras submetidas, badge de GDE e estado vazio.

## 4. Roteamento Next.js & Navegação Bidirecional

- [x] 4.1 Criar a página de rota Next.js App Router em `frontend/src/app/dashboard/page.tsx` com cabeçalho, container consistente e botão de navegação de retorno para a rota raiz (`/`).
- [x] 4.2 Adicionar botão de navegação (`next/link`) na página de submissão (`frontend/src/app/page.tsx` ou componente `CfpForm`) direcionando para `/dashboard`, mantendo a harmonia visual.
- [x] 4.3 Executar build e testes do monorepo (`npx nx run-many -t test,build`) confirmando que todos os pacotes compilam e passam nos testes.
