import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import AtividadeGrupo from 'src/app/model/cscl/atividadeGrupo';
import Grupo from 'src/app/model/cscl/grupo';
import Query from 'src/app/model/firestore/query';
import Turma from 'src/app/model/turma';

@Component({
  selector: 'app-modificar-grupo',
  templateUrl: './modificar-grupo.component.html',
  styleUrls: ['./modificar-grupo.component.css']
})
export class ModificarGrupoComponent implements OnInit {

  atividadeGrupo:AtividadeGrupo;
  grupo:Grupo;
  estudantes;
  turmaSelecionada;
  pesquisaTurmas;

  pesquisaEstudantes;
  estudantesTurma;


  constructor(private route:ActivatedRoute,private messageService: MessageService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      if (params['atividadeGrupoId'] != null && params['grupoId'] != null) {
        AtividadeGrupo.get(params['atividadeGrupoId']).subscribe((atividadeGrupo) => {
          this.atividadeGrupo = atividadeGrupo as AtividadeGrupo;
          this.grupo = this.atividadeGrupo.getGrupo(params['grupoId']);
          this.grupo.getEstudantes().subscribe(estudantes=>{
            this.estudantes = estudantes;
          })
        });
      }
    });
  }

  excluir(estudante){
    this.estudantes = this.estudantes.filter(item => item.pk() !== estudante.pk());

    for(let i = 0; i < this.atividadeGrupo.estudantes.length; i++){
      if( this.atividadeGrupo.estudantes[i].pk() == estudante.pk()){
        this.atividadeGrupo.estudantes.splice(i, 1)
      }
    }
    
  }

  pesquisarTurma(event) {
    Turma.pesquisar(new Query('codigo', '==', event.query)).subscribe((turmas) => {
      this.pesquisaTurmas = turmas;
    });
  }

  selecionarTurma(event) {
    Turma.getAllEstudantes(this.turmaSelecionada.codigo).subscribe((estudantes) => {
      this.estudantesTurma = estudantes;
      this.pesquisaEstudantes = estudantes;
    });
  }

  atualizar(){
    this.atividadeGrupo.grupos.forEach(grupo => {
      if(grupo.id == this.grupo.id){
        grupo.estudantes = this.estudantes;
      }
      
    });

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


    this.atividadeGrupo.save().subscribe(()=>{
      this.messageService.add({severity:'success', summary:'Operação realizada com sucesso', detail:"Grupo atualizado"});
    });
  }

}
