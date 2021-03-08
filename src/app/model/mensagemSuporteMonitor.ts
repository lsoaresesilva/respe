import mensagemJson from '../../assets/mensagensSuporte.json';

export default class MensagemSuporteMonitor {
  constructor(public mensagens) {}

  static getMensagem(id) {
    return mensagemJson.mensagens[id];
  }

  static getMensagemMotivacional(){
    let min = Math.ceil(1);
    let max = Math.floor(5);
    let numero = Math.floor(Math.random() * (max - min)) + min;
    return mensagemJson.mensagens["mensagensMotivacionais"][numero];
  }
}
