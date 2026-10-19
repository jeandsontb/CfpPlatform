# Proposal

## Why

Atualmente a plataforma permite a submissão de palestras via formulário CFP, porém organizadores e palestrantes não possuem uma interface para consultar e visualizar as propostas já cadastradas. Esta alteração introduz um Dashboard de palestras e a rota de consulta necessária na API, permitindo acompanhar em tempo real as submissões realizadas mantendo a consistência visual e a robustez arquitetural do monorepo.

## What Changes

- **Backend (NestJS)**: Adição do endpoint `GET /api/cfp` (e `/api/speakers`) no `CfpController`, consumindo o método já existente `CfpService.findAll()` para retornar uma lista tipada de `SpeakerDTO[]`.
- **Frontend Service**: Adição da função `getCfps(): Promise<SpeakerDTO[]>` no serviço `frontend/src/app/services/cfp-api.ts`.
- **Frontend Component**: Criação do componente `CfpDashboard` com gerenciamento de estado (`useState<SpeakerDTO[]>`), consumo da rota `GET` via fetch e layout responsivo e acessível (cards ou tabela semântica).
- **Roteamento Next.js**: Criação da rota `/dashboard` através do arquivo `frontend/src/app/dashboard/page.tsx` exibindo o `CfpDashboard`.
- **Navegação & UX**: Adição de link de navegação (`next/link`) no cabeçalho ou formulário da página principal (`/`) para o `/dashboard`, e botão de retorno no dashboard para o formulário, respeitando estritamente a identidade visual e os Design Tokens do projeto.

## Capabilities

### New Capabilities
- `cfp-dashboard`: Consulta e visualização centralizada das palestras submetidas ao CFP, com suporte a recuperação de dados via API REST e interface semântica consistente.

### Modified Capabilities
<!-- Nenhuma especificação existente teve seus requisitos prévios alterados -->

## Impact

- **Backend**: `api/src/app/cfp/cfp.controller.ts` passará a expor a rota HTTP GET além de POST.
- **Frontend**: Novos arquivos `frontend/src/app/dashboard/page.tsx`, `frontend/src/app/components/cfp-dashboard/` e extensão de `frontend/src/app/services/cfp-api.ts`.
- **Tipos Compartilhados**: Reutilização integral da interface `SpeakerDTO` de `@cfp-platform/shared-types`.
