# Design

## Context

O projeto é um Nx Monorepo composto por:
- `api`: Backend NestJS em TypeScript.
- `frontend`: Aplicação Next.js (React 19) com Vitest e ESLint configurados.
- `shared-types`: Biblioteca TypeScript compartilhada exportando o contrato `SpeakerDTO`.

Conforme definido na exploração, a aplicação Next.js existente no monorepo será mantida, adaptando a gestão de estado do formulário para o modelo reativo do React/Next.js, com validação estrita no NestJS via `class-validator` e cobertura de testes unitários em ambos os lados.

## Goals / Non-Goals

**Goals:**
- Implementar o módulo/controller/service de submissão de propostas de palestras (CFP) no NestJS (`api`).
- Validar estritamente o payload recebido via `@Body()` garantindo que campos inválidos ou ausentes retornem HTTP `400 Bad Request`.
- Implementar formulário de submissão de palestras no Next.js (`frontend`) em conformidade com WAI-ARIA e consumindo o contrato `SpeakerDTO`.
- Gerenciar o estado do formulário de forma reativa, mantendo o botão de envio bloqueado no estado inicial e durante a submissão.
- Criar suíte de testes unitários no NestJS validando rejeição de payloads inválidos com status 400.
- Criar suíte de testes unitários no Frontend validando estado inicial e bloqueio do botão de envio.

**Non-Goals:**
- Integração com banco de dados persistente (PostgreSQL, MongoDB); os dados serão gerenciados em memória no serviço para efeito do módulo CFP.
- Autenticação de usuários / palestrantes (foco exclusivo no fluxo de submissão aberta de palestras).
- Criação de uma aplicação Angular secundária (requisito alinhado para Next.js).

## Decisions

### Decisão 1: Implementação da Validação no NestJS
- **Escolha**: Criar a classe `CreateSpeakerDto` no backend implementando a interface `SpeakerDTO` de `@cfp-platform/shared-types`, decorando as propriedades com decorators de `class-validator` (`@IsNotEmpty()`, `@IsEmail()`, `@IsString()`, `@IsBoolean()`).
- **Configuração**: Ativar o `ValidationPipe` do NestJS (com `whitelist: true`, `transform: true` e `forbidNonWhitelisted: true`) para que payloads inválidos sejam rejeitados com HTTP 400 Bad Request.
- **Alternativas consideradas**: Validação ad-hoc manual com schemas Zod ou dentro do controller. O uso de `class-validator` foi escolhido por ser o padrão arquitetural idiomático do NestJS solicitado pelo projeto.

### Decisão 2: Gestão Reativa de Estado no Frontend Next.js
- **Escolha**: Implementar um hook customizado / estado reativo de formulário no React (`useState` / `useActionState` estruturado) que encapsula:
  - Estado dos campos (`values`).
  - Estado de validação e erros por campo (`errors`, `isValid`).
  - Estado de interação e envio (`isSubmitting`, `touched`).
  - Botão de submissão desabilitado quando `!isValid` ou `isSubmitting`.
- **Alternativas consideradas**: Bibliotecas pesadas de formulário (Formik, React Hook Form). O estado nativo e tipado foi preferido para manter simplicidade, zero dependências externas adicionais e controle direto sobre os atributos WAI-ARIA e testes.

### Decisão 3: Acessibilidade WAI-ARIA
- **Escolha**:
  - Labels associados a inputs via `htmlFor`/`id`.
  - Atributos `aria-required="true"` nos campos obrigatórios.
  - Indicador `aria-invalid={!!error}` nos campos com falha de validação.
  - Mensagens de erro com `role="alert"` e associadas ao input por `aria-describedby`.
  - Formulário com `aria-busy={isSubmitting}` durante a requisição.

### Decisão 4: Estratégia de Testes Unitários
- **Backend (`api`)**: Testes unitários com Vitest instanciando o controller/service e validando a rejeição de instâncias de DTO inválidas com mensagens de erro correspondentes e código 400.
- **Frontend (`frontend`)**: Testes unitários com Vitest e `@testing-library/react` validando a renderização do formulário, o estado inicial (com botão desabilitado), validação dos campos após entrada e bloqueio durante submissão.

## Risks / Trade-offs

- **[Dependências class-validator e class-transformer]** → Devem ser adicionadas ao `package.json` para que o NestJS execute a validação em runtime.
- **[Interface TypeScript vs Classes em Runtime]** → A interface `SpeakerDTO` em `shared-types` é puramente estrutural em TypeScript (apagada em tempo de compilação). O backend implementará a interface através da classe `CreateSpeakerDto`, garantindo conformidade de tipo e anotações para runtime.
