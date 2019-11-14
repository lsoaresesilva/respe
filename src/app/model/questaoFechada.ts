import { Dificuldade } from './enums/dificuldade';
import Alternativa from './alternativa';
import { Util } from './util';
import { RespostaQuestaoFechada } from './respostaQuestaoFechada';
import Query from './firestore/query';
import Usuario from './usuario';
import { Observable } from 'rxjs';
import { Assunto } from './assunto';

export default class QuestaoFechada {

  constructor(public id, public nomeCurto, public enunciado, public dificuldade: Dificuldade, public sequencia, public alternativas: Alternativa[], public respostaQuestao: String) {
    if (id == null) {
      this.id = Util.uuidv4();
    } else {
      this.id = id;
    }
    this.nomeCurto = nomeCurto;
    this.enunciado = enunciado;
    this.dificuldade = dificuldade;
    this.sequencia = sequencia;
    this.alternativas = alternativas;
    this.respostaQuestao = respostaQuestao;
  }


  objectToDocument() {
    let document = {}
    document["id"] = this.id;
    document["nomeCurto"] = this.nomeCurto;
    document["enunciado"] = this.enunciado;
    document["dificuldade"] = this.dificuldade;
    document["sequencia"] = this.sequencia;
    document["respostaQuestao"] = this.respostaQuestao;


    if (this.alternativas != null && this.alternativas.length > 0) {
      let alternativas = [];
      this.alternativas.forEach(alternativa => {
        if (typeof alternativa.objectToDocument === "function")
          alternativas.push(alternativa.objectToDocument());
      })

      document["alternativas"] = alternativas;
    }

    return document;
  }

  /**
   * Constrói objetos a partir do atributo array de uma document
   * @param questoesFechadas 
   */
  static construir(questoesFechadas: any[]) {
    let objetos: QuestaoFechada[] = [];

    if (questoesFechadas != null) {
      questoesFechadas.forEach(questaoFechada => {
        objetos.push(new QuestaoFechada(questaoFechada.id, questaoFechada.nomeCurto, questaoFechada.enunciado, questaoFechada.dificuldade, questaoFechada.sequencia, Alternativa.construir(questaoFechada.alternativas), questaoFechada.respostaQuestao));
      })
    }

    return objetos;
  }

  validar() {
    if (this.nomeCurto == null || this.nomeCurto == "" ||
      this.enunciado == null || this.enunciado == "" || this.dificuldade == null ||
      this.sequencia == null || this.sequencia < 1 || this.alternativas == undefined ||
      this.alternativas.length == 0 || Alternativa.validarAlternativas(this.alternativas) == false) {
      return false;
    }
    return true;

  }

  /**
   * Verifica se o usuário respondeu uma questão.
   * @param estudante 
   * @param questao 
   */
  static usuarioRespondeu(estudante, questao) {
    return new Observable(observer => {
      RespostaQuestaoFechada.getAll([new Query("usuarioId", "==", estudante.pk()), new Query("questaoId", "==", questao.id)]).subscribe(respostasAluno => {
        (respostasAluno.length == 0 ? observer.next(false) : observer.next(true));
        observer.complete();
      });
    })

  }

  /**
   * Retorna a alternativa correta para uma questão.
   */
  getAlternativaCerta() {
    for (let i = 0; i < this.alternativas.length; i++) {
      if (this.alternativas[i].isVerdadeira == true) {
        return this.alternativas[i];
      }
    }
  }

  /**
   * Verifica se o estudante respondeu corretamente (true) ou incorretamente (false) uma questão.
   * @param questao 
   * @param resposta 
   */
  static isRespostaCorreta(questao, resposta) {
    let alternativaCorreta = questao.getAlternativaCerta();
    if (alternativaCorreta != null) {
      if (alternativaCorreta.id == resposta.alternativa.id)
        return true;
    }

    return false;
  }

  hasCode() {
    if (this.enunciado != null) {
      return this.enunciado.search("'''python") != -1 ? true : false;
    }

  }

  extrairCodigo() {
    // deve começar após '''python
    // deve terminar em '''
    let codigos = [];
    if (this.hasCode()) {
      let regex = /'''python[\n|\r](.*)[\r|\n]'''/;
      let resultado = regex.exec(this.enunciado);
      if (resultado != null && resultado.length > 0) {
        for (let i = 1; i < resultado.length; i++) {
          codigos.push(resultado[i]);
        }
      }
    }

    return codigos;
  }

  extrairTextoComCodigo() {
    let texto = []
    if (this.hasCode()) {
      let regex = /(.*)[\r|\n]*'''python\n([\s\S\w])*?(?=''')[\r|\n]*(.*)/;
      let resultado = regex.exec(this.enunciado);
      if (resultado != null && resultado.length > 2) {
        for (let i = 1; i < resultado.length; i++) {
          texto.push(resultado[i]);
        }
      }
    }

    return texto;
  }

  static getByAssuntoQuestao(assuntoQuestao) {
    return new Observable(observer => {
      assuntoQuestao = assuntoQuestao.split("/");
      let assuntoId = assuntoQuestao[0];
      let questaoId = assuntoQuestao[1];
      if (assuntoId != null && questaoId != null) {
        Assunto.get(assuntoId).subscribe(assunto => {
          let questao = assunto["getQuestaoFechadaById"](questaoId);
          observer.next(questao);
          observer.complete();
        }, err=>{
          observer.error(err);
        })
      }else{
        observer.error(new Error("É preciso informar um assunto e questão no formato: assunto-id/questao-id"));
      }
    })

  }

}