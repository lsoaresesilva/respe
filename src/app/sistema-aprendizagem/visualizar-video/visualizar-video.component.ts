import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login-module/login.service';
import PageTrackRecord from 'src/app/model/analytics/pageTrack';
import VideoProgramacao from 'src/app/model/sistema-aprendizagem/videoProgramacao';

@Component({
  selector: 'app-visualizar-video',
  templateUrl: './visualizar-video.component.html',
  styleUrls: ['./visualizar-video.component.css'],
})
export class VisualizarVideoComponent implements OnInit {
  video;

  @ViewChild('videoPlayer')
  videoPlayer: ElementRef;

  constructor(
    private rota: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private login: LoginService
  ) {
    this.rota.params.subscribe((params) => {
      if (params['videoId'] != null) {
        VideoProgramacao.get(params['videoId']).subscribe((video) => {
          video.link = this.sanitizer.bypassSecurityTrustResourceUrl(video.link);
          this.video = video;

          var monitor = setInterval(() => {
            var elem = document.activeElement;
            if (elem && elem.tagName == 'IFRAME') {
              const pageTrack = new PageTrackRecord(
                null,
                'visualizacao-video',
                this.login.getUsuarioLogado()
              );
              pageTrack.save().subscribe(() => {
                console.log(pageTrack.pk());
              });
              clearInterval(monitor);
            }
          }, 100);
        });
      }
    });
  }

  ngOnInit(): void {}

  gerenciarClique(evento) {
    console.log('clicou');
  }
}
