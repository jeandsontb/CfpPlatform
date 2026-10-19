# Tasks

## 1. Dependências e Preparação do Backend

- [ ] 1.1 Adicionar dependências `class-validator` e `class-transformer` e verificar a resolução no workspace através de `npm ls class-validator class-transformer`.
- [ ] 1.2 Configurar `ValidationPipe` global ou escopado no NestJS (`api`) com opções de validação estrita (`whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`).
- [ ] 1.3 Habilitar CORS em `api/src/main.ts` com `app.enableCors()` para permitir requisições HTTP originadas do frontend para a porta 3300.

## 2. Implementação do Backend (NestJS em `api`) e Testes de Validação

- [ ] 2.1 Criar a classe `CreateSpeakerDto` em `api/src/app/cfp/dto/create-speaker.dto.ts` implementando o contrato `SpeakerDTO` de `@cfp-platform/shared-types` com decorators de validação (`@IsNotEmpty`, `@IsEmail`, `@IsString`, `@IsBoolean`).
- [ ] 2.2 Implementar o serviço `CfpService` e o controlador `CfpController` em `api/src/app/cfp/` com endpoint `POST` (`/api/cfp` ou `/api/speakers`) recebendo `@Body() dto: CreateSpeakerDto` e retornando status `201 Created`.
- [ ] 2.3 Implementar testes unitários para o `CfpController` e validação do DTO garantindo que payloads válidos sejam aceitos e payloads inválidos (campos ausentes ou tipos incorretos) disparem `400 Bad Request`.
- [ ] 2.4 Executar e validar a suíte de testes unitários do backend através de `npx nx test api`.

## 3. Implementação do Formulário no Frontend (Next.js em `frontend`) e Acessibilidade

- [x] 3.1 Implementar a gestão de estado reativa do formulário de submissão consumindo o contrato `SpeakerDTO`, controlando o estado inicial, validação dos campos e bloqueio de envio.
- [x] 3.2 Desenvolver o componente de formulário de submissão (`CfpForm`) com acessibilidade WAI-ARIA (`htmlFor`/`id`, `aria-required`, `aria-invalid`, `aria-describedby` para erros e `aria-busy` no carregamento).
- [x] 3.3 Integrar o componente de formulário na aplicação Next.js com conexão HTTP para a rota de submissão da API e feedback visual de envio.
- [ ] 3.4 Limpar `frontend/src/app/page.tsx` removendo toda a estrutura demonstrativa antiga do template Nx (welcome, hero, learning materials, SVGs), deixando exclusivamente a apresentação focada no formulário `CfpForm`.
- [ ] 3.5 Configurar o endpoint do frontend em `frontend/src/app/services/cfp-api.ts` para consumir a rota do backend na porta 3300 (`http://localhost:3300/api/cfp`).

## 4. Testes Unitários do Frontend

- [x] 4.1 Criar testes unitários para o formulário no Frontend validando o estado inicial limpo e confirmando que o botão de submissão permanece bloqueado/desabilitado.
- [x] 4.2 Criar testes unitários validando a liberação do botão após preenchimento válido e o bloqueio durante o processo de submissão.
- [x] 4.3 Executar e validar os testes unitários do frontend através de `npx nx test frontend`.
- [ ] 4.4 Atualizar testes em `frontend/specs/index.spec.tsx` para validar a renderização limpa da página com o formulário de CFP.
- [ ] 4.5 Executar e validar a suíte completa de testes unitários do frontend através de `npx nx test frontend`.

## 5. Verificação do Monorepo

- [ ] 5.1 Executar a validação completa de lint e compilação do monorepo através de `npx nx run-many -t lint,test,build`.
