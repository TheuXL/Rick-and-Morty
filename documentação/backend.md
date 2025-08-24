**Esclarecimento Importante:** O desafio descreve **duas partes independentes**:
1.  **Frontend (Flutter):** Consome a API pública do **Rick & Morty**.
2.  **Backend (Node.js):** Cria uma API completamente separada para um **CRUD de Tarefas (`/todos`)**.

Portanto, o nosso backend **NÃO** vai se conectar à API do Rick & Morty. Ele será um servidor próprio que gerencia uma lista de tarefas, exatamente como especificado nos requisitos. Essa separação é comum em desafios full-stack para testar habilidades em ambas as frentes de forma isolada.

Com isso claro, vamos ao plano detalhado do backend.

### **Backend: API de Tarefas (Node.js com NestJS)**

#### **Visão Geral**

O objetivo é construir uma API RESTful robusta e bem estruturada para gerenciar tarefas (To-dos). Usaremos **NestJS**, um framework Node.js que impõe uma arquitetura organizada por padrão (Módulos, Controllers, Services), o que atende perfeitamente aos requisitos do desafio.

---

#### **1. Tecnologias e Ferramentas**

*   **Linguagem:** **TypeScript**
    *   *Por quê?* Oferece tipagem estática, o que reduz erros em tempo de execução, melhora o autocompletar do editor e torna o código mais legível e manutenível.
*   **Framework:** **NestJS**
    *   *Por quê?* É construído sobre o Express.js, mas adiciona uma camada de abstração que organiza o código de forma modular e escalável. Já vem com injeção de dependência, validação e uma CLI poderosa que agiliza o desenvolvimento.
*   **Validação de Dados:** Pacotes `class-validator` e `class-transformer`
    *   *Por quê?* Integram-se perfeitamente com os `Pipes` do NestJS para validar automaticamente os DTOs (Data Transfer Objects), garantindo que os dados que chegam à sua API tenham o formato correto.
*   **Banco de Dados:** **Array em Memória** (conforme a sugestão de opcionalidade)
    *   *Por quê?* Para este desafio, é a forma mais rápida de ter a lógica de armazenamento funcionando sem a necessidade de configurar um banco de dados real. A lógica no *Service* pode ser facilmente trocada por um ORM (como TypeORM ou Prisma) no futuro, sem alterar o *Controller*.
*   **Teste de API:** **Postman** ou **Insomnia**
    *   *Por quê?* São ferramentas essenciais para enviar requisições HTTP para os seus endpoints e verificar se eles estão respondendo corretamente.

---

#### **2. Arquitetura Detalhada (Estrutura do NestJS)**

O NestJS organiza a aplicação em três componentes principais, que vamos usar no nosso módulo `todos`.

**Fluxo de uma Requisição:**

```
Requisição HTTP (ex: POST /todos)
       |
       v
Controller (@Controller('todos'))
 - Recebe a requisição na rota correta.
 - Usa Pipes para validar os dados do @Body com o DTO.
 - Chama o método correspondente no Service.
       |
       v
Service (@Injectable())
 - Contém a lógica de negócio.
 - Manipula o array de tarefas (adiciona, remove, atualiza).
 - Retorna os dados para o Controller.
       |
       v
"Banco de Dados" (Array em Memória)
```

**Componentes:**

*   **Module (`todos.module.ts`):** É o "pacote" que agrupa tudo relacionado a `todos`. Ele declara qual Controller pertence a ele e qual Service deve ser injetado.
*   **Controller (`todos.controller.ts`):** A camada de roteamento. Define os endpoints (`@Get`, `@Post`, etc.) e lida com a requisição e a resposta HTTP. Ele é o "maestro" que delega o trabalho pesado para o Service.
*   **Service (`todos.service.ts`):** O "cérebro". Contém toda a lógica de negócio (CRUD). Ele não sabe nada sobre HTTP; apenas manipula os dados. Isso o torna altamente reutilizável e testável.
*   **DTOs (`dto/create-todo.dto.ts`):** Classes que definem o "formato" dos dados que entram na API. Usadas para validação. Por exemplo, `CreateTodoDto` pode exigir que a propriedade `title` seja uma string e não esteja vazia.

---

#### **3. Estrutura de Pastas (Gerada pelo NestJS CLI)**

```
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
└── todos/
    ├── dto/
    │   ├── create-todo.dto.ts
    │   └── update-todo.dto.ts
    ├── entities/
    │   └── todo.entity.ts      # Classe/interface que define uma Tarefa
    ├── todos.controller.ts     # Define os endpoints /todos
    ├── todos.module.ts         # Agrupa o módulo de tarefas
    └── todos.service.ts        # Implementa a lógica CRUD
```

---

#### **4. Detalhamento dos Endpoints e Funções**

Vamos mapear cada requisito para a implementação no NestJS.

**Entidade (`todo.entity.ts`):**
```typescript
export class Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}
```

**DTO (`create-todo.dto.ts`):**
```typescript
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  isCompleted: boolean;
}
```

**1. `GET /todos` – Listar todas as tarefas**
*   **Controller:** Método com o decorator `@Get()`.
*   **Função:** Chama `todosService.findAll()` e retorna a lista completa de tarefas.
*   **Service (`findAll()`):** Simplesmente retorna o array de tarefas que está em memória.

**2. `GET /todos/:id` – Buscar uma tarefa pelo ID**
*   **Controller:** Método com `@Get(':id')`. Usa o decorator `@Param('id')` para capturar o ID da URL.
*   **Função:** Converte o ID para número e chama `todosService.findOne(id)`. Se a tarefa não for encontrada, o Service deve lançar uma exceção (`NotFoundException`) que o NestJS automaticamente converterá em uma resposta HTTP 404.
*   **Service (`findOne(id)`):** Procura no array pela tarefa com o ID correspondente. Se encontrar, retorna a tarefa. Se não, lança o erro.

**3. `POST /todos` – Criar uma nova tarefa**
*   **Controller:** Método com `@Post()`. Usa `@Body()` para capturar o corpo da requisição, tipando-o com `CreateTodoDto`.
*   **Função:** Chama `todosService.create(createTodoDto)`.
*   **Service (`create(dto)`):** Gera um novo ID (pode ser um simples contador ou `Date.now()`), cria um novo objeto `Todo` com os dados do DTO, adiciona ao array e retorna a tarefa recém-criada.
*   **Validação:** O `ValidationPipe` (configurado globalmente no `main.ts`) irá validar o corpo da requisição contra as regras do `CreateTodoDto` *antes* que o método do controller seja executado.

**4. `PUT /todos/:id` – Atualizar uma tarefa existente**
*   **Controller:** Método com `@Put(':id')`. Usa `@Param('id')` e `@Body()`.
*   **Função:** Chama `todosService.update(id, updateTodoDto)`.
*   **Service (`update(id, dto)`):** Primeiro, busca a tarefa pelo ID. Se não encontrar, lança `NotFoundException`. Se encontrar, atualiza suas propriedades com os dados do DTO e a retorna.

**5. `DELETE /todos/:id` – Excluir uma tarefa**
*   **Controller:** Método com `@Delete(':id')`. Usa `@Param('id')`.
*   **Função:** Chama `todosService.remove(id)`.
*   **Service (`remove(id)`):** Busca a tarefa pelo ID. Se não encontrar, lança `NotFoundException`. Se encontrar, remove-a do array. A resposta do controller pode ser um status HTTP 204 (No Content) ou a tarefa que foi removida.

---

#### **5. Fluxo de Desenvolvimento (Passo a Passo)**

1.  **Setup do Ambiente:**
    *   Instalar o Node.js e o NestJS CLI: `npm i -g @nestjs/cli`.
    *   Criar um novo projeto: `nest new backend-todos`.

2.  **Gerar o Módulo de Tarefas:**
    *   Dentro da pasta do projeto, use a CLI do NestJS para criar toda a estrutura básica para o módulo `todos`:
        ```bash
        nest g resource todos
        ```
    *   Este comando irá criar os arquivos `controller`, `service`, `module`, `dto` e `entity`.

3.  **Definir Modelos:**
    *   Ajuste `entities/todo.entity.ts` para ter os campos `id`, `title`, `isCompleted`.
    *   Defina as regras de validação em `dto/create-todo.dto.ts` e `dto/update-todo.dto.ts`.

4.  **Implementar a Lógica do Service:**
    *   Abra `todos.service.ts`. Crie um array privado para armazenar as tarefas.
    *   Implemente a lógica para os cinco métodos: `create`, `findAll`, `findOne`, `update`, e `remove`. Lembre-se de tratar o caso de "não encontrado".

5.  **Conectar o Controller:**
    *   Abra `todos.controller.ts`. A CLI já terá criado os métodos básicos.
    *   Ajuste os métodos para chamar as funções correspondentes do `todosService`, usando os decorators `@Param` e `@Body` corretamente.

6.  **Ativar a Validação Global:**
    *   No arquivo `src/main.ts`, adicione um `ValidationPipe` global:
        ```typescript
        import { ValidationPipe } from '@nestjs/common';

        async function bootstrap() {
          const app = await NestFactory.create(AppModule);
          app.useGlobalPipes(new ValidationPipe()); // Adicione esta linha
          await app.listen(3000);
        }
        ```

7.  **Testar:**
    *   Inicie o servidor: `npm run start:dev`.
    *   Use o Postman para testar cada um dos 5 endpoints. Teste os caminhos felizes (dados corretos) e os de erro (enviar dados sem um campo obrigatório, buscar um ID que não existe, etc.).

Este plano cobre todos os requisitos do backend de forma estruturada, usando ferramentas modernas e seguindo as melhores práticas de desenvolvimento Node.js.