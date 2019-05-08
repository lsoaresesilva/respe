import { Component, OnInit } from '@angular/core';
import Editor from 'src/app/model/editor';
import Estudante from 'src/app/model/estudante';
import { Questao } from 'src/app/model/questao';
import Submissao from 'src/app/model/submissao';
import { Tutor } from 'src/app/model/tutor';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import ResultadoTestCase from 'src/app/model/resultadoTestCase';
import { forkJoin } from 'rxjs';

declare var editor: any;
declare function carregarIde(readOnly): any;

@Component({
  selector: 'editor-programacao',
  templateUrl: './editor-programacao.component.html',
  styleUrls: ['./editor-programacao.component.css']
})
export class EditorProgramacaoComponent implements OnInit {

  editorCodigo?: Editor;
  uploadCodigo;
  erroLinguagemProgramacao;
  questao;
  statusExecucao;
  resultadosTestsCases;



  constructor(private http: HttpClient) { 
    this.erroLinguagemProgramacao = "";
    this.statusExecucao = "";
    Questao.get("LwC2ItAVtfkDhcE9jvpT").subscribe(questao => {
      this.questao = questao;
    })

    this.uploadCodigo = false;

  }

  ngOnInit() {

    this.editorCodigo = Editor.getInstance();

    carregarIde(false);
  }

  

  mouseMove(event){
    
    
    //let linha = event.target.position.linha;
    // SE mouse estiver na área do editor mostrar div;
    // Mo Y do div a partir da linha

  }

  prepararMensagemErros(erros) {
    this.erroLinguagemProgramacao = ""
    this.editorCodigo.limparCores();
    if (erros != undefined && erros.length > 0) {
      erros.forEach(erro => {
        this.erroLinguagemProgramacao += erro.mensagem + "<br>";
        this.editorCodigo.destacarLinha(erro.linha, "erro");
      });
    }
  }

  executar() {

    this.editorCodigo.codigo.setAlgoritmo(editor.getValue());
    this.uploadCodigo = true;

    let estudante = new Estudante("12345", null, null, null, null); // TODO: pegar do login
    let questao = new Questao("LwC2ItAVtfkDhcE9jvpT", null, null, null, null, null, null, null);
    let submissao = new Submissao(null, this.editorCodigo.codigo, estudante, questao)
    let tutor = new Tutor(submissao);
    submissao.save().subscribe(resultado => {
      tutor.analisar();

      tutor.salvarErros().subscribe(resultados => {
        // TODO: salvar o objeto de submissão e usar o id de submissão no erro, ao invés de estudante id

        if (tutor.hasErrors()) {
          this.prepararMensagemErros(tutor.erros);
          this.uploadCodigo = false;
        } else {

          let _this = this;

          setTimeout(function () {
            _this.uploadCodigo = false;
          }, 10000)

          let httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          }

          // TODO: pegar usuário logado



          // TODO: definir um timedout

          this.http.post<any>("http://127.0.0.1:8000/codigo/", submissao.objectToDocument(), httpOptions).subscribe(resposta => {



            let consultas = []
            this.resultadosTestsCases = []
            for (let i = 0; i < resposta.resultados.length; i++) {
              let consulta = ResultadoTestCase.get(resposta.resultados[i].id);
              consultas.push(consulta);

            }

            forkJoin(consultas).subscribe(resultados => {

              for (let i = 0; i < resultados.length; i++) {
                this.resultadosTestsCases.push(resultados[i]);
              }
            })
          }, err => {
            console.log(err); // TODO jogar em variável
          }, () => {
            _this.uploadCodigo = false;
          })
        }
      })
    })
  }


  prepararStatus(status) {
    let textoStatus = "<span class='textoStatus'>Status</span> "
    if (!status)
      this.statusExecucao = textoStatus + "<span class='statusErro'>Erro</span>";
    else
      this.statusExecucao = textoStatus + "<span class='statusSucesso'>Sucesso</span>";
  }

}
