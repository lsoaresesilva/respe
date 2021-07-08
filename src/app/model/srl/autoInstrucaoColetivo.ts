import { BehaviorSubject, Observable, Subject } from "rxjs";
import Grupo from "../cscl/grupo";
import { Collection, Document, ignore } from "../firestore/document";
import Usuario from "../usuario";
import JustificativasAutoInstrucao from './justificativaInstrucaoColetiva'

@Collection("autoInstrucoesColetivas")
export default class AutoInstrucaoColetiva extends Document{



    constructor(public id, public analiseProblema, public analiseSolucao, public grupo:Grupo, public justificativas:JustificativasAutoInstrucao[], public lider, public isFinalizada){
        super(id);
    }

    objectToDocument(){
        let document = super.objectToDocument();
        if(this.grupo != null){
            document["grupoId"] = this.grupo.id;
        }

        if(this.lider != null){
            document["liderId"] = this.lider.pk();
        }

        if(Array.isArray(this.justificativas)){
            document["justificativas"] = [];
            this.justificativas.forEach(justificativa=>{
                if(justificativa.objectToDocument != null){
                    document["justificativas"].push(justificativa.objectToDocument());
                }else{
                    if(justificativa["estudanteId"] != null && justificativa["dificuldade"] != null && justificativa["texto"] != null){
                        document["justificativas"].push(justificativa);
                    }
                }
                
            })
        }

        return document;
    }

    getJustificativaByEstudante(estudante:Usuario){
        if(Array.isArray(this.justificativas)){
            for(let i = 0; i < this.justificativas.length; i++){
                if(this.justificativas[i].estudante != null){
                    if(this.justificativas[i].estudante.pk != null){
                        if(this.justificativas[i].estudante.pk() == estudante.pk()){
                            return this.justificativas[i];
                        }
                    }else{
                        if(this.justificativas[i].estudante["id"] == estudante["id"]){
                            return this.justificativas[i];
                        }
                    }
                    
                }
            }
        }
        
    }

    static getByQuery(query, orderBy = null):Observable<any> {
        return new Observable(observer=>{
            super.getByQuery(query).subscribe(resultado=>{
                if(resultado != null){
                    
                    if(resultado.justificativas != null){
                        resultado.justificativas = resultado.justificativas.map(justificativa=>{
                            return JustificativasAutoInstrucao.construir(justificativa);
                        })
                    }
                    
                    if(resultado["liderId"] != null){
                        Usuario.get(resultado["liderId"]).subscribe(estudanteLider=>{
                            resultado.lider = estudanteLider;
                        })
                    }

                    

                    observer.next(resultado);
                    observer.complete();
                }
            })
        })
    }

    gerarDadosGrafico(){

        let contagem = {nivelUm:0, nivelDois:0, nivelTres:0, nivelQuatro:0, nivelCinco:0};

        this.justificativas.forEach(justificativa =>{
            if(justificativa.dificuldade == 'Muito fácil'){
                contagem.nivelUm += 1;
            }else if(justificativa.dificuldade == 'Fácil'){
                contagem.nivelDois += 1;
            }else if(justificativa.dificuldade == 'Normal'){
                contagem.nivelTres += 1;
            }else if(justificativa.dificuldade == 'Difícil'){
                contagem.nivelQuatro += 1;
            }else if(justificativa.dificuldade == 'Muito difícil'){
                contagem.nivelCinco += 1;
            }
        });

        let data = {
            labels: ['Muito fácil', 'Fácil', 'Normal', 'Difícil', 'Muito difícil'],
            datasets: [
                {
                    data: [contagem.nivelUm, contagem.nivelDois, contagem.nivelTres, contagem.nivelQuatro, contagem.nivelCinco],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#cc99ff",
                        "#339966"
                    ],
                }
            ]
        }

        return data;
    }

    atualizarJustificativaEstudante(estudante:Usuario, novaJustificativa:JustificativasAutoInstrucao){
        let atualizacao = false;


        for(let i = 0; i < this.justificativas.length; i++){
            if(this.justificativas[i]["estudanteId"] != null){
                if(this.justificativas[i]["estudanteId"] == estudante.pk()){
                    this.justificativas[i] = novaJustificativa;
                    atualizacao = true;
                }
            }else{
                if(this.justificativas[i].estudante.pk() == estudante.pk()){
                    this.justificativas[i] = novaJustificativa;
                    atualizacao = true;
                }
            }
        }
      

        if(!atualizacao){
            this.justificativas.push(novaJustificativa);
        }
    }

    podeVisualizarPlanejamento(grupo:Grupo){
        let isJustificativasRealizadas = false;
        let isDificuldadesRelatadas = true;
        if(grupo.estudantes.length == 2){
            if(this.justificativas.length == 2){
                isJustificativasRealizadas = true;
            }

            this.justificativas.forEach(justificativa=>{
                if(justificativa.avaliacaoDificuldades == "" || justificativa.avaliacaoDificuldades == null){
                    isDificuldadesRelatadas = false;
                }
            })

            return isJustificativasRealizadas && isDificuldadesRelatadas;
        }else{

            let totalDificuldadesRelatadas = 0;

            if(this.justificativas.length >= Math.floor(0.75*grupo.estudantes.length)){
                isJustificativasRealizadas = true;
            }

            /* this.justificativas.forEach(justificativa=>{
                if(justificativa.avaliacaoDificuldades != "" || justificativa.avaliacaoDificuldades == null){
                    totalDificuldadesRelatadas += 1;
                }
            }) */

            return isJustificativasRealizadas/*  && totalDificuldadesRelatadas >= Math.floor(0.75*grupo.estudantes.length) */;
        }
    }

    podeVisualizarAvancar(analiseProblema, analiseSolucao){
        if(analiseProblema.length >= 98 && analiseSolucao.length >= 98 && (this.lider != null || this["liderId"] != null)){
            return true;
        }

        return false;
    }

    static onDocumentUpdate(id, callback:Subject<any>){
        let innerCallback = new BehaviorSubject<any>(null);

        innerCallback.subscribe(autoInstrucaoColetiva=>{
            if(autoInstrucaoColetiva != null){


                if(autoInstrucaoColetiva.justificativas != null){
                    autoInstrucaoColetiva.justificativas = autoInstrucaoColetiva.justificativas.map(justificativa=>{
                        return JustificativasAutoInstrucao.construir(justificativa);
                    })
                }
                
                if(autoInstrucaoColetiva["liderId"] != null){
                    Usuario.get(autoInstrucaoColetiva["liderId"]).subscribe(estudanteLider=>{
                        autoInstrucaoColetiva.lider = estudanteLider;
                    })
                }

            }

            callback.next(autoInstrucaoColetiva);
        });

        super.onDocumentUpdate(id, innerCallback); 
    }

}