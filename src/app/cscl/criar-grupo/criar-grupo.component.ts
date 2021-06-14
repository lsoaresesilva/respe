import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import Grupo from 'src/app/model/cscl/grupo';
import { Groups } from 'src/app/model/experimento/groups';
import AutoInstrucaoColetiva from 'src/app/model/srl/autoInstrucaoColetivo';
import Turma from 'src/app/model/turma';

@Component({
  selector: 'app-criar-grupo',
  templateUrl: './criar-grupo.component.html',
  styleUrls: ['./criar-grupo.component.css']
})
export class CriarGrupoComponent implements OnInit {

  atividadeGrupo:AtividadeGrupo;
  pesquisaEstudantes;
  estudantes;

  constructor(private route:ActivatedRoute, private messageService:MessageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      if(params["atividadeGrupoId"] != null){
        AtividadeGrupo.get(params['atividadeGrupoId']).subscribe((atividadeGrupo) => {
          this.atividadeGrupo = atividadeGrupo as AtividadeGrupo;

          Turma.getAllEstudantes(this.atividadeGrupo.turma.codigo).subscribe((estudantes) => {
            this.pesquisaEstudantes = estudantes;
          });
        });
      }
    })
  }

  excluir(estudante){
    this.estudantes = this.estudantes.filter(item => item.pk() !== estudante.pk());

    for(let i = 0; i < this.atividadeGrupo.estudantes.length; i++){
      if( this.atividadeGrupo.estudantes[i].pk() == estudante.pk()){
        this.atividadeGrupo.estudantes.splice(i, 1)
      }
    }
    
  }

  salvar(){
   

    this.estudantes.forEach(estudante => {
      let isAdicionado;
      this.atividadeGrupo.estudantes.forEach(estudanteAdicionado => {
        if(estudanteAdicionado.pk() == estudante.pk()){
          isAdicionado = true;
        }
      });

      if(!isAdicionado){
        this.atividadeGrupo.estudantes.push(estudante);
      }
    });

    let grupo = new Grupo(null, this.estudantes);

    if(grupo.validar()){
      this.atividadeGrupo.grupos.push(grupo);


      this.atividadeGrupo.save().subscribe(()=>{

        if(Array.isArray(grupo.estudantes) && grupo.estudantes.length > 0){
          if(grupo.estudantes[0].grupoExperimento == Groups.experimentalB){
            let selfInstructionColetivo = new AutoInstrucaoColetiva(null, "", "", grupo, [], null, false);
            selfInstructionColetivo.save().subscribe(()=>{
              this.messageService.add({severity:'success', summary:'Operação realizada com sucesso', detail:"Grupo cadastrado"});
            })
          }
        }
        

        
      });
    }

    
  }

}
