import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login-module/login.service';
import ConfiguracaoEditor from 'src/app/model/configuracoes/configuracaoEditor';
import Query from 'src/app/model/firestore/query';
import VideoProgramacao from 'src/app/model/sistema-aprendizagem/videoProgramacao';

@Component({
  selector: 'app-listar-videos',
  templateUrl: './listar-videos.component.html',
  styleUrls: ['./listar-videos.component.css']
})
export class ListarVideosComponent implements OnInit {

  videos$;

  constructor(private router:Router, private login:LoginService) { }

  ngOnInit(): void {
    let usuario = this.login.getUsuarioLogado();
    this.videos$ = VideoProgramacao.listarTodos(usuario);
    
  }

  abrirVideo(video:VideoProgramacao){
    this.router.navigate([
      'geral/main',
      { outlets: { principal: ['aprendizagem', 'visualizar-video', video.pk()] } },
    ]);
  }

  

}
