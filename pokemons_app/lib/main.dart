import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'presentation/viewmodels/character_list_viewmodel.dart';
import 'presentation/views/character_list_view.dart';
import 'service_locator.dart';

void main() {
  setupServiceLocator();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pokemons App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: ChangeNotifierProvider(
        create: (context) => CharacterListViewModel(),
        child: const CharacterListView(),
      ),
    );
  }
}
