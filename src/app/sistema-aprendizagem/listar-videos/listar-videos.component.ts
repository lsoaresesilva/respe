import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import VideoProgramacao from 'src/app/model/sistema-aprendizagem/videoProgramacao';

@Component({
  selector: 'app-listar-videos',
  templateUrl: './listar-videos.component.html',
  styleUrls: ['./listar-videos.component.css']
})
export class ListarVideosComponent implements OnInit {

  videos$;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.videos$ = VideoProgramacao.getAll();
  }

  abrirVideo(video:VideoProgramacao){
    this.router.navigate([
      'main',
      { outlets: { principal: ['visualizar-video', video.pk()] } },
    ]);
  }

  

}
