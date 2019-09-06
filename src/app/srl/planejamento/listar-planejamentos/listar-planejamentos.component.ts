import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Planejamento } from 'src/app/model/planejamento';
import { Assunto } from 'src/app/model/assunto';
import { Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import Query from 'src/app/model/firestore/query';
import { forkJoin } from 'rxjs';
import { LoginService } from 'src/app/login-module/login.service';

@Component({
  selector: 'app-listar-planejamentos',
  templateUrl: './listar-planejamentos.component.html',
  styleUrls: ['./listar-planejamentos.component.css']
})
export class ListarPlanejamentosComponent implements OnInit {
  planejamentos: any[] = [];
  assuntos: any[] = [];
  @ViewChild('dialogPlanejamento') dialog:ElementRef;

  constructor(private router: Router, private login:LoginService) { }

  ngOnInit() {
    this.getPlanejamentos();
    this.exibirDialogPlanejamento();
  }

  exibirDialogPlanejamento(){
    
    if(localStorage.getItem("exibicaoDialogPlanejamento") == undefined || localStorage.getItem("exibicaoDialogPlanejamento") != this.login.getUsuarioLogado().pk()){
      this.dialog["visible"] = true;
      this.dialog["modal"] = true;
      localStorage.setItem("exibicaoDialogPlanejamento", this.login.getUsuarioLogado().pk());
    }
  }

  getPlanejamentos() {
    let usuario = this.login.getUsuarioLogado();
    if (usuario == null) {
      throw new Error("É preciso estar logado para poder visualizar os planejamentos");
    }

    Planejamento.getAll(new Query("estudanteId", "==", usuario.pk())).subscribe(planejamentosCadastrados => {
      let consultas:any = {} // TODO: migrar para o model.
      planejamentosCadastrados.forEach(planejamento=>{
        consultas[planejamento.pk()] = Assunto.isFinalizado(planejamento.assunto, usuario);
      })

      forkJoin(consultas).subscribe(statusAssuntos=>{
        for(let key in statusAssuntos){
          for(let i = 0; i < planejamentosCadastrados.length; i++){
            
              if(planejamentosCadastrados[i].pk() == key){
                planejamentosCadastrados[i].status = statusAssuntos[key];
                break;
              }
            
          }
        }

        this.planejamentos = planejamentosCadastrados
      })

      
    }, err=>{
      
    });
  }

  abrirPlanejamento(planejamento) {
    this.router.navigate(['main', { outlets: { principal: ['visualizacao-planejamento', planejamento.pk()] } }]);
  }

  criarPlanejamento() {
    this.router.navigate(["main", { outlets: { principal: ['cadastro-planejamento'] } }])
  }

}
