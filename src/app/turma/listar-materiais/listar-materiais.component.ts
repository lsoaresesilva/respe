import { Component, OnInit } from '@angular/core';
import { MaterialEnviado } from 'src/app/model/materialEnviado';
import Query from 'src/app/model/firestore/query';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/login-module/login.service';
import { AngularFireStorage } from '@angular/fire/storage';
import Turma from 'src/app/model/turma';

@Component({
  selector: 'app-listar-materiais',
  templateUrl: './listar-materiais.component.html',
  styleUrls: ['./listar-materiais.component.css']
})
export class ListarMateriaisComponent implements OnInit {
  materialEnviado;
  material;
  usuario;
  turma;

  constructor(private route: ActivatedRoute, private messageService: MessageService, private router: Router, private login:LoginService, private _storage: AngularFireStorage) {
    this.materialEnviado = new MaterialEnviado(null,null,null,null,null,null);
    this.usuario = this.login.getUsuarioLogado();
   }

  ngOnInit() {
     MaterialEnviado.getAll(new Query("nome", "==", this.usuario.email)).subscribe(material => { this.material = material});
     this.route.params.subscribe(params => {
      if (params['turmaId'] != null) {
       
        Turma.get(params['turmaId']).subscribe(resultado => {
          
          this.turma = resultado
        });
      }
    });
  }
  excluirMaterial(material) {
    this.mensagemDelete();
      this._storage.storage.refFromURL(material.url).delete();
      MaterialEnviado.delete(material.pk()).subscribe(material => {
      });
      MaterialEnviado.getAll(new Query("nome", "==", this.usuario.email)).subscribe(material => { this.material = material});
      
  
  }
  redirecionar(){
    this.router.navigate(["main", { outlets: { principal: ['listar-materiais', this.turma.pk()] } }])
  }
  mensagemDelete() {
    this.messageService.add({severity:'success', summary:'Mensagem de delete.', detail:'Seu matérial foi deletado.'});
  }

}
