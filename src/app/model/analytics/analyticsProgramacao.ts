import ErroCompilacaoFactory from '../errors/analise-compilacao/erroCompilacaoFactory';
import Submissao from '../submissao';
import { Util } from '../util';
import { EventosProgramacao } from './enum/eventosProgramacao';


enum EstadosAlgoritmo{

}

export default class AnalyticsProgramacao {
  static calcularExecucoes(submissoes) {
    return Array.isArray(submissoes) ? submissoes.length : 0;
  }

  static calcularTotalQuestoesCorretas(submissoes) {
    let totalConclusoes = 0;
    const submissoesAgrupadas = Submissao.agruparPorQuestao(submissoes);
    // Verificar se para uma questão há submissão correta. Se houver, somar o total de submissoes erradas e desconsiderar as corretas.
    submissoesAgrupadas.forEach((submissoesQuestao, questaoId, map) => {
      const submissoesConcluidas = Submissao.filtrarSubmissoesConclusao(submissoesQuestao);

      if (submissoesConcluidas.length > 0) {
        totalConclusoes += 1;
      }
    });

    return totalConclusoes;
  }

  static calcularMediaSubmissoesParaAcerto(submissoes) {
    let media = 0;
    let submissoesIncorretas = 0;
    let iteracao = 0;

    // Agrupar por questoes
    const submissoesAgrupadas = Submissao.agruparPorQuestao(submissoes);
    // Verificar se para uma questão há submissão correta. Se houver, somar o total de submissoes erradas e desconsiderar as corretas.
    submissoesAgrupadas.forEach((submissoesQuestao, questaoId, map) => {
      const submissoesConcluidas = Submissao.filtrarSubmissoesConclusao(submissoesQuestao);
      submissoesIncorretas += submissoesQuestao.length - submissoesConcluidas.length;
      if (submissoesConcluidas.length != 0) {
        ++iteracao;
      }
    });

    if (iteracao !== 0) {
      media = submissoesIncorretas / iteracao;
    }
    return media;
  }

  static calcularCodigosComentados(submissoes) {
    let mediaCodigosComentados = 0;
    let totalQuestoesRespondidas = 0;

    const submissoesAgrupadas = Submissao.agruparPorQuestao(submissoes);
    // Verificar se para uma questão há submissão correta. Se houver, somar o total de submissoes erradas e desconsiderar as corretas.
    submissoesAgrupadas.forEach((submissoesQuestao, questaoId, map) => {
      let questoesIgnoradas = [
        '88bd1120-54da-4e5f-837a-c92adf5b5ea8',
        'd213e854-5ccf-4f2e-a9bd-60320f79330c',
        'da8487c1-a381-438e-963a-6f5a8b3a152e',
        '2916d33e-6045-40f2-88da-6742231e4cf4',
        '5bca05f8-74d4-455c-baf2-9cebc51be45e',
        '116a15b2-5e51-41bc-9cc2-3504b4c8f49e',
        '271061cf-9e0b-4206-9382-2b55138bcb91',
        '85c28df2-70a6-436c-a7d6-8f8e69e3fcad',
        '947713cc-17bf-11eb-adc1-0242ac120002',
        'f369a1f7-c333-4c23-81ac-89639608eb35',
        '71b67722-4639-4fcf-be03-574356d5b70a',
        '43789fa2-b614-4e03-a8c8-1494b3e3d9e0',
        'b4b2dbd5-8daa-4a08-831d-7825541630ae',
        '06666524-513d-483c-b970-293ae561c272',
        '94511a38-5f2c-4fc3-90f5-f0255628c310',
        '3191595a-7493-4980-999e-c874b0b8d468'
      ];

      if (!questoesIgnoradas.includes(questaoId)) {
        totalQuestoesRespondidas++;

        for (let i = 0; i < submissoesQuestao.length; i++) {
          if (submissoesQuestao[i].codigo.search(/#.[A-Za-z0-9]/g) != -1) {
            mediaCodigosComentados += 1;
            break;
          }
        }
      }
    });

    return mediaCodigosComentados != 0 ? mediaCodigosComentados / totalQuestoesRespondidas : 0;
  }

  static identificarSequenciaEstados(submissoes){

    function extrairComments(codigo:string){
      let comentarios = [];
      let codigoArray = codigo.split("\n")

      for(let i = 0; i < codigoArray.length; i++){
        if(codigoArray[i].search(/#.[A-Za-z0-9]/g) != -1){
          comentarios.push(codigoArray[i])
        }
      }

      return comentarios;

    }

    function isDiff(codigoA:string, codigoB:string){
      let isDiff = false;
      let codigoAArray = codigoA.split("\n")
      let codigoBArray = codigoB.split("\n")

      if(codigoAArray.length != codigoBArray.length){
        return true;
      }

      for(let i = 0; i < codigoAArray.length; i++){
        if(codigoAArray[i] != codigoBArray[i]){
          isDiff = true;
          break;
        }
      }

      return isDiff;
    }

    const submissoesAgrupadas = Submissao.agruparPorQuestao(submissoes);

    let todosEstados = [] // Todos os estados, um para cada questão

    submissoesAgrupadas.forEach((submissoesQuestao, questaoId, map) => {

      let estados = []
      let erroSintaxeAnterior = null;
      let foiRefatorado = false;
      let isTestesCorretos = false;
      let submissaoRefatorada = null;
      let comentarioAnterior = null;

      Submissao._orderByDate(submissoesQuestao);





      for(let i = 0; i < submissoesQuestao.length; i++){
        if(estados.length == 0){ // primeira submissão;
          estados.push(EventosProgramacao.primeira_submissao);
        }




        if(submissoesQuestao[i].hasErroSintaxe()){
          let erro = ErroCompilacaoFactory.construir(submissoesQuestao[i].erro.traceback);
          if(erroSintaxeAnterior == null){
            erroSintaxeAnterior = erro.categoria;
            submissaoRefatorada = submissoesQuestao[i]
            estados.push(EventosProgramacao.erro_sintaxe);
          }else{
            if(erro.categoria == erroSintaxeAnterior){
              estados.push(EventosProgramacao.mesmo_erro);
            }else{
              erroSintaxeAnterior = erro.categoria;
              submissaoRefatorada = submissoesQuestao[i]
              estados.push(EventosProgramacao.erro_sintaxe);
            }
          }
        }else{
          if(erroSintaxeAnterior != null){
            estados.push(EventosProgramacao.correcao_erro_sintaxe);
            erroSintaxeAnterior = null;
          }

          if(!submissoesQuestao[i].isFinalizada()){

            if(erroSintaxeAnterior != null){

              let x = 2;
            }

            estados.push(EventosProgramacao.erro_logico);
          }else{

            estados.push(EventosProgramacao.testsCasesCorretos);
            isTestesCorretos = true;
            submissaoRefatorada = submissoesQuestao[i];

            // Verificar se foi refatorado
            if(submissoesQuestao.length > i+1){

              if( !foiRefatorado ){



                if(isDiff(submissoesQuestao[i].codigo, submissoesQuestao[i+1].codigo)){
                  foiRefatorado = true;

                  estados.push(EventosProgramacao.refatoramento);
                }


              }
            }
          }
        }

        let questoesIgnoradas = [
          '88bd1120-54da-4e5f-837a-c92adf5b5ea8',
          'd213e854-5ccf-4f2e-a9bd-60320f79330c',
          'da8487c1-a381-438e-963a-6f5a8b3a152e',
          '2916d33e-6045-40f2-88da-6742231e4cf4',
          '5bca05f8-74d4-455c-baf2-9cebc51be45e',
          '116a15b2-5e51-41bc-9cc2-3504b4c8f49e',
          '271061cf-9e0b-4206-9382-2b55138bcb91',
          '85c28df2-70a6-436c-a7d6-8f8e69e3fcad',
          '947713cc-17bf-11eb-adc1-0242ac120002',
          'f369a1f7-c333-4c23-81ac-89639608eb35',
          '71b67722-4639-4fcf-be03-574356d5b70a',
          '43789fa2-b614-4e03-a8c8-1494b3e3d9e0',
          'b4b2dbd5-8daa-4a08-831d-7825541630ae',
          '06666524-513d-483c-b970-293ae561c272',
          '94511a38-5f2c-4fc3-90f5-f0255628c310',
          '3191595a-7493-4980-999e-c874b0b8d468',
        ];

        if (!questoesIgnoradas.includes(questaoId)) {
          if (submissoesQuestao[i].codigo.search(/#.[A-Za-z0-9]/g) != -1) {
            if(comentarioAnterior == null){
              comentarioAnterior = extrairComments(submissoesQuestao[i].codigo);

              if(isTestesCorretos){

                  let x = submissoesQuestao[i];
              }


              estados.push(EventosProgramacao.comentario);
            }else{
              let comentariosAtuais = extrairComments(submissoesQuestao[i].codigo);
              let comentariosIguais = true;

              for(let i = 0; i < comentariosAtuais.length; i++){
                if(!comentarioAnterior.includes(comentariosAtuais[i])){

                  if(isTestesCorretos){

                    let x = submissoesQuestao[i];
                }

                  comentariosIguais = false;
                  comentarioAnterior = comentariosAtuais;
                  estados.push(EventosProgramacao.comentario);
                  break;
                }
              }
            }



            let x = 0;

          }


          }
        }



      if(submissoesQuestao[submissoesQuestao.length-1].isFinalizada()){
        estados.push(EventosProgramacao.finalizado);
      }else{
        estados.push(EventosProgramacao.desistencia);
      }

      //todosEstados = todosEstados.concat(estados);

      todosEstados.push(estados);


    });



    return todosEstados;
  }

  static calcularProbabilidadesMatriz(matriz){
    let matrizProbabilidade = new Map<string, Map<string, number>>();

    matriz.forEach((subestados, estado, map) => {
      matrizProbabilidade.set(estado, new Map());

      let estadoAtual = matrizProbabilidade.get(estado);

      let somaContagens = 0;
      subestados.forEach((contagem, subEstado, map) => {
        somaContagens += contagem;
      });

      subestados.forEach((contagem, subEstado, map) => {
        let probabilidade = contagem/somaContagens;
        estadoAtual.set(subEstado, probabilidade);
      });
    });

    return matrizProbabilidade;
  }

  static criarMatrizTransicao(todosEstados){
    let matriz = new Map<string, Map<string, number>>()

    for(let i = 0; i < todosEstados.length; i++){
      for(let j = 0; j < todosEstados[i].length; j++){
        if(matriz.get(todosEstados[i][j]) == null){
          matriz.set(todosEstados[i][j], new Map());
        }

        let estadoAtual = matriz.get(todosEstados[i][j]);
        if(todosEstados[i][j+1] != null && estadoAtual.get(todosEstados[i][j+1]) == null){
          estadoAtual.set(todosEstados[i][j+1], 0)
        }

        estadoAtual.set(todosEstados[i][j+1], estadoAtual.get(todosEstados[i][j+1])+1);
      }
    }

    return matriz;

  }

  static calcularMediaSubmissoesCorrigirErro(submissoes) {
    let media = 0;
    let iteracao = 0;
    let casos = 0;

    // Agrupar por questoes
    const submissoesAgrupadas = Submissao.agruparPorQuestao(submissoes);

    // Verificar quando há um erro, após isso contar quantas submissões até a correção.

    submissoesAgrupadas.forEach((submissoesQuestao, questaoId, map) => {
      let isErro = false;
      let houveErro = false;



      submissoesQuestao.forEach((submissao) => {
        if (isErro) {
          iteracao += 1;
        }

        if (submissao.erro != null) {
          isErro = true;
          houveErro = true;
        } else {
          isErro = false;
        }
      });

      if (houveErro) {
        casos += 1;
      }

      /* const submissoesConcluidas = Submissao.filtrarSubmissoesConclusao(submissoesQuestao);
      submissoesIncorretas += submissoesQuestao.length - submissoesConcluidas.length;
      if (submissoesConcluidas.length != 0) {
        ++iteracao;
      } */
    });

    if (iteracao !== 0) {
      media = iteracao / casos;
    }
    return media;
  }

  static calcularMediaErrosSintaxeProgramacao(submissoes: Submissao[]) {
    if (Array.isArray(submissoes)) {
      let totalErros = 0;
      submissoes.forEach((submissao) => {
        if (submissao.erro != null) {
          totalErros += 1;
        }
      });
      return totalErros != 0 ? totalErros / submissoes.length : 0;
    } else {
      return null;
    }
  }

  /**
   * Erros lógicos ocorrem quando o algoritmo não apresenta erros de sintaxe, mas os testes cases não estão corretos.
   * @param submissoes
   * @returns
   */
  static calcularTotalErrosLogicos(submissoes: Submissao[]) {
    /* if (Array.isArray(submissoes)) {
        let totalErros = 0;
        submissoes.forEach((submissao) => {
        let hasErro = false;
        if (submissao.erro == null) {
            submissao.resultadosTestsCases.forEach((resultado) => {
            if (!resultado.status) {
                hasErro = true;
            }
            });

            if (hasErro) {
            totalErros += 1;
            }
        }
        });

        return totalErros;
    }else{
        return null;
    } */

    let totalErros = 0;

    let agrupadasPorQuestao = Submissao.agruparPorQuestao(submissoes);

    agrupadasPorQuestao.forEach(function (agrupadas, questaoId) {
      let submissaoConcluida = Submissao.filtrarSubmissoesConclusao(agrupadas);

      if (submissaoConcluida.length > 0) {
        if (!submissaoConcluida[0].isFinalizada()) {
          totalErros++;
        }
      }
    });

    return totalErros != 0 ? totalErros / submissoes.length : 0;
  }

  static calcularDesistencias(submissoes: Submissao[]) {
    let agrupadasPorQuestao = Submissao.agruparPorQuestao(submissoes);
    let desistencias = 0;
    // Percorrer cada questão e ver quais não tem submissão concluida;

    agrupadasPorQuestao.forEach(function (agrupadas, questaoId) {
      let submissaoConcluida = Submissao.filtrarSubmissoesConclusao(agrupadas);

      if (submissaoConcluida.length == 0) {
        desistencias += 1;
      }
    });

    return desistencias;
  }

  /**
   * Recebe um objeto com submissões dos estudantes, sendo cada estudante um atributo deste objeto.
   * Analisa em quais situações ele refatorou o código após um envio com sucesso.
   * @param submissoes
   * @returns
   */
  static identificarMelhoriasSubmissaoAposConclusao(submissoes) {
    /* let mapa = new Map<string, number>();
    let submissoesAgrupada = new Map<string, Map<string, Submissao[]>>();
    for (let [estudanteId, s] of Object.entries(submissoes)) {
        submissoesAgrupada.set(estudanteId, Submissao.agruparPorQuestao(s));
    } */

    let media = 0;
    let totalQuestoes = 0;

    let agrupadasPorQuestao = Submissao.agruparPorQuestao(submissoes);

    /* agrupadasPorQuestao.forEach((submissoesEstudantesAgrupadasQuestao, estudanteId)=>{ */
    agrupadasPorQuestao.forEach((submissoesQuestao, questaoId) => {
      totalQuestoes += 1;
      let submissoesconcluidas = Submissao.filtrarSubmissoesConclusao(submissoesQuestao);
      if (submissoesconcluidas.length > 1) {
        let isDiff = false;
        let codigo = '';
        submissoesconcluidas.forEach((submissao) => {
          if (codigo == '') {
            codigo = submissao.codigo;
          } else {
            if (submissao.codigo != codigo) {
              isDiff = true;
            }
          }
        });

        if (isDiff) {
          media += 1;
        }
      }
    });
    /* }); */

    return media != 0 ? media / totalQuestoes : 0;
  }

  static calcularProgressoProgramacao(assuntos: Assunto[], submissoes: Submissao[]) {
    let submissoesUnicas = Submissao.getSubmissoesUnicas(submissoes);
    let progresso = 0;
    assuntos.forEach((assunto) => {
      progresso += this._calcularPercentualConclusaoQuestoesProgramacao(assunto, submissoesUnicas);
    });
    if (progresso != 0 && assuntos.length != 0) {
      return progresso / assuntos.length;
    } else {
      return progresso;
    }
  }

  static _calcularPercentualConclusaoQuestoesProgramacao(
    assunto,
    submissoes: Submissao[],
    margemAceitavel = 0.75
  ) {
    const totalQuestoes = assunto.questoesProgramacao.length;
    const questoesRespondidas = [];
    assunto.questoesProgramacao.forEach((questao) => {
      const questaoRespondida = true;
      // for (let j = 0; j < questao.testsCases.length; j++) {
      const resultadoAtualTestCase = null;

      submissoes.forEach((submissao) => {
        if (submissao['questaoId'] == questao.id) {
          const totalTestsCases = questao.testsCases.length;
          let totalAcertos = 0;
          if (submissao.resultadosTestsCases.length != 0) {
            submissao.resultadosTestsCases.forEach((resultadoTestCase) => {
              if (resultadoTestCase.status) {
                totalAcertos++;
              }
            });

            const percentual = totalAcertos / totalTestsCases;
            if (percentual >= margemAceitavel) {
              questoesRespondidas.push(questao);
            }
          }
        }
      });
    });
    if (questoesRespondidas.length > 0) {
      return questoesRespondidas.length / totalQuestoes;
    } else {
      return 0;
    }
  }

  static calcularMediaQuestoesSemana(submissoes){
    let agrupadasPorQuestao = Submissao.agruparPorQuestao(submissoes);

    let semanas = []
    let totalConclusoes = 0;

    agrupadasPorQuestao.forEach((submissoesQuestao, questaoId) => {

      let submissoesconcluidas = Submissao.filtrarSubmissoesConclusao(submissoesQuestao);
      if (submissoesconcluidas.length > 0) {
        totalConclusoes += 1;
        let data = submissoesconcluidas[0].data;

        let oneJan = new Date(data.getFullYear(),0,1);
        let numberOfDays = Math.floor((data.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
        let semana = Math.ceil(( data.getDay() + 1 + numberOfDays) / 7);



        if( semanas.includes(semana) == false ){
          semanas.push(semana);
        }
      }

    });

    return semanas.length > 0 ? totalConclusoes/semanas.length:0;

  }

  static calculaTentativasQuestoes(submissoes) {
    return Submissao.agruparPorQuestao(submissoes).size;
  }

  static calcularTempoMedioEntreSubmissoes(submissoes: Submissao[]) {
    if (Array.isArray(submissoes)) {
      let tempoEmSegundos = 0;
      let submissoesValidasParaContagem = [];
      for (let i = 0; i < submissoes.length; i++) {
        if (submissoes[i + 1] != null) {
          let submissaoAnterior = Util.firestoreDateToDate(submissoes[i].data);
          let submissaoAseguir = Util.firestoreDateToDate(submissoes[i + 1].data);
          let mesmoDia = submissaoAnterior.getDate() == submissaoAseguir.getDate();
          let feitaDentroDezMinutos =
            (submissaoAseguir.getTime() - submissaoAnterior.getTime()) / 1000 < 600;
          let difEntreMinutos = submissaoAseguir.getMinutes() - submissaoAnterior.getMinutes();
          if (
            submissaoAnterior != null &&
            submissaoAseguir != null &&
            mesmoDia == true &&
            feitaDentroDezMinutos == true
          ) {
            // Apenas comparar duas submissões do mesmo dia
            tempoEmSegundos += (submissaoAseguir.getTime() - submissaoAnterior.getTime()) / 1000;
            submissoesValidasParaContagem.push({
              d1: submissaoAnterior,
              d2: submissaoAseguir,
              tempo: (submissaoAseguir.getTime() - submissaoAnterior.getTime()) / 1000,
            });
          }
        }
      }

      if (tempoEmSegundos != 0 && submissoes.length != 0) {
        return tempoEmSegundos / submissoesValidasParaContagem.length;
      }

      return 0;
    } else {
      return null;
    }
  }
}
