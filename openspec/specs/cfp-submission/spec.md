# cfp-submission Specification

## Purpose

Permite que palestrantes submetam propostas de palestras (Call for Papers) com validação estrita de dados e interface acessível.

## Requirements

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
