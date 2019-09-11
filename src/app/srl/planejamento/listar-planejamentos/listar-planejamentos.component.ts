import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Planejamento } from 'src/app/model/planejamento';
import { Assunto } from 'src/app/model/assunto';
import { Router } from '@angular/router';
import Usuario from 'src/app/model/usuario';
import Query from 'src/app/model/firestore/query';
import { forkJoin } from 'rxjs';
import { LoginService } from 'src/app/login-module/login.service';
import { MessageService, MenuItem } from 'primeng/api';
//import { MessageService } from 'primeng/primeng';

@Component({
  selector: 'app-listar-planejamentos',
  templateUrl: './listar-planejamentos.component.html',
  styleUrls: ['./listar-planejamentos.component.css']
})
export class ListarPlanejamentosComponent implements OnInit {
  planejamentos: any[] = [];
  assuntos: any[] = [];
  visibilidadeDialogPlanejamento;
  usuario;
  selectedPlanejamento: Planejamento;
  items: MenuItem[];

  constructor(private router: Router, private login:LoginService,private messageService: MessageService) { 
    this.usuario = login.getUsuarioLogado();
    this.visibilidadeDialogPlanejamento = false;

  }

  ngOnInit() {

    
      this.items = [
      { label: 'Alterar', icon: 'pi pi-check', command: (event) => this.alterar(this.selectedPlanejamento) },
      { label: 'Deletar', icon: 'pi pi-times', command: (event) => this.deletar(this.selectedPlanejamento) },
    
      ];
      
    this.getPlanejamentos();
    this.exibirDialogPlanejamento();
  }

  exibirDialogPlanejamento(){
    
    if(localStorage.getItem("exibicaoDialogPlanejamento") == undefined || localStorage.getItem("exibicaoDialogPlanejamento") != this.login.getUsuarioLogado().pk()){
      this.visibilidadeDialogPlanejamento = true;

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
      /*planejamentosCadastrados.forEach(planejamento=>{
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

        
      })*/

      this.planejamentos = planejamentosCadastrados
    }, err=>{
      
    });
  }

  abrirPlanejamento(planejamento) {
    this.router.navigate(['main', { outlets: { principal: ['visualizacao-planejamento', planejamento.pk()] } }]);
  }

  criarPlanejamento() {
    this.router.navigate(["main", { outlets: { principal: ['cadastro-planejamento'] } }])
  }

  alterar(planejamento: Planejamento) {
    if(planejamento != undefined){
      this.router.navigate(["main", { outlets: { principal: ['atualizacao-planejamento', planejamento.pk()] } } ] );
    }
    
  }

  deletar(planejamento:Planejamento) {
     Planejamento.delete(planejamento.pk()).subscribe(resultado=>{
      Planejamento.getAll(new Query("estudanteId", "==",this.usuario.pk())).subscribe(planejamentosCadastrados => {
     this.planejamentos = planejamentosCadastrados });
      this.messageDeletar();
    });
  }  

  messageDeletar() {
    this.messageService.add({severity:'error', summary:'Deletado!', detail:"Esse planejamento foi apagado!"});
  }
}
