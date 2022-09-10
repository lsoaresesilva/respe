import { forkJoin, Observable } from 'rxjs';
import { Assunto } from './questoes/assunto';
import ConfiguracaoEditor from '../configuracoes/configuracaoEditor';
import { Groups } from '../experimento/groups';
import { Collection, Document } from '../firestore/document';
import Query from '../firestore/query';
import Usuario from '../usuario';
import { MaterialAprendizagem } from './materialAprendizagem';
import Conceito from './questoes/conceito';

@Collection('videosProgramacao')
export default class VideoProgramacao extends Document implements MaterialAprendizagem {
  assunto: Assunto;

    static construir(videosProgramacao: any[]) {
    const videos: VideoProgramacao[] = [];

    if (videosProgramacao != null) {
      videosProgramacao.forEach((video) => {
        videos.push(
          new VideoProgramacao(
            video.id,
            video.nomeCurto,
            video.link,
            video.descricao,
            video.isExperimental,
            video.sequencia,
            video.conceitos
          )
        );
      });
    }

    return videos;
  }

  static listarTodos(usuario: Usuario) {
    return new Observable((observer) => {
      ConfiguracaoEditor.getByQuery(new Query('codigoTurma', '==', usuario.turma.codigo)).subscribe(
        (configuracao) => {
          if (configuracao != null) {
            if (configuracao.assuntos != null) {
              let query = [];
              configuracao.assuntos.forEach((assunto) => {
                query.push(VideoProgramacao.getAll(new Query('assuntoId', '==', assunto)));
              });

              forkJoin(query).subscribe((videosAssuntos) => {
                let videosSelecionados: any = [];
                if (Array.isArray(videosAssuntos)) {
                  videosAssuntos.forEach((videosAssunto) => {
                    videosSelecionados = videosSelecionados.concat(
                      videosAssunto.filter((video) => {
                        if (video != null) {
                          if (usuario.grupoExperimento == Groups.control) {
                            if (video.isExperimental != null && video.isExperimental == true) {
                              return false;
                            }
                          }

                          return true;
                        }
                      })
                    );
                  });
                }

                videosSelecionados.sort((videoA, videoB) => {
                  if (videoA.sequencia < videoB.sequencia) {
                    return -1;
                  } else if (videoA.sequencia > videoB.sequencia) {
                    return 1;
                  }

                  return 0;
                });

                observer.next(videosSelecionados);
                observer.complete();
              });
            }
          } else {
            observer.next(VideoProgramacao.getAll());
            observer.complete();
          }
        }
      );
    });
  }

  static getAll(query = null, orderBy = null): Observable<any[]> {
    return new Observable((observer) => {
      super.getAll(query, orderBy).subscribe((videos) => {
        if (videos.length > 0) {
          videos.sort((videoA, videoB) => {
            if (videoA.sequencia < videoB.sequencia) {
              return -1;
            } else if (videoA.sequencia > videoB.sequencia) {
              return 1;
            } else {
              return 0;
            }
          });
        }

        observer.next(videos);
        observer.complete();
      });
    });
  }

  constructor(
    id,
    public nomeCurto,
    public link,
    public descricao,
    public isExperimental,
    public ordem,
    public conceitos: Conceito[]
  ) {
    super(id);
  }

  objectToDocument() {
    let document = super.objectToDocument();

    if (this.assunto != null) {
      document['assuntoId'] = this.assunto.pk();
    }

    return document;
  }

}
