import 'package:dio/dio.dart';
import '../models/character_model.dart';
import '../../core/api_constants.dart';

class CharacterRepository {
  final Dio _dio;

  CharacterRepository() : _dio = Dio();

  Future<List<Character>> getCharacters() async {
    try {
      final response = await _dio.get(
        '${ApiConstants.baseUrl}${ApiConstants.charactersEndpoint}',
      );

      if (response.statusCode == 200) {
        final List<dynamic> results = response.data['results'];
        return results.map((json) => Character.fromJson(json)).toList();
      } else {
        throw Exception('Falha ao carregar personagens');
      }
    } on DioException catch (e) {
      throw Exception('Erro de conexão: ${e.message}');
    } catch (e) {
      throw Exception('Erro inesperado: $e');
    }
  }
}
