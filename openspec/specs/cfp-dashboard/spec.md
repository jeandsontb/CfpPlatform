# cfp-dashboard Specification

## Purpose

Permite a listagem, consulta e visualização estruturada de propostas de palestras submetidas à plataforma de CFP, além da navegação integrada entre o formulário e o dashboard.

## Requirements

### Requirement: Consulta de palestras submetidas via API
A API SHALL fornecer um endpoint `GET` que retorne uma lista contendo todas as propostas de palestras cadastradas, estruturadas conforme o contrato SpeakerDTO com status HTTP 200 OK.

#### Scenario: Listagem de propostas com sucesso
- **WHEN** o cliente envia uma requisição `GET` para o endpoint `/api/cfp` ou `/api/speakers`
- **THEN** a API responde com status `200 OK` e um array JSON contendo as propostas registradas

### Requirement: Exibição visual e semântica do Dashboard de palestras
O sistema SHALL exibir no frontend as palestras cadastradas utilizando HTML semântico (tabela ou lista de cards) respeitando a identidade visual, tipografia e design tokens estabelecidos na aplicação.

#### Scenario: Renderização do dashboard com itens cadastrados
- **WHEN** a página do dashboard for acessada e existirem propostas cadastradas
- **THEN** o sistema exibe cada palestra contendo título, nome do palestrante, e-mail e distintivo de Google Developer Expert (GDE) quando aplicável

#### Scenario: Renderização do dashboard em estado vazio
- **WHEN** a página do dashboard for acessada e não houver nenhuma proposta cadastrada
- **THEN** o sistema exibe uma mensagem amigável comunicando que nenhuma palestra foi submetida até o momento

### Requirement: Gerenciamento de estado e feedback assíncrono
O componente de Dashboard SHALL gerenciar o estado das palestras tipado estritamente com `SpeakerDTO[]`, exibindo indicadores de carregamento durante a requisição e mensagens acessíveis em caso de falha de comunicação com a API.

#### Scenario: Feedback de carregamento durante a requisição
- **WHEN** a consulta de palestras à API estiver em andamento
- **THEN** a interface apresenta um indicador visual e acessível com `aria-busy="true"`

#### Scenario: Tratamento de erro na recuperação dos dados
- **WHEN** a requisição falhar ou a API retornar status de erro
- **THEN** a interface exibe um alerta acessível comunicando o erro na consulta

### Requirement: Navegação bidirecional acessível entre formulário e dashboard
A plataforma SHALL fornecer links de navegação semânticos permitindo transitar entre a página de submissão (`/`) e a página de dashboard (`/dashboard`), preservando o estilo visual dos botões e a acessibilidade.

#### Scenario: Navegação da página inicial para o dashboard
- **WHEN** o usuário aciona o link de navegação para o dashboard
- **THEN** a rota `/dashboard` é carregada sem recarregamento total da página

#### Scenario: Retorno do dashboard para a página de submissão
- **WHEN** o usuário aciona o link de retorno no dashboard
- **THEN** a rota raiz `/` é exibida com o formulário pronto para novas submissões
