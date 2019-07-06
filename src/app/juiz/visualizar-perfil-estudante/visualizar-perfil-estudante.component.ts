import { Component, OnInit } from '@angular/core';
import Estudante from 'src/app/model/estudante';
import Usuario from 'src/app/model/usuario';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visualizar-perfil-estudante',
  templateUrl: './visualizar-perfil-estudante.component.html',
  styleUrls: ['./visualizar-perfil-estudante.component.css']
})
export class VisualizarPerfilEstudanteComponent implements OnInit {
  estudante;
  resultado;
  id: any;

  constructor(private route: ActivatedRoute) { 
   
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.estudante =params['id'];
console.log (this.estudante)
    Estudante.get(this.estudante).subscribe (resultado=>{this.resultado = resultado});
    this.estudante.push (this.resultado);

  });
  }

}
