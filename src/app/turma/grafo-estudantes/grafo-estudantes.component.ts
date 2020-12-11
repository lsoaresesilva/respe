import { Component, Input, OnInit, OnChanges } from '@angular/core';
import PageTrackRecord from 'src/app/model/analytics/pageTrack';
import Query from 'src/app/model/firestore/query';

@Component({
  selector: 'app-grafo-estudantes',
  templateUrl: './grafo-estudantes.component.html',
  styleUrls: ['./grafo-estudantes.component.css'],
})
export class GrafoEstudantesComponent implements OnChanges {
  @Input()
  estudante;

  constructor() {}

  ngOnChanges(): void {
    if (this.estudante.id != null) {
      let dias = new Map<string, any[]>();
      let matriz = []; /* new Map<string, any[]>(); */

      PageTrackRecord.getAll(new Query('estudanteId', '==', this.estudante.pk())).subscribe(
        (pageTracks) => {
          // Agrupar por dia
          pageTracks.forEach((track) => {
            let dataDoTrack = track.data.toDate();
            let mesDia = dataDoTrack.getDay().toString() + '/' + dataDoTrack.getMonth().toString();
            let hasDia = dias.get(mesDia);
            if (hasDia == null) {
              dias.set(mesDia, []);
            }

            hasDia = dias.get(mesDia);
            hasDia.push(track);
          });

          dias.forEach((dia) => {
            dia.sort(function (a, b) {
              let dataA = a.data.toDate();
              let dataB = b.data.toDate();
              if (dataA < dataB) {
                return -1;
              }

              if (dataA > dataB) {
                return 1;
              }

              return 0;
            });
          });

          dias.forEach((dia) => {
            let m = [];
            dia.forEach((track) => {
              m.push(track.pagina);
            });
            matriz.push(m);
          });

          let z = new Map<string, number>();

          function criarMatrizTransicao(tracks) {
            for (let i = 0; i < tracks.length; i++) {
              let trackAtual = tracks[i];
              let proximoTrack = tracks[i + 1];
              if (proximoTrack != undefined) {
                let proximoProximo = tracks[i + 2];
                if (
                  proximoProximo == 'visualizacao-assunto' &&
                  trackAtual == 'editor' &&
                  proximoTrack == 'self-instruction'
                ) {
                  console.log('Só retornou ao assunto via self-instruction');
                } else {
                  let key = trackAtual + ' ' + proximoTrack;
                  let total = z.get(key);
                  if (total == null) {
                    z.set(key, 0);
                  }

                  total = z.get(key);
                  z.set(key, total + 1);
                }
              }
            }
          }

          let totalTracks = 0;

          matriz.forEach((mTrack) => {
            totalTracks += mTrack.length;
            criarMatrizTransicao(mTrack);
          });

          function calcularN(estado, matriz) {
            let n = 0;
            matriz.forEach(function (value, key) {
              let primeiroEstado = key.split(' ')[0];
              if (primeiroEstado == estado) {
                n += value;
              }
            });

            return n;
          }

          // Ignorar os casos onde o aluno está no editor -> self-instruction -> visualizacao-assunto

          let zz = new Map<string, number>();

          z.forEach(function (value, key) {
            let primeiroEstado = key.split(' ')[0];
            let numero = calcularN(primeiroEstado, z);
            zz.set(key, value / numero);

            /* let segundoEstado = key.split(" ")[1];
            let estadoInserido = zz.get(primeiroEstado);
            if( estadoInserido != null){
              let subEstado = estadoInserido.get(segundoEstado)
            }else{
              zz.set(primeiroEstado, new Map());
            } */
          });

          /*  z.forEach(function (value, key) {
            zz.set(key, value / totalTracks);
          }); */

          let numero = calcularN('meu-desempenho', z);

          let x = zz;

          /* matriz.forEach(mTrack=>{

          }); */
        }
      );
    }
  }
}
