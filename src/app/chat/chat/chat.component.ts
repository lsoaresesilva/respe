import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChatAdapter, ChatParticipantStatus, Group, IChatController } from 'ng-chat';
import { BehaviorSubject } from 'rxjs';
import { MonitorService } from 'src/app/chatbot/monitor.service';
import { LoginService } from 'src/app/login-module/login.service';
import MensagemChat from 'src/app/model/cscl/chat/mensagemChat';
import { Groups } from 'src/app/model/experimento/groups';
import Usuario from 'src/app/model/usuario';
import { ChatService } from '../chat.service';
import ChatGrupoAdapter from '../chatGrupo';
import ChatGrupo from '../chatGrupo';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatGrupoComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  mensagens$;
  mensagens;
  mensagem: MensagemChat;
  visibilidade;
  participantes;

  estudante:Usuario;

  grupoAdapter: ChatGrupoAdapter;
  grupoInicializado;

  @ViewChild('ngChatInstance')
  protected ngChatInstance: IChatController;

  @ViewChild('scroll') scroll;
  @Input('atividadeGrupo') atividadeGrupo;
  @Input('grupo') grupo;

  constructor(
    private loginService: LoginService,
    public chatService: ChatService,
    private changeDetectorRef: ChangeDetectorRef,
    private monitor: MonitorService
  ) {
    this.estudante = this.loginService.getUsuarioLogado();
    this.grupoInicializado = false;

    /* this.mensagem = new MensagemChat(null, this.estudante, "", this.grupo, this.atividadeGrupo); */
    /* this.visibilidade = true;

    this.mensagens = [];

    this.mensagens$ = new BehaviorSubject([]); */

    /* this.chatService.observerChat.subscribe(mensagem=>{
      this.mensagens.push(mensagem);
      this.mensagens$.next(this.mensagens);
      this.changeDetectorRef.detectChanges();


    }) */
  }

  ngOnDestroy(): void {
    this.grupoAdapter.desconectar(this.estudante);
  }

  ngAfterViewInit(): void {

    if(this.estudante.grupoExperimento == Groups.control){
      this.grupoInicializado = true;
      this.abrirGrupo();
    }else{
      if (this.ngChatInstance != null && !this.grupoInicializado && this.grupo != null) {

        this.grupoInicializado = true;
        this.abrirGrupo();
      }
    }

  }

  abrirGrupo() {

    this.grupoAdapter.iniciar(this.estudante).subscribe(grupo=>{
      this.ngChatInstance.triggerOpenChatWindow(grupo);
    });

  }

  abrirConversa(usuario) {
    if(usuario.id != this.grupo.id){
      this.ngChatInstance.triggerCloseChatWindow(usuario.id);
    }

  }

  clicarParticipante(x) {
    console.log('clicou');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.atividadeGrupo != null && this.grupo != null) {

      this.grupoAdapter = new ChatGrupoAdapter(this.grupo);


      /* this.iniciarChat(); */
      /*
      let u = new Usuario(null, "", null, null, null, "Davizinho");
      u.status = ChatParticipantStatus.Online;
      let u2 = new Usuario(null, "", null, null, null, "Leo");
      u2.status = ChatParticipantStatus.Online;


      let grupo = new Group([u, u2]);
      grupo.id = this.grupo.id; */



    }

    if (this.atividadeGrupo != null) {
      /*  this.mensagem.atividadeGrupo = this.atividadeGrupo; */
    }


  }

  ngOnInit(): void {
    // Iniciar timer da issue #633

    if (this.estudante.grupoExperimento == Groups.experimentalB) {
      setInterval(() => {
        this.monitor.monitorarInteracaoEstudante(this.grupo, this.estudante);
      }, 300000);
    }
  }

  getHeader(estudante) {
    return estudante instanceof Object ? estudante.nome : estudante;
  }



  /* enviar(event){
    if(this.grupo != null && this.atividadeGrupo != null){
      this.mensagem.atividadeGrupo = this.atividadeGrupo;
      this.mensagem.grupo = this.grupo;
      this.chatService.enviarMensagem(this.mensagem).subscribe(()=>{
        this.mensagem.texto = "";

      })
    }

  } */
}
