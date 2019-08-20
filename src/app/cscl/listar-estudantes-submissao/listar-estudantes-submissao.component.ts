import { Component, OnInit, Input } from '@angular/core';
import Submissao from 'src/app/model/submissao';
import { Router, ActivatedRoute } from '@angular/router';
import Query from 'src/app/model/firestore/query';
import Usuario from 'src/app/model/usuario';
import { LoginService } from 'src/app/juiz/login.service';


@Component({
  selector: 'app-listar-estudantes-submissao',
  templateUrl: './listar-estudantes-submissao.component.html',
  styleUrls: ['./listar-estudantes-submissao.component.css']
})
export class ListarEstudantesSubmissaoComponent implements OnInit {
  
  private submissoesDaQuestao;
  private questao;
  private submissoes;
  private estudante;
  private assuntoId;
  private usuario;
  @Input ("questaoId") questaoId;

  constructor(private router:Router,private route: ActivatedRoute,private login:LoginService) { 
  this.usuario= login.getUsuarioLogado();
  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.questao= params['questaoId'];
     
      Submissao.getAll(new Query("questaoId","==",this.questao)).subscribe(resultado =>{
      //eliminar a submissao do próprio estudante
        this.submissoes = resultado.filter((sub) => {
          if (sub.estudanteId !== ( this.usuario.pk() )) { return true}
        });

        this.filtrarSubmissoesConcluidas(this.submissoes);
      });
    });
  }



  filtrarSubmissoesConcluidas(submissoesQuestao=[]){
    console.log("array de filtrarSubmissoesConcluidas" + submissoesQuestao);
   // Filtrando todas as submissões que o seu resultadosTestsCase não seja undefined
		let submissaoFiltrada = submissoesQuestao.filter(submissao => {
      return submissao.resultadosTestsCases !== undefined
      
   })
   // Filtrando toda as submissões que tem todos os seus testsCases com status true
   .filter(submissao => {
     
     // Retornar um array vazio caso o resultadosTestsCases tenha todos os elementos com status true. Caso não, o array vai retornar 
     // com pelo menos um elemento com status false
     let filterFalseTestsCases = submissao.resultadosTestsCases.filter(el => el.status === false)

     // Se a submissão tiver todos seus status true, então retorne-a
     if(filterFalseTestsCases.length === 0) {return submissao} 
   
        
    });
 
     this.buscarSubmissaoRecente(submissaoFiltrada);

  }




  BuscarEstudantePorSubmissao(submissoesQuestao=[]){
    console.log("buscarEstudante" + submissoesQuestao)
    for(let i=0;i<submissoesQuestao.length;i++){

      Usuario.get(submissoesQuestao[i].estudanteId).subscribe(resultado=>{
        this.estudante=resultado;
        submissoesQuestao[i].estudante=this.estudante.nome;
      });
    }
    
    this.submissoesDaQuestao=submissoesQuestao;
  

  }

  buscarSubmissaoRecente(submissoes=[]){
    console.log("array de buscarSubmissaoRecente" + submissoes);
    let submissoesRecentes=[];
    
    submissoes.forEach(submissao=>{
      Submissao.getRecentePorQuestao(submissao.questaoId,submissao.estudanteId).subscribe(submissaoResultado => {
          submissoesRecentes.push(submissaoResultado);

          this.eliminandosubmissoesRepetidas(submissoesRecentes);
      });
    });

    

  }

  eliminandosubmissoesRepetidas(todasSubmissoes=[]){
    console.log("eliminando submissoes repetidas" + todasSubmissoes)
    let submissoesSemRepeticao=[];

    todasSubmissoes.forEach(submissao => {
      let temRepeticao = submissoesSemRepeticao.findIndex (submissaoTratada => submissao.estudanteId ===
        submissaoTratada.estudanteId) !== -1;

        if(!temRepeticao){
          submissoesSemRepeticao.push(submissao);
        }
      })
    this.BuscarEstudantePorSubmissao(submissoesSemRepeticao);
  }




 
  visualizarSubmissao(submissao){
    this.router.navigate(["main", { outlets: { principal: ['listar-submissao-questao', submissao.id] } } ] );
  }

  
 
}
  


