# Backend API - Gerenciamento de Tarefas

API RESTful desenvolvida em Node.js com NestJS para gerenciamento de tarefas (To-dos).

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **NestJS** - Framework para construção de aplicações escaláveis
- **TypeScript** - Linguagem com tipagem estática
- **class-validator** - Validação de dados
- **Jest** - Framework de testes
- **Supertest** - Testes de integração HTTP

## 📋 Funcionalidades

### Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/todos` | Listar todas as tarefas |
| `GET` | `/todos/:id` | Buscar uma tarefa pelo ID |
| `POST` | `/todos` | Criar uma nova tarefa |
| `PATCH` | `/todos/:id` | Atualizar uma tarefa existente |
| `DELETE` | `/todos/:id` | Excluir uma tarefa |

### Estrutura de Dados

#### Criar Tarefa (POST /todos)
```json
{
  "title": "Minha tarefa",
  "isCompleted": false
}
```

#### Atualizar Tarefa (PATCH /todos/:id)
```json
{
  "title": "Tarefa atualizada",
  "isCompleted": true
}
```

#### Resposta da API
```json
{
  "id": 1,
  "title": "Minha tarefa",
  "isCompleted": false
}
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run start:dev

# Executar em modo produção
npm run start:prod
```

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run start:dev` | Executa o servidor em modo desenvolvimento com hot reload |
| `npm run start:prod` | Executa o servidor em modo produção |
| `npm run build` | Compila o projeto TypeScript |
| `npm test` | Executa todos os testes |
| `npm run test:watch` | Executa testes em modo watch |
| `npm run test:cov` | Executa testes com relatório de cobertura |
| `npm run test:unit` | Executa apenas testes unitários |
| `npm run test:integration` | Executa apenas testes de integração |

## 🧪 Testes

O projeto possui uma cobertura completa de testes:

### Tipos de Teste
- **Testes Unitários**: Testam componentes isolados (Service, Controller, DTOs)
- **Testes de Integração**: Testam o fluxo completo das rotas HTTP
- **Testes de Validação**: Testam as regras de validação dos DTOs

### Executar Testes
```bash
# Todos os testes
npm test

# Apenas testes unitários
npm run test:unit

# Apenas testes de integração
npm run test:integration

# Testes com cobertura
npm run test:cov
```

### Cobertura de Testes
- **100%** de cobertura para arquivos principais
- **88.31%** de cobertura geral
- **64 testes** passando

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── main.ts                 # Ponto de entrada da aplicação
│   ├── app.module.ts           # Módulo principal
│   └── todos/
│       ├── todos.controller.ts # Controlador das rotas
│       ├── todos.service.ts    # Lógica de negócio
│       ├── todos.module.ts     # Módulo de todos
│       ├── dto/
│       │   ├── create-todo.dto.ts
│       │   └── update-todo.dto.ts
│       └── entities/
│           └── todo.entity.ts
├── __test__/
│   ├── todos.service.spec.ts
│   ├── todos.controller.spec.ts
│   ├── todos.integration.spec.ts
│   ├── todos.module.spec.ts
│   └── dto.spec.ts
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## 🔧 Configuração

### Variáveis de Ambiente
O servidor roda na porta `3000` por padrão.

### Validação de Dados
- Todos os dados de entrada são validados automaticamente
- Validação de tipos e campos obrigatórios
- Mensagens de erro em português

### Armazenamento
- Dados armazenados em memória (array)
- Reinicia a cada restart do servidor
- Pronto para integração com banco de dados real

## 🚀 Deploy

### Build para Produção
```bash
npm run build
npm run start:prod
```

### Docker (opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 📝 Exemplos de Uso

### Criar uma Tarefa
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar NestJS", "isCompleted": false}'
```

### Listar Todas as Tarefas
```bash
curl -X GET http://localhost:3000/todos
```

### Buscar Tarefa por ID
```bash
curl -X GET http://localhost:3000/todos/1
```

### Atualizar Tarefa
```bash
curl -X PATCH http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar NestJS - Concluído", "isCompleted": true}'
```

### Excluir Tarefa
```bash
curl -X DELETE http://localhost:3000/todos/1
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

Desenvolvido como parte do desafio full-stack.
