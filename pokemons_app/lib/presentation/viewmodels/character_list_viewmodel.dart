import 'package:flutter/foundation.dart';
import '../../data/models/character_model.dart';
import '../../data/repositories/character_repository.dart';
import '../../service_locator.dart';

class CharacterListViewModel extends ChangeNotifier {
  final CharacterRepository _characterRepository = getIt<CharacterRepository>();
  
  bool _isLoading = false;
  List<Character> _characters = [];
  String? _errorMessage;

  bool get isLoading => _isLoading;
  List<Character> get characters => _characters;
  String? get errorMessage => _errorMessage;

  Future<void> fetchCharacters() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _characters = await _characterRepository.getCharacters();
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
