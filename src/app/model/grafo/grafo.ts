import { Edge, Node } from "@swimlane/ngx-graph";
import { Observable } from "rxjs";
import PageTrackRecord from "../analytics/pageTrack";
import Query from "../firestore/query";
import Usuario from "../usuario";

export default class Grafo{

    constructor(public estudante:Usuario){

    }

    static noExiste(nos:Node[], novoNo){
        if(Array.isArray(nos)){
            nos.forEach(no=>{
                if(novoNo == no.id){
                    return true;
                }
            })
        }

        return false;
    }

    static inserirNo(nos:Node[], novoNo){
        if(!Grafo.noExiste(nos, novoNo)){
            nos.push({id:novoNo, label:novoNo});
        }
    }

    static construirGrafo(matriz:Map<string, Map<string, number>>){
        let nos:Node[] = []
        let arestas:Edge[] = [];
        matriz.forEach((targets, source) => {
            Grafo.inserirNo(nos, source);
            targets.forEach(function (probabilidade, target){
                Grafo.inserirNo(nos, target);
                arestas.push({id:arestas.length.toString(), source:source, target:target, label:probabilidade.toString()});
            })
        })

        return {nos:nos, arestas:arestas};
    }

    criar(){
        return new Observable<Map<string, Map<string, number>>>(observer=>{
            if (this.estudante.pk() != null) {
                let dias = new Map<string, any[]>();
                let matriz = []; /* new Map<string, any[]>(); */
          
                PageTrackRecord.getAll(new Query('estudanteId', '==', this.estudante.pk())).subscribe(
                  (pageTracks) => {
                    // Agrupar por dia
                    pageTracks.forEach((track) => {
                      let dataDoTrack = track.data.toDate();
                      let mesDia = dataDoTrack.getDay().toString() + '/' + dataDoTrack.getMonth().toString();
                      if(this.estudante.pk() != "0XQMMGnf8fO0v3ypOIxo"){
                        
                        let hasDia = dias.get(mesDia);
                        if (hasDia == null) {
                          dias.set(mesDia, []);
                        }
          
                        hasDia = dias.get(mesDia);
                        hasDia.push(track);
                      }else{
                        if(dataDoTrack.getDate() >= 16 && dataDoTrack.getMonth() == 11){
                          let hasDia = dias.get(mesDia);
                          if (hasDia == null) {
                            dias.set(mesDia, []);
                          }
          
                          hasDia = dias.get(mesDia);
                          hasDia.push(track);
                        }
                      }
          
                      
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
          
                    //let z = new Map<string, number>();
                     /* Código novo */
                    let estados = new Map<string, Map<string, number>>();
                    /* Fim Código novo */
                    function criarMatrizTransicao(tracks) {
                      for (let i = 0; i < tracks.length; i++) {
                        let source = tracks[i];
                        let target = tracks[i + 1];
                        if (target != undefined) {
                          let proximoProximo = tracks[i + 2];
                          if (
                            proximoProximo == 'visualizacao-assunto' &&
                            source == 'editor' &&
                            target == 'self-instruction'
                          ) {
                            console.log('Só retornou ao assunto via self-instruction');
                          } else {
                            /* let key = source + ' ' + target;
                            let total = z.get(key);
                            if (total == null) {
                              z.set(key, 0);
                            }
                            
                            total = z.get(key);
                            z.set(key, total + 1);
    
                            */
    
                            /* Código novo */
                            let estado = estados.get(source);
                            if(estado == null){
                                estados.set(source, new Map());
                            }
                            let totalNovo = estados.get(source).get(target);
                            if(totalNovo == null){
                                estados.get(source).set(target, 0);
                            }
                            totalNovo = estados.get(source).get(target);
                            estados.get(source).set(target, totalNovo + 1);
                             /* Fim Código novo */
          
                            
                          }
                        }
                      }
                    }
          
                    let totalTracks = 0;
          
                    matriz.forEach((mTrack) => {
                      totalTracks += mTrack.length;
                      criarMatrizTransicao(mTrack);
                    });
          
                    /* function calcularN(estado, matriz) {
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
          
                    let zz = new Map<string, number>(); */
    
                    /* Código novo */
                    function calcularTotalAcessos(estado, matrizEstados){
                        let n = 0;
                        matrizEstados.forEach(function (targets, source) {
                            if (source == estado) {
                                targets.forEach(function (value, key){
                                    n += value;
                                });
                            }
                            
                            
                        });
            
                        return n;
                    }
    
    
                    let probabilidades = new Map<string, Map<string, number>>();
                    estados.forEach(function(targets, source){
                        probabilidades.set(source, new Map());
                        let totalAcessos = calcularTotalAcessos(source, estados);
                        targets.forEach(function (contagem, target) {
                            probabilidades.get(source).set(target, contagem/totalAcessos);
                        });
                        
                    });

                    observer.next(probabilidades);
                    observer.complete();
                    /* Fim código novo */
          
                    /* z.forEach(function (value, key) {
                      let primeiroEstado = key.split(' ')[0];
                      let numero = calcularN(primeiroEstado, z);
                      zz.set(key, value / numero);
          
                     
                    });
          
          
                    let x = zz; // Aqui está o grafo. */
          
                  }
                );
              }
        })
        
    }
}