# Locker Rules

MVP web para gerenciar agendamentos de lock/unlock (locker) com autenticacao,
auditoria e sincronizacao com a Integration API. O foco e cadastrar regras,
enviar para a API externa e acompanhar o estado planejado por alvo
(user/hostname).

## O que o projeto faz

- Cadastro e edicao de regras de agendamento (lock/unlock).
- Autenticacao por sessao e aprovacao de usuarios (admin).
- Registro de auditoria das operacoes.
- Sincronizacao de regras e registros externos.
- Tela Controle com visao por alvo e acoes rapidas.

## Stack

- Backend: Node.js + Express + PostgreSQL
- Frontend: HTML/CSS/JS (estatico) servido por Nginx
- Docker Compose para orquestracao

## Como rodar (Docker)

```bash
docker compose up --build
```

Front-end: http://localhost:8080  
Back-end: http://localhost:3000

## Credenciais padrao

- Usuario: admin
- Senha: admin

Definidas em `docker-compose.yml` via `AUTH_USER` e `AUTH_PASSWORD`.

## Estrutura

- `backend/` API + banco
- `frontend/` UI estatica
- `swagger.json` contrato da Integration API
- `docker-compose.yml` infraestrutura local

## Observacoes

- O token Bearer da Integration API deve ser informado na tela "Token API".
- Para ambientes reais, ajuste as variaveis de ambiente e credenciais.

## Regras de negocio e priorizacao

- A tela Controle mostra **estado planejado** com base nos agendamentos (nao na execucao efetiva).
- O agrupamento e por alvo (`targetType` + `targetValue`), ex.: usuario ou hostname.
- **Unlock sempre tem prioridade** sobre Lock no mesmo alvo.
- Se houver mais de um Unlock, **o primeiro gerado** (created_at mais antigo) tem prioridade.
- O **primeiro da fila** define o status exibido no card do alvo.

## Regras de validacao/UX

- Para recorrencia, `startTime` e `endTime` sao obrigatorios, **nao** sao derivados de `startDate`/`endDate`.
- `startTime` e `endTime` devem estar no formato `HH:mm` e `endTime` precisa ser maior que `startTime`.
- Ao salvar um agendamento, a UI aguarda a resposta da API externa; se falhar, o modal permanece aberto e mostra o motivo.
- Quando o campo `endDate` nao e preenchido, o agendamento **nao expira**.
