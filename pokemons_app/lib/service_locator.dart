import 'package:get_it/get_it.dart';
import 'data/repositories/character_repository.dart';

final GetIt getIt = GetIt.instance;

void setupServiceLocator() {
  getIt.registerLazySingleton<CharacterRepository>(() => CharacterRepository());
}
