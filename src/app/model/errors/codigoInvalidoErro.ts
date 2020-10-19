export class CodigoInvalidoErro extends Error {
  constructor() {
    super();
    this.message = 'Código enviado não segue o modelo esperado.';
  }
}
