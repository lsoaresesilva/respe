import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import MensagemChat from 'src/app/model/cscl/chat/mensagemChat';
import Query from 'src/app/model/firestore/query';
import { Util } from 'src/app/model/util';

@Component({
  selector: 'app-visualizar-chat',
  templateUrl: './visualizar-chat.component.html',
  styleUrls: ['./visualizar-chat.component.css']
})
export class VisualizarChatComponent implements OnInit {
  
  mensagens;

  constructor(private route:ActivatedRoute) { 
    this.route.params.subscribe(params=>{
      if(params["atividadeGrupoId"] != null && params["grupoId"] != null){
        MensagemChat.getAll(new Query("grupoId", "==", params["grupoId"])).subscribe(mensagens=>{
          mensagens.sort((mensagemA, mensagemB)=>{
            if(mensagemA.data.toMillis() < mensagemB.data.toMillis()){
              return -1;
            }else if(mensagemA.data.toMillis() > mensagemB.data.toMillis()){
              return 1;
            }else{
              return 0;
            }
          })

          mensagens.map(mensagem=>mensagem.data = Util.firestoreDateToDate(mensagem.data));

          this.mensagens = mensagens;
        })
      }else{
        
      }
    })
  }

  ngOnInit(): void {
  }

}
