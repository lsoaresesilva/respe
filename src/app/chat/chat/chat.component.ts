import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from 'src/app/login-module/login.service';
import MensagemChat from 'src/app/model/mensagemChat';
import { ChatService } from '../../cscl/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatGrupoComponent implements OnInit {

  mensagens$;
  mensagens;
  mensagem;
  visibilidade;
  usuarioLogado;

  @ViewChild('scroll') scroll;

  constructor(private loginService:LoginService, private chatService:ChatService, private changeDetectorRef: ChangeDetectorRef ) {
    this.usuarioLogado = this.loginService.getUsuarioLogado();
    this.mensagem = new MensagemChat(null, this.usuarioLogado, "");
    this.visibilidade = true;

    this.mensagens = [];
    this.mensagens$ = new BehaviorSubject([]);

    /* this.chatService.observerChat.subscribe(mensagem =>{
      this.mensagens.push(mensagem);
    }) */

  
    this.chatService.observerChat.subscribe(mensagem=>{
      this.mensagens.push(mensagem);
      this.mensagens$.next(this.mensagens);
      this.changeDetectorRef.detectChanges();
      let height = this.scroll.el.nativeElement.getBoundingClientRect().height*this.mensagens.length;
      this.scroll.scrollTop(height);
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
