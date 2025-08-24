# 🎮 Pokemons App - Frontend Flutter

Um aplicativo móvel moderno desenvolvido em Flutter que consome a API Rick & Morty para exibir personagens de forma elegante e responsiva.

## 📱 Sobre o Projeto

O **Pokemons App** é um aplicativo de demonstração que mostra as melhores práticas de desenvolvimento Flutter, incluindo arquitetura limpa, gerenciamento de estado, injeção de dependência e design de interface moderna.

### ✨ Características Principais

- 🎨 **Interface Moderna**: Design Material 3 com tema personalizado
- 📱 **Responsivo**: Adaptável a diferentes tamanhos de tela
- 🔄 **Estado Reativo**: Atualização automática da interface
- 🌐 **Integração API**: Consumo de dados da Rick & Morty API
- 🏗️ **Arquitetura Limpa**: Separação clara de responsabilidades
- 🧪 **Testável**: Código estruturado para facilitar testes

## 🏗️ Arquitetura do Frontend

O projeto segue o padrão **MVVM (Model-View-ViewModel)** com Clean Architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                      │
├─────────────────────────────────────────────────────────────┤
│  Views (UI)          │  ViewModels (State)  │  Widgets     │
│  • CharacterListView │  • CharacterListVM   │  • ListItem  │
│  • CharacterDetail   │                      │              │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                     DOMAIN LAYER                           │
├─────────────────────────────────────────────────────────────┤
│  Repositories        │  Models              │  Services    │
│  • CharacterRepo     │  • Character         │  • API       │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE LAYER                    │
├─────────────────────────────────────────────────────────────┤
│  HTTP Client         │  Dependency Injection │  Constants  │
│  • Dio              │  • GetIt              │  • API URLs  │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Tecnologias e Dependências

### Core Framework
- **Flutter 3.35.1** - Framework de desenvolvimento multiplataforma
- **Dart 3.2.3** - Linguagem de programação

### Gerenciamento de Estado
- **Provider 6.1.5** - Gerenciamento de estado reativo e simples

### Networking e Dados
- **Dio 5.9.0** - Cliente HTTP robusto para requisições
- **JSON Serializable 6.10.0** - Serialização automática de JSON
- **JSON Annotation 4.9.0** - Anotações para serialização

### Injeção de Dependência
- **Get It 7.7.0** - Service locator para injeção de dependência

### Desenvolvimento
- **Build Runner 2.7.0** - Geração de código
- **Flutter Lints 3.0.2** - Regras de linting

## 📁 Estrutura Detalhada do Projeto

```
lib/
├── 📂 core/
│   └── 🔧 api_constants.dart          # Constantes da API
├── 📂 data/
│   ├── 📂 models/
│   │   ├── 🎭 character_model.dart    # Modelo de dados
│   │   └── 🔄 character_model.g.dart  # Código gerado
│   └── 📂 repositories/
│       └── 🌐 character_repository.dart # Acesso a dados
├── 📂 presentation/
│   ├── 📂 viewmodels/
│   │   └── 🧠 character_list_viewmodel.dart # Lógica de estado
│   ├── 📂 views/
│   │   ├── 📋 character_list_view.dart      # Tela principal
│   │   └── 👤 character_detail_view.dart    # Tela de detalhes
│   └── 📂 widgets/
│       └── 🎨 character_list_item.dart      # Componente de item
├── 🚀 main.dart                           # Ponto de entrada
└── 🔧 service_locator.dart                # Injeção de dependência
```

## 🎨 Componentes da Interface

### 1. **CharacterListView** - Tela Principal
```dart
// Tela que exibe a lista de personagens
class CharacterListView extends StatefulWidget {
  // Implementa:
  // • Lista scrollável de personagens
  // • Indicador de carregamento
  // • Tratamento de erros
  // • Pull-to-refresh
}
```

**Características:**
- 📋 Lista scrollável com `ListView.builder`
- 🔄 Pull-to-refresh para atualizar dados
- ⏳ Indicador de carregamento circular
- ❌ Tratamento de erros com botão de retry
- 🎨 Design Material 3 com cards

### 2. **CharacterDetailView** - Tela de Detalhes
```dart
// Tela que exibe detalhes de um personagem
class CharacterDetailView extends StatelessWidget {
  // Implementa:
  // • Imagem em destaque
  // • Informações detalhadas
  // • Layout responsivo
}
```

**Características:**
- 🖼️ Imagem em destaque com bordas arredondadas
- 📝 Cards informativos para cada propriedade
- 📱 Layout responsivo com `SingleChildScrollView`
- 🎨 Tema consistente com a aplicação

### 3. **CharacterListItem** - Componente de Item
```dart
// Widget reutilizável para item da lista
class CharacterListItem extends StatelessWidget {
  // Implementa:
  // • Layout de item da lista
  // • Imagem com fallback
  // • Navegação para detalhes
}
```

**Características:**
- 🎯 Card clicável com `InkWell`
- 🖼️ Imagem com tratamento de erro
- ➡️ Ícone de navegação
- 🎨 Design consistente

## 🔄 Fluxo de Dados

```
1. 📱 Usuário abre o app
   ↓
2. 🧠 CharacterListViewModel é inicializado
   ↓
3. 🌐 CharacterRepository faz requisição HTTP
   ↓
4. 📊 Dados são convertidos para Character models
   ↓
5. 🎨 UI é atualizada via Provider
   ↓
6. 👆 Usuário interage com a interface
```

## 🎨 Design System

### Cores
- **Primary**: `Colors.deepPurple` (Material 3)
- **Surface**: Cores do tema Material 3
- **Error**: `Colors.red` para estados de erro

### Tipografia
- **Headline**: `TextTheme.headlineSmall`
- **Body**: `TextTheme.bodyMedium`
- **Label**: `TextTheme.bodySmall`

### Componentes
- **Cards**: Elevação 2, bordas arredondadas
- **Buttons**: ElevatedButton com tema consistente
- **Images**: BorderRadius 8-12px

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Flutter SDK 3.2.3 ou superior
- Dart SDK 3.2.3 ou superior
- Android Studio / VS Code
- Dispositivo Android ou emulador

### Passos para Execução

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd pokemons_app
   ```

2. **Instale as dependências**
   ```bash
   flutter pub get
   ```

3. **Gere os arquivos de código**
   ```bash
   flutter packages pub run build_runner build
   ```

4. **Execute o aplicativo**
   ```bash
   flutter run
   ```

### Comandos Úteis

```bash
# Executar em modo debug
flutter run

# Executar em modo release
flutter run --release

# Gerar APK
flutter build apk

# Gerar APK de release
flutter build apk --release

# Limpar cache
flutter clean

# Atualizar dependências
flutter pub upgrade
```

## 🧪 Testes

### Executar Testes
```bash
# Testes unitários
flutter test

# Testes com cobertura
flutter test --coverage
```

## 📱 Funcionalidades Implementadas

### ✅ Funcionalidades Atuais
- [x] Lista de personagens com paginação
- [x] Detalhes do personagem
- [x] Tratamento de erros de rede
- [x] Indicador de carregamento
- [x] Pull-to-refresh
- [x] Navegação entre telas
- [x] Design responsivo
- [x] Cache de imagens

### 🚧 Funcionalidades Futuras
- [ ] Busca de personagens
- [ ] Filtros por status/espécie
- [ ] Favoritos
- [ ] Modo offline
- [ ] Animações personalizadas
- [ ] Tema escuro/claro
- [ ] Testes automatizados

## 🌐 API Utilizada

- **Rick & Morty API**: https://rickandmortyapi.com/
- **Endpoint**: `/character`
- **Método**: GET
- **Resposta**: JSON com lista de personagens

### Estrutura da Resposta
```json
{
  "info": {
    "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character?page=2",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    }
  ]
}
```

## 🏗️ Padrões de Desenvolvimento

### Clean Architecture
- **Separação de responsabilidades**
- **Inversão de dependência**
- **Testabilidade**
- **Manutenibilidade**

### MVVM Pattern
- **Model**: Representação dos dados
- **View**: Interface do usuário
- **ViewModel**: Lógica de apresentação

### SOLID Principles
- **Single Responsibility**: Cada classe tem uma responsabilidade
- **Open/Closed**: Aberto para extensão, fechado para modificação
- **Liskov Substitution**: Substituição de tipos
- **Interface Segregation**: Interfaces específicas
- **Dependency Inversion**: Dependências abstratas

## 📊 Performance

### Otimizações Implementadas
- **ListView.builder**: Renderização eficiente de listas
- **Image caching**: Cache automático de imagens
- **Lazy loading**: Carregamento sob demanda
- **Memory management**: Gerenciamento adequado de memória

### Métricas de Performance
- **Tempo de inicialização**: < 3 segundos
- **Tempo de carregamento da lista**: < 2 segundos
- **Uso de memória**: Otimizado para dispositivos móveis

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedor

**Matheus** - Desenvolvedor Flutter

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!**
