import mensagemJson from '../../assets/mensagensSuporte.json';

export default class MensagemSuporteMonitor {
  constructor(public mensagens) {}

  static getMensagem(id) {
    return mensagemJson.mensagens[id];
  }
}
