import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../login-module/login.service';

import * as firebase from 'firebase/compat';
import { forkJoin, Observable } from 'rxjs';
import Analytics from '../../model/analytics/analytics';
import ConfiguracaoEditor from '../../model/configuracoes/configuracaoEditor';
import { Groups } from '../../model/experimento/groups';
import { Assunto } from '../../model/aprendizagem/questoes/assunto';
import Query from '../../model/firestore/query';

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
      const query: Observable<Assunto>[] = [];
      if(configuracao != null){
        if(configuracao.assuntos != null){
          configuracao.assuntos.forEach(assunto => {
            query.push(Assunto.get(assunto));
          });

        }

        forkJoin(query).subscribe(assuntos=>{
          this.assuntos = assuntos;

          if(this.usuario.grupoExperimento != Groups.control){
            this.assuntos.forEach((assunto) => {
              Assunto.consultarRespostasEstudante(this.usuario).subscribe(respostas=>{
                let percentual = Analytics.calcularProgressoNoAssunto(assunto, respostas);
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
                let percentual = Analytics.calcularProgressoNoAssunto(assunto, respostas);
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
      'geral/main',
      { outlets: { principal: ['juiz','visualizar-assunto', assunto.pk()] } },
    ]);
  }

  registrar() {
    this.router.navigate(['geral/main', { outlets: { principal: ['codigo-similar'] } }]);
  }
}
