import mensagemJson from '../../assets/mensagensSuporte.json';
import Mensagem from './chatbot/mensagem';

export default class MensagemSuporteMonitor {
  constructor(public mensagens) {}

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static getMensagem(id):Mensagem {

    let mensagens = mensagemJson.mensagens[id].mensagens;

    if(mensagens != null){
      
  
      let numeroAleatorio = this.getRandomInt(0,mensagens.length);
  
      return new Mensagem(mensagemJson.mensagens[id].mensagens[numeroAleatorio], null);
    }
    
  }

  static getSaudacao():Mensagem{
    return new Mensagem(mensagemJson.mensagens["saudacao"].mensagens[0], null);
  }
  
  /* static getPedidoAjuda(){
    let mensagens = [];
    mensagemJson.mensagens["pedidoAjuda"].mensagens.forEach(mensagem => {
      mensagens.push(new Mensagem(mensagem, null));
    });

    return mensagens;
  } */

}
