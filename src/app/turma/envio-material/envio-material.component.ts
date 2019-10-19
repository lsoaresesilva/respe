import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoginService } from 'src/app/login-module/login.service';
import Turma from 'src/app/model/turma';

import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MaterialEnviado } from 'src/app/model/materialEnviado';



@Component({
  selector: 'app-envio-material',
  templateUrl: './envio-material.component.html',
  styleUrls: ['./envio-material.component.css'],
  
})

export class EnvioMaterialComponent implements OnInit {


  uploadProgress: Observable<number>;

  uploadURL: string;
  file: File;
  fileName: String;
  fileDownload: String;
  usuario;
  turma;
  materialEnviado;
  descricao;


  constructor(private _storage: AngularFireStorage, private login:LoginService, private route: ActivatedRoute, private messageService: MessageService, private router: Router) { 
    this.usuario = this.login.getUsuarioLogado();
    this.turma = new Turma(null, null,null,null);
    this.materialEnviado = new MaterialEnviado(null,null,null,null,null,null);
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['turmaId'] != null) {
       
        Turma.get(params['turmaId']).subscribe(resultado => {

          this.turma = resultado
        });
      }
    });
    
  }

  upload(event) {
    this.fileName = this.file.name
    const randomId = Math.random().toString(36).substring(2);
    const ref = this._storage.ref(`materialAula/${randomId}-${this.file.name}`);
    const task = ref.put(this.file);
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          this.uploadURL = url;
          this.fileDownload = url;
          this.materialEnviado.nomeArquivo = this.fileName;
          this.materialEnviado.url = this.fileDownload;
          this.materialEnviado.descricao = this.descricao;
          this.materialEnviado.nome = this.usuario.email;
          this.materialEnviado.turma = this.turma.nome;
          this.mensagemSucesso();
          if (this.materialEnviado.nomeArquivo != undefined ||
             this.materialEnviado.descricao != undefined || this.materialEnviado.nome != undefined ||
             this.materialEnviado.turma != undefined){
          this.materialEnviado.save().subscribe(resultado => {});
          this.redirecionar();
        } else {
          this.mensagemErro();

        }



        })
      })
    ).subscribe(url => {
    });
  }
  mensagemSucesso() {
    this.messageService.add({severity:'success', summary:'Mensagem de sucesso', detail:'Seu matérial foi adicionado.'});
  }
  mensagemErro() {
    this.messageService.add({severity:'error', summary:'error', detail:'Arquivo invalido!'});
  }

  submit(event){
    this.file = event.files[0];
  }
  redirecionar(){
    this.router.navigate(["main", { outlets: { principal: ['listar-materiais', this.turma.id] } }]);
  }
  

}
