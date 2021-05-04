import { forkJoin, Observable } from "rxjs";
import { Assunto } from "../assunto";
import ConfiguracaoEditor from "../configuracoes/configuracaoEditor";
import { Collection, Document } from "../firestore/document";
import Query from "../firestore/query";

@Collection("videosProgramacao")
export default class VideoProgramacao extends Document{

    constructor(id, public link, public sequencia, public nome, public descricao, public assunto:Assunto){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();

        if(this.assunto != null){
            document["assuntoId"] = this.assunto.pk();
        }

        return document;
    }

    static listarTodos(usuario) {

        return new Observable(observer=>{

        ConfiguracaoEditor.getByQuery(new Query("codigoTurma", "==", usuario.turma.pk())).subscribe(configuracao=>{
            if(configuracao != null){
                if(configuracao.assuntos != null){
                    let query = [];
                    configuracao.assuntos.forEach(assunto => {
                        query.push(VideoProgramacao.getAll(new Query("assuntoId", "==", assunto)));
                    });

                    forkJoin(query).subscribe(videosAssuntos=>{
                        let videosSelecionados:any = [];
                        if(Array.isArray(videosAssuntos)){
                            videosAssuntos.forEach(videosAssunto=>{

                                videosSelecionados = videosSelecionados.concat(videosAssunto.filter((video)=>{
                                    if(video != null)
                                        return true;
                                }));
                            })
                        }
                        

                        videosSelecionados.sort((videoA, videoB)=>{
                            if(videoA.sequencia < videoB.sequencia){
                                return -1;
                            }else if(videoA.sequencia > videoB.sequencia){
                                return 1;
                            }

                            return 0;
                        });

                        observer.next(videosSelecionados);
                        observer.complete();
                    })
                }
            }else{
                observer.next(VideoProgramacao.getAll());
                observer.complete();
            }
            
            });
        });
    }

    static getAll(query = null, orderBy = null): Observable<any[]> {
        return new Observable(observer=>{
            super.getAll(query, orderBy).subscribe(videos=>{
                if(videos.length > 0){
                    videos.sort((videoA, videoB)=>{
                        if(videoA.sequencia < videoB.sequencia){
                            return -1;
                        }else if(videoA.sequencia > videoB.sequencia){
                            return 1;
                        }else{
                            return 0;
                        }
                    })
                }
  
                observer.next(videos);
                observer.complete();
            })
        })
          
      }

    

}