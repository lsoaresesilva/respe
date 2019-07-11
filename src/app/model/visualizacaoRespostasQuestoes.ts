import { Collection, Document, date } from './firestore/document';
import Usuario from './usuario';
import { ModeloRespostaQuestao } from './ModeloRespostaQuestao';


@Collection("visualizacaoRespostasQuestoes")
export class VisualizacaoRespostasQuestoes extends Document{
    usuario:Usuario;
    modelo:ModeloRespostaQuestao;
    

    constructor(public id, usuario,modelo){
        super(id);
        this.usuario=usuario;
        this.modelo=modelo;
        
       
    }

   objectToDocument(){
        let document = super.objectToDocument()
        document["usuarioId"] = this.usuario.pk();
        document["modeloRespostaQuestãoId"] = this.modelo.questao.id;
        return document;
    }

}