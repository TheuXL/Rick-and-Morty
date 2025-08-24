import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../viewmodels/character_list_viewmodel.dart';
import '../widgets/character_list_item.dart';
import 'character_detail_view.dart';
import '../../data/models/character_model.dart';

class CharacterListView extends StatefulWidget {
  const CharacterListView({super.key});

  @override
  State<CharacterListView> createState() => _CharacterListViewState();
}

class _CharacterListViewState extends State<CharacterListView> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<CharacterListViewModel>().fetchCharacters();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Rick & Morty Characters'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Consumer<CharacterListViewModel>(
        builder: (context, viewModel, child) {
          if (viewModel.isLoading) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }

          if (viewModel.errorMessage != null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Erro ao carregar personagens',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    viewModel.errorMessage!,
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () => viewModel.fetchCharacters(),
                    child: const Text('Tentar Novamente'),
                  ),
                ],
              ),
            );
          }

          if (viewModel.characters.isEmpty) {
            return const Center(
              child: Text('Nenhum personagem encontrado'),
            );
          }

          return ListView.builder(
            itemCount: viewModel.characters.length,
            itemBuilder: (context, index) {
              final character = viewModel.characters[index];
              return CharacterListItem(
                character: character,
                onTap: () => _navigateToDetail(character),
              );
            },
          );
        },
      ),
    );
  }

  void _navigateToDetail(Character character) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => CharacterDetailView(character: character),
      ),
    );
  }
}
