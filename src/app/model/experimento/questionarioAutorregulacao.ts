import { Collection, Document, date } from '../firestore/document';
import { Observable } from 'rxjs';
import Query from '../firestore/query';
import Usuario from '../usuario';

@Collection("respostasQuestionarioAutorregulacao")
export default class QuestionarioAutorregulacao extends Document{

    @date()
    data;

    respostaPergunta1;
    respostaPergunta2;
    respostaPergunta3;
    respostaPergunta4;
    respostaPergunta5;
    respostaPergunta6;
    respostaPergunta7;
    respostaPergunta8;
    respostaPergunta9;
    respostaPergunta10;
    respostaPergunta11;
    respostaPergunta12;
    respostaPergunta13;
    respostaPergunta14;
    respostaPergunta15;
    respostaPergunta16;
    respostaPergunta17;
    respostaPergunta18;
    respostaPergunta19;
    respostaPergunta20;
    respostaPergunta21;
    respostaPergunta22;

    constructor(id, public usuario){
        super(id);
    }

    objectToDocument(){
        
        if(this.validar()){
            let document = super.objectToDocument();
            document["usuarioId"] = this.usuario.pk();

            return document;
        }else{
            throw new Error("Não é possível salvar a resposta do questionário, pois há um erro no objeto Questionário. Faltam respostas ou o usuário logado não foi informado.")
        }
        
    }

    validar(){
        if(this.respostaPergunta1 != null && this.respostaPergunta2 != null && this.respostaPergunta3 != null &&
            this.respostaPergunta4 != null && this.respostaPergunta5 != null && this.respostaPergunta6 != null &&
            this.respostaPergunta7 != null && this.respostaPergunta8 != null && this.respostaPergunta9 != null &&
            this.respostaPergunta10 != null && this.respostaPergunta11 != null && this.respostaPergunta12 != null &&
            this.respostaPergunta13 != null && this.respostaPergunta14 != null && this.respostaPergunta15 != null &&
            this.respostaPergunta16 != null && this.respostaPergunta17 != null && this.respostaPergunta18 != null &&
            this.respostaPergunta19 != null && this.respostaPergunta20 != null && this.respostaPergunta21 != null && 
            this.respostaPergunta22 != null && this.usuario != null){
                return true;
        }

        return false;
    }

    

}