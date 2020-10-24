export class ParseBrythonErrors {
  private constructor(public mensagem, public tipo) {}

  static construir(error) {
    if (error.stack != null && error.msg != null) {
      const brythonError = new ParseBrythonErrors(error.msg, this.getTipo(error));

      return brythonError;
    }

    return null;
  }

  private static getTipo(error) {
    const expressaRegularTipoError = new RegExp(/\.(.*Error)/g);
    const resultado = expressaRegularTipoError.exec(error.stack);
    const retorno = resultado.length > 0 ? resultado[0] : null;

    return retorno;
  }

  private static getLinha(error) {
    const expressaRegularTipoError = new RegExp(/\.(.*Error)/g);
    const resultado = expressaRegularTipoError.exec(error.stack);
    const retorno = resultado.length > 0 ? resultado[0] : null;

    return retorno;
  }
}
