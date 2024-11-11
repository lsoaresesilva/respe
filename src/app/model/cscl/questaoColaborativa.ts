
import { Util } from "../util";
import {QuestaoProgramacao} from '../aprendizagem/questoes/questaoProgramacao';

export default class QuestaoColaborativa{

    questao:QuestaoProgramacao

    constructor(public primary_key, questao, public isOpenEnded){
        if(primary_key == null){
            this.primary_key = Util.uuidv4();
        }

        this.questao = questao;
    }

    get pk(){
      
      return this.primary_key;
    }

    objectToDocument(){
        const document = {};
        document['id'] = this.primary_key;
        document['questao'] = this.questao.objectToDocument();

        return document;
    }

    static construir(questoes: any[], assunto) {
        const objetosQuestoes: QuestaoColaborativa[] = [];

        if (questoes != null) {
          questoes.forEach((questao, index) => {
            const assuntos = [];


            questao.questao = QuestaoProgramacao._construirIndividual(questao.questao);

            objetosQuestoes.push(
              new QuestaoColaborativa(
                questao.pk,
                questao.questao,
                questao.isOpenEnded
              )
            );
          });
        }

        return objetosQuestoes;
      }
}
