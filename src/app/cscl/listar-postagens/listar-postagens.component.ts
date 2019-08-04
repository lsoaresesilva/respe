import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Postagem from 'src/app/model/postagem';
import Query from 'src/app/model/firestore/query';
import { LoginService } from 'src/app/juiz/login.service';
import Turma from 'src/app/model/turma';
import Usuario from 'src/app/model/usuario';

@Component({
  selector: 'app-listar-postagens',
  templateUrl: './listar-postagens.component.html',
  styleUrls: ['./listar-postagens.component.css']
})
export class ListarPostagensComponent implements OnInit {
  turmaId;
  postagens;
  usuario;
  turma;

  constructor(private router:Router,private route: ActivatedRoute,private login:LoginService) {
    this.usuario = this.login.getUsuarioLogado();
    this.turma = new Turma(null,null,null,null);
   }

  ngOnInit() {
    this.route.params.subscribe(params=> {this.turmaId = params["turmaId"];
    Turma.get(this.turmaId).subscribe(turma =>{this.turma =turma})
    Postagem.getAll(new Query("turmaId","==",this.turmaId)).subscribe(postagens=>{this.postagens = postagens;

      this.postagens.forEach(postagem => {
        postagem.estudante = new Usuario(null,null,null,null);
        Usuario.get(postagem.estudanteId).subscribe(estudante =>{
         postagem.estudante = estudante;
        });
       
        
      });
   
    
    });
          
    });
     

   
     
   
  }


  cadastrar(){

    this.router.navigate(["main", { outlets: { principal: ['cadastrar-postagem',this.turmaId] } } ] );
  }

  abrirPostagem(postagem){
    this.router.navigate(["main", { outlets: { principal: ['visualizar-postagem',postagem.id]} } ] );
  }
}
