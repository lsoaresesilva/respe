import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import MensagemChat from 'src/app/model/mensagemChat';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatGrupoComponent implements OnInit {

  mensagens;
  mensagem;
  visibilidade;
  usuarioLogado;

  constructor(private loginService:LoginService, private chatService:ChatService) {
    this.usuarioLogado = this.loginService.getUsuarioLogado();
    this.mensagem = new MensagemChat(null, this.usuarioLogado, "");
    this.visibilidade = true;

    this.mensagens = [];

    this.chatService.receberMensagem().subscribe(mensagem =>{
      this.mensagens.push(mensagem);
    })
   }

  ngOnInit(): void {
  }


  
  enviar(){
    this.chatService.enviarMensagem(this.mensagem).subscribe(()=>{
      this.mensagem.texto = "";

    })
  }

}
