export default class MatrizTransicao {
  static criar(matrizes: any[]) {
    function replacer(key, value) {
      if (value instanceof Map) {
        let objeto = {};

        value.forEach((value, key) => {
          objeto[key] = value;
        });

        return objeto;
      } else {
        return value;
      }
    }

    
  }
}
