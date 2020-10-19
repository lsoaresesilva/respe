export class ConexaoRepetirError extends Error {
  constructor(menssagem) {
    super(menssagem);
    this.message =
      'Falha na comunicação com o servidor. Por favor, tente novamente em alguns instantes.';
  }
}
