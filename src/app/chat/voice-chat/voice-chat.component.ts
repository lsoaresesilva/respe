import { Component, Input, OnInit } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient } from 'agora-rtc-sdk-ng';
import { retry } from 'rxjs/operators';
import { GravacaoVideoService } from '../gravacao-video.service';

@Component({
  selector: 'app-voice-chat',
  templateUrl: './voice-chat.component.html',
  styleUrls: ['./voice-chat.component.css'],
})
export class VoiceChatComponent implements OnInit {
  isMicrofoneAtivo;
  isErro;

  @Input()
  grupo;

  constructor(private gravacao: GravacaoVideoService) {
    
    this.isMicrofoneAtivo = false;
    this.isErro = false;
  }

  ngOnInit(): void {
    this.gravacao.inicializar();
    this.gravacao.receberDadosNovoUsuario();
  }

  async entrarSala() {
    try{
      const uid = await this.gravacao.entrarSala(this.grupo);
      this.isMicrofoneAtivo = true;
      this.gravacao.gravar(this.grupo.id).subscribe((resposta)=>{
        this.isErro = false;
      }, (err)=>{
        this.isErro = true;
      })
      this.isErro = false;
    }catch(e){
      this.isErro = true;
    }
    
  }

  

  

  
}
