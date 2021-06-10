import { ChangeDetectorRef, Component, Input, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MonitorService } from 'src/app/chatbot/monitor.service';
import { LoginService } from 'src/app/login-module/login.service';
import MensagemChat from 'src/app/model/cscl/chat/mensagemChat';
import { Groups } from 'src/app/model/experimento/groups';
import { ChatService } from '../../cscl/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatGrupoComponent implements OnInit, OnChanges {

  mensagens$;
  mensagens;
  mensagem:MensagemChat;
  visibilidade;
  usuarioLogado;
  participantes;

  estudante;

  @ViewChild('scroll') scroll;
  @Input("atividadeGrupo") atividadeGrupo;
  @Input("grupo") grupo;

  constructor(private loginService:LoginService, private chatService:ChatService, private changeDetectorRef: ChangeDetectorRef, private monitor:MonitorService ) {
    this.usuarioLogado = this.loginService.getUsuarioLogado();
    this.mensagem = new MensagemChat(null, this.usuarioLogado, "", this.grupo, this.atividadeGrupo);
    this.visibilidade = true;

    this.mensagens = [];
    
    this.mensagens$ = new BehaviorSubject([]);

    this.estudante = this.loginService.getUsuarioLogado();

  
    this.chatService.observerChat.subscribe(mensagem=>{
      this.mensagens.push(mensagem);
      this.mensagens$.next(this.mensagens);
      this.changeDetectorRef.detectChanges();
      let height = this.scroll.el.nativeElement.getBoundingClientRect().height*this.mensagens.length;
      this.scroll.scrollTop(height);
    })

    
   }
   
  ngOnChanges(changes: SimpleChanges): void {
    if(this.atividadeGrupo != null){
      this.mensagem.atividadeGrupo = this.atividadeGrupo;

      
    }

    if(this.grupo != null){
      this.chatService.carregarMensagens(this.grupo);
    }

    
  }

  ngOnInit(): void {
   // Iniciar timer da issue #633

   if(this.estudante.grupoExperimento == Groups.experimentalB){
    
    setInterval(()=>{
     this.monitor.monitorarInteracaoEstudante(this.grupo, this.estudante );
    }, 300000);
   }
   
  }

  getHeader(estudante){
    return estudante instanceof Object?estudante.nome:estudante;
  }


  
  enviar(){
    if(this.grupo != null && this.atividadeGrupo != null){
      this.mensagem.atividadeGrupo = this.atividadeGrupo;
      this.mensagem.grupo = this.grupo;
      this.chatService.enviarMensagem(this.mensagem).subscribe(()=>{
        this.mensagem.texto = "";
  
      })
    }
    
  }

}
