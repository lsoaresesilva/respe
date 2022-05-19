import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Assunto } from 'src/app/model/questoes/assunto';
import Texto from '../../model/sistema-aprendizagem/texto';


@Component({
  selector: 'app-visualizar-texto',
  templateUrl: './visualizar-texto.component.html',
  styleUrls: ['./visualizar-texto.component.css']
})
export class VisualizarTextoComponent implements OnInit {

  texto;
  assunto;

  constructor(private rota: ActivatedRoute,
    private sanitizer: DomSanitizer,) {
    this.rota.params.subscribe((params) => {
      if (params['textoId'] != null && params['assuntoId']) {
        Texto.get(params['textoId']).subscribe((texto) => {
          texto.link = this.sanitizer.bypassSecurityTrustResourceUrl(texto.link);
          this.texto = texto;

          Assunto.get(params['assuntoId']).subscribe((assunto) => {
            this.assunto = assunto;

          });

          /* var monitor = setInterval(() => {
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
          }, 100); */
        });
      }
    });

  }

  ngOnInit(): void {
  }

}
