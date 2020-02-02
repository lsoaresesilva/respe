import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import { Planejamento } from 'src/app/model/planejamento';
import { Groups } from 'src/app/model/experimento/groups';

@Component({
  selector: 'app-breadcrumb-assunto',
  templateUrl: './breadcrumb-assunto.component.html',
  styleUrls: ['./breadcrumb-assunto.component.css']
})
export class BreadcrumbAssuntoComponent implements OnInit {


  @Input()
  assunto;

  @Input()
  questao;

  usuario;
  planejamento;

  constructor(public login:LoginService) { }

  ngOnInit() {
    this.usuario = this.login.getUsuarioLogado();
    if(this.usuario.grupoExperimento != Groups.control){
      if(this.assunto != null){
        Planejamento.getByAssunto(this.assunto, this.usuario).subscribe(planejamento=>{
          this.planejamento = planejamento;
        })
      }
    }
    
  }

}
