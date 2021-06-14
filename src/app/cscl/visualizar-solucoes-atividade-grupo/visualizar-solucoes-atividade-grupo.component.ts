import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import SubmissaoGrupo from 'src/app/model/cscl/submissaoGrupo';
import Query from 'src/app/model/firestore/query';
import { Util } from 'src/app/model/util';

@Component({
  selector: 'app-visualizar-solucoes-atividade-grupo',
  templateUrl: './visualizar-solucoes-atividade-grupo.component.html',
  styleUrls: ['./visualizar-solucoes-atividade-grupo.component.css']
})
export class VisualizarSolucoesAtividadeGrupoComponent implements OnInit {


  atividadeGrupo;
  grupo;
  submissoesGrupo;

  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['atividadeGrupoId'] != null && params['grupoId'] != null) {
        AtividadeGrupo.get(params['atividadeGrupoId']).subscribe((atividadeGrupo) => {
          this.atividadeGrupo = atividadeGrupo as AtividadeGrupo;
          this.grupo = this.atividadeGrupo.getGrupo(params['grupoId']);
          SubmissaoGrupo.getAll(new Query("grupoId", "==", params['grupoId'])).subscribe(submissoes=>{


            submissoes.map(submissao=>{
              if(submissao.data != null){
                submissao.data = Util.firestoreDateToDate(submissao.data);
              }
            })

            submissoes.sort((submissaoA, submissaoB)=>{
              if(submissaoA.data < submissaoB.data){
                return 1;
              }else if(submissaoA.data > submissaoB.data){
                return -1;
              }else{
                return 0;
              }
            })

            this.submissoesGrupo = submissoes;
          })
        });
      }
    });
  }

  converterParaDate(data) {
    
    
  }

  visualizarSubmissao(submissao){
    this.router.navigate(["geral/main", { outlets: { principal: ['visualizar-submissao-questao', submissao, true] } }]);
  }

  visualizarChat(){
    this.router.navigate(["geral/main", { outlets: { principal: ['visualizar-chat', this.atividadeGrupo.pk(), this.grupo.id] } }]);
  }

  modificarGrupo(){
    this.router.navigate(["geral/main", { outlets: { principal: ['cscl','modificar-grupo', this.atividadeGrupo.pk(), this.grupo.id] } }]);
  }

}
