# Spec Delta

## Purpose

Permite que palestrantes submetam propostas de palestras (Call for Papers) com validação estrita de dados e interface acessível.

## ADDED Requirements

### Requirement: Submissão de palestra com payload válido
O sistema SHALL permitir a submissão de uma nova proposta de palestra contendo os dados do palestrante de acordo com o contrato SpeakerDTO e persistir/registrar a proposta com sucesso.

#### Scenario: Submissão com sucesso
- **WHEN** o cliente envia uma requisição `POST` com todos os campos válidos (`id`, `name`, `email`, `talkTitle`, `isGDE`)
- **THEN** a API responde com status `201 Created` e retorna o registro da proposta cadastrada

### Requirement: Validação estrita e rejeição de dados inválidos
A API SHALL validar estritamente todos os campos recebidos no corpo da requisição e rejeitar payloads com formato inválido, tipos incorretos ou campos obrigatórios ausentes.

#### Scenario: Rejeição de payload com dados inválidos
- **WHEN** o cliente envia uma requisição `POST` com email inválido ou campos obrigatórios ausentes
- **THEN** a API rejeita a requisição respondendo com status `400 Bad Request` e detalhamento dos erros de validação

### Requirement: Controle de estado e bloqueio de submissão no formulário
O formulário de submissão do frontend SHALL manter o estado de envio e validação, bloqueando o botão de envio quando o formulário estiver em estado inválido ou durante uma submissão em andamento.

#### Scenario: Estado inicial com botão de envio bloqueado
- **WHEN** o formulário é carregado inicialmente com campos vazios
- **THEN** o botão de envio permanece desabilitado/bloqueado para evitar submissão prematura

#### Scenario: Bloqueio durante submissão em andamento
- **WHEN** o usuário clica para submeter um formulário com dados válidos
- **THEN** o botão de envio é desabilitado e o formulário entra em estado de carregamento (`aria-busy="true"`)

### Requirement: Acessibilidade e WAI-ARIA no formulário
O formulário de submissão SHALL fornecer conformidade com WAI-ARIA, garantindo rótulos adequados, estados de erro acessíveis e comunicação semântica para leitores de tela.

#### Scenario: Exibição acessível de erros de validação
- **WHEN** um campo do formulário perde o foco com dados inválidos
- **THEN** o campo recebe `aria-invalid="true"` e associa a mensagem de erro através do atributo `aria-describedby`

### Requirement: Interface limpa sem template legado do Nx
O frontend SHALL exibir uma interface focada exclusivamente no formulário de submissão do CFP, removendo todos os blocos de demonstração e boas-vindas do template padrão do Nx.

#### Scenario: Renderização exclusiva da interface do CFP
- **WHEN** o usuário acessa a página principal da aplicação frontend
- **THEN** a página renderiza apenas a estrutura da aplicação de CFP com o componente de formulário, sem elementos de boas-vindas, cards de documentação ou SVGs residuais do Nx

### Requirement: Consumo da API do backend na porta 3300
O frontend SHALL enviar as requisições de submissão para o endpoint da API na porta 3300 (`http://localhost:3300/api/cfp`), e o backend SHALL permitir requisições de origem cruzada (CORS) originadas da aplicação frontend.

#### Scenario: Submissão direcionada à porta 3300 com sucesso
- **WHEN** o usuário submete uma proposta válida pelo formulário do frontend
- **THEN** a requisição HTTP POST é disparada para o endpoint do backend na porta 3300 (`http://localhost:3300/api/cfp`), recebendo a resposta sem bloqueios de CORS

