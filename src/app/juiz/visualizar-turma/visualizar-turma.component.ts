
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EstudanteTurma from 'src/app/model/estudanteTurma';
import Query from 'src/app/model/firestore/query';
import Usuario from 'src/app/model/usuario';
import Estudante from 'src/app/model/estudante';


@Component({
  selector: 'app-visualizar-turma',
  templateUrl: './visualizar-turma.component.html',
  styleUrls: ['./visualizar-turma.component.css']
})
export class VisualizarTurmaComponent implements OnInit {

  sub: any;
  id;
  buscarEstudantes=[];
  estudante;
  resultado;
  turma;

  constructor(private route: ActivatedRoute) { 
    this.estudante = new Usuario(null,null,null,null);
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
    this.id = params = ['turmaId'];
    EstudanteTurma.getAll (new Query ("turmaId", "==", this.turma)).subscribe(resultado=> {this.resultado= resultado
  
    this.BuscarEstudante(this.resultado);
      console.log (this.BuscarEstudante(this.resultado + "A função"));
    });
  });
  }
  BuscarEstudante(estudanteTurma ){
   
    for (let i =0; i<estudanteTurma.length; i++){ 
      Usuario.get(estudanteTurma[i].estudanteId).subscribe(resultado =>{this.estudante = resultado, console.log (this.estudante + "o estudante na função")});
      console.log (estudanteTurma.estudanteId)
      this.buscarEstudantes.push(this.estudante);
      console.log(this.estudante.nome+ "nome do estudante")
  
    }
  }

}

 
