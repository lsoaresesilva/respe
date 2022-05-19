
import { Util } from "../util";
import {QuestaoProgramacao} from '../../model/questoes/questaoProgramacao';

export default class QuestaoColaborativa{

    questao:QuestaoProgramacao

    constructor(public id, questao, public isOpenEnded){
        if(id == null){
            this.id = Util.uuidv4();
        }

        this.questao = questao;
    }

    objectToDocument(){
        const document = {};
        document['id'] = this.id;
        document['questao'] = this.questao.objectToDocument();

        return document;
    }

    static construir(questoes: any[], assunto) {
        const objetosQuestoes: QuestaoColaborativa[] = [];

        if (questoes != null) {
          questoes.forEach((questao, index) => {
            const assuntos = [];


            questao.questao = QuestaoProgramacao._construirIndividual(questao.questao, assunto);

            objetosQuestoes.push(
              new QuestaoColaborativa(
                questao.id,
                questao.questao,
                questao.isOpenEnded
              )
            );
          });
        }

        return objetosQuestoes;
      }
}
