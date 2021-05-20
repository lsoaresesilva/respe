import { Component, OnInit } from '@angular/core';
import { Assunto } from 'src/app/model/assunto';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../login-module/login.service';
import { Groups } from 'src/app/model/experimento/groups';
import ConfiguracaoEditor from 'src/app/model/configuracoes/configuracaoEditor';
import Query from 'src/app/model/firestore/query';

import * as firebase from 'firebase';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-listar-assuntos',
  templateUrl: './listar-assuntos.component.html',
  styleUrls: ['./listar-assuntos.component.css'],
})
export class ListarAssuntosComponent implements OnInit {
  assuntos;
  usuario;

  constructor(private router: Router, public login: LoginService, private route: ActivatedRoute) {
    this.usuario = this.login.getUsuarioLogado();
  }

  ngOnInit() {

    ConfiguracaoEditor.getByQuery(new Query("codigoTurma", "==", this.usuario.turma.codigo)).subscribe(configuracao=>{
      let query = null;
      if(configuracao != null){
        if(configuracao.assuntos != null){
          query = [];
          configuracao.assuntos.forEach(assunto => {
            query.push(Assunto.get(assunto));
          });
            
        }

        forkJoin(query).subscribe(assuntos=>{
          this.assuntos = assuntos;

          if(this.usuario.grupoExperimento != Groups.control){
            this.assuntos.forEach((assunto) => {
              Assunto.consultarRespostasEstudante(this.usuario).subscribe(respostas=>{
                let percentual = Assunto.calcularProgresso(assunto, respostas);
                assunto['percentual'] = percentual;
              })
              
            });
          }
        })
        
      }else{
        Assunto.getAll().subscribe((assuntos) => {
          this.assuntos = assuntos;
          
          if(this.usuario.grupoExperimento != Groups.control){
            this.assuntos.forEach((assunto) => {
              Assunto.consultarRespostasEstudante(this.usuario).subscribe(respostas=>{
                let percentual = Assunto.calcularProgresso(assunto, respostas);
                assunto['percentual'] = percentual;
              })
            });
          }
          
        });
      }

      

     
    })
    
  }

  abrirAssunto(assunto) {
    this.router.navigate([
      'main',
      { outlets: { principal: ['visualizacao-assunto', assunto.pk()] } },
    ]);
  }

  registrar() {
    this.router.navigate(['main', { outlets: { principal: ['codigo-similar'] } }]);
  }
}
