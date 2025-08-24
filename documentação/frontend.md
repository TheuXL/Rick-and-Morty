### **Frontend: App Rick & Morty (Flutter)**

#### **Visão Geral**

O objetivo é criar um aplicativo de duas telas: uma para listar personagens da API Rick & Morty e outra para exibir detalhes de um personagem selecionado. A arquitetura será a **MVVM (Model-View-ViewModel)**, que promove um código limpo, testável e de fácil manutenção, separando a lógica de apresentação da interface do usuário.

---

#### **1. Tecnologias e Dependências (pubspec.yaml)**

*   **Linguagem:** Dart
*   **Framework:** Flutter
*   **Gerenciamento de Estado (MVVM):** `provider`
    *   *Por quê?* É uma solução simples, recomendada pelo Google, e se encaixa perfeitamente no padrão `ChangeNotifier`, que é a base do nosso ViewModel.
*   **Requisições HTTP:** `dio`
    *   *Por quê?* É um cliente HTTP poderoso e fácil de usar, com suporte a interceptadores, configuração global e tratamento de erros avançado, superando o pacote `http` padrão em funcionalidades.
*   **Injeção de Dependência / Service Locator:** `get_it`
    *   *Por quê?* Ajuda a desacoplar as camadas. Em vez do ViewModel criar uma instância do Repository diretamente, ele a solicitará ao `get_it`, facilitando a substituição por uma versão "mock" durante os testes.
*   **Serialização de JSON:** `json_serializable` e `build_runner`
    *   *Por quê?* Automatiza a conversão de JSON para objetos Dart (e vice-versa), eliminando a necessidade de escrever código manual propenso a erros.

---

#### **2. Arquitetura MVVM Detalhada**

Vamos quebrar o que cada componente fará neste projeto.

**Model:**
*   **Arquivo:** `lib/data/models/character_model.dart`
*   **Função:** Representar a estrutura de dados de um personagem. Será uma classe Dart pura.
*   **Campos:**
    *   `int id`
    *   `String name`
    *   `String status`
    *   `String species`
    *   `String image`
*   **Métodos:** Terá um factory constructor `Character.fromJson(Map<String, dynamic> json)` para criar uma instância do modelo a partir de um mapa JSON (gerado automaticamente pelo `json_serializable`).

**Repository:**
*   **Arquivo:** `lib/data/repositories/character_repository.dart`
*   **Função:** Camada de acesso a dados. É o único componente que sabe como buscar os dados (neste caso, da API).
*   **Métodos:**
    *   `Future<List<Character>> getCharacters()`: Faz a chamada GET para `https://rickandmortyapi.com/api/character`, processa a resposta JSON, mapeia a lista de resultados para uma lista de objetos `Character` e a retorna. Fará o tratamento de erros HTTP.

**ViewModel:**
*   **Arquivo:** `lib/presentation/viewmodels/character_list_viewmodel.dart`
*   **Função:** O cérebro da tela. Contém o estado e a lógica de apresentação. **Não deve ter nenhuma referência a widgets do Flutter.**
*   **Implementação:** Será uma classe que `extends ChangeNotifier`.
*   **Propriedades (Estado):**
    *   `bool isLoading = false;` (Para controlar a exibição do loading)
    *   `List<Character> characters = [];` (A lista de personagens a ser exibida)
    *   `String? errorMessage;` (Para exibir mensagens de erro)
*   **Métodos:**
    *   `Future<void> fetchCharacters()`:
        1.  Define `isLoading = true` e notifica os ouvintes (`notifyListeners()`).
        2.  Chama o `characterRepository.getCharacters()`.
        3.  Em caso de sucesso, preenche a lista `characters` e limpa `errorMessage`.
        4.  Em caso de falha, preenche `errorMessage`.
        5.  Define `isLoading = false` e notifica os ouvintes novamente (`notifyListeners()`).

**View:**
*   **Arquivos:** `lib/presentation/views/character_list_view.dart` e `character_detail_view.dart`
*   **Função:** A camada de UI. É "burra", apenas reflete o estado do ViewModel e envia eventos do usuário para ele.
*   **Implementação:** Serão `StatelessWidget` ou `StatefulWidget`. Usarão o `Consumer<CharacterListViewModel>` (do pacote `provider`) para se reconstruir automaticamente quando o estado no ViewModel mudar.

---

#### **3. Estrutura de Pastas Sugerida**

```
lib/
├── core/                       # Lógica central, constantes, etc.
│   └── api_constants.dart      # URLs base da API
├── data/                       # Camada de dados
│   ├── models/
│   │   └── character_model.dart
│   └── repositories/
│       └── character_repository.dart
├── presentation/               # Camada de UI (View e ViewModel)
│   ├── viewmodels/
│   │   └── character_list_viewmodel.dart
│   ├── views/
│   │   ├── character_detail_view.dart
│   │   └── character_list_view.dart
│   └── widgets/                # Widgets reutilizáveis
│       └── character_list_item.dart
├── main.dart                   # Ponto de entrada da aplicação
└── service_locator.dart        # Configuração do get_it
```

---

#### **4. Detalhamento das Telas (Views)**

**Tela 1: Lista de Personagens (`CharacterListView`)**

*   **Componentes Visuais:**
    *   `AppBar` com o título "Rick & Morty Characters".
    *   O corpo da tela será controlado pelo estado do `CharacterListViewModel`:
        *   **Se `isLoading` for `true`:** Exibir um `CircularProgressIndicator` no centro.
        *   **Se `errorMessage` não for nulo:** Exibir uma mensagem de erro.
        *   **Se a lista `characters` tiver dados:** Exibir um `ListView.builder`.
*   **ListView.builder:**
    *   Renderizará uma lista de widgets `CharacterListItem`.
    *   Cada `CharacterListItem` será "clicável".
*   **Widget Reutilizável (`CharacterListItem`):**
    *   Receberá um objeto `Character`.
    *   Exibirá a imagem (`Image.network`) e o nome do personagem (`Text`).
    *   Será envolto em um `InkWell` ou `GestureDetector` para capturar o clique.
*   **Ação de Clique:**
    *   Ao clicar em um item, usará `Navigator.push()` para navegar para a `CharacterDetailView`, passando o objeto `Character` selecionado como argumento.

**Tela 2: Detalhes do Personagem (`CharacterDetailView`)**

*   **Componentes Visuais:**
    *   `AppBar` com o nome do personagem (`character.name`).
    *   Receberá o objeto `Character` via argumentos de navegação.
    *   Corpo da tela (provavelmente uma `Column` com `Padding`):
        *   Imagem do personagem em destaque (`Image.network`).
        *   Texto com o **Nome**: `character.name`.
        *   Texto com o **Status**: `character.status`.
        *   Texto com a **Espécie**: `character.species`.
*   **Lógica:** A tela é puramente para exibição, então não precisa de um ViewModel próprio. Ela é simples o suficiente para receber os dados e mostrá-los.

---

#### **5. Fluxo de Desenvolvimento (Passo a Passo)**

1.  **Setup Inicial:**
    *   Criar o projeto Flutter (`flutter create`).
    *   Adicionar as dependências (`provider`, `dio`, `get_it`, `json_serializable`, `build_runner`) no `pubspec.yaml`.
    *   Criar a estrutura de pastas conforme o plano.

2.  **Camada de Dados:**
    *   Criar o `character_model.dart` com os campos e anotações `@JsonSerializable`.
    *   Rodar o `build_runner` para gerar o código de serialização (`flutter pub run build_runner build`).
    *   Implementar o `CharacterRepository` com o método `getCharacters()` usando `dio`.

3.  **Configurar Service Locator:**
    *   Criar o arquivo `service_locator.dart` e registrar o `CharacterRepository`.
    *   Chamar a função de setup do `service_locator` no `main.dart` antes de `runApp()`.

4.  **Camada de Apresentação (ViewModel):**
    *   Criar o `CharacterListViewModel` que `extends ChangeNotifier`.
    *   Injetar o `CharacterRepository` via construtor (usando `get_it`).
    *   Implementar a lógica do método `fetchCharacters()`.

5.  **Camada de UI (View):**
    *   No `main.dart`, configurar o `ChangeNotifierProvider` para o `CharacterListViewModel` acima da árvore de widgets.
    *   Desenvolver a `CharacterListView`, conectando-a ao ViewModel com `Provider.of(context)` ou `context.watch()`.
    *   Chamar `viewModel.fetchCharacters()` no `initState` da tela de lista.
    *   Criar o widget `CharacterListItem`.
    *   Desenvolver a `CharacterDetailView`.

6.  **Navegação e Polimento:**
    *   Implementar a navegação da lista para os detalhes.
    *   Ajustar a UI para ser agradável e responsiva.
    *   Garantir que os estados de loading e erro estão funcionando visualmente.

Este plano detalhado fornece um roteiro claro para construir a parte frontend do desafio, garantindo um código organizado, escalável e alinhado com as melhores práticas do mercado.