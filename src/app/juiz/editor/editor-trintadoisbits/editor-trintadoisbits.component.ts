import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { timeout } from 'rxjs/operators';
import { GamificationFacade } from 'src/app/gamification/gamification.service';
import { LoginService } from 'src/app/login-module/login.service';
import RespostaQuestaoCorrecaoAlgoritmo from 'src/app/model/correcao-algoritmo/correcaoAlgoritmo';
import SubmissaoGrupo from 'src/app/model/cscl/submissaoGrupo';
import Editor from 'src/app/model/editor';
import ParseAlgoritmo from 'src/app/model/errors/analise-pre-compilacao/parseAlgoritmo';
import PontuacaoQuestaoProgramacao from 'src/app/model/gamification/pontuacaoQuestaoProgramacao';
import DiarioProgramacao from 'src/app/model/srl/diarioProgramacao';
import { TipoDiarioProgramacao } from 'src/app/model/srl/enum/tipoDiarioProgramacao';
import Submissao from 'src/app/model/submissao';
import { DiarioProgramacaoComponent } from 'src/app/srl/monitoramento/diario-programacao/diario-programacao.component';
import { environment } from 'src/environments/environment';
import { InterpretadorPythonService } from '../interpretador-python.service';

@Component({
  selector: 'app-editor-trintadoisbits',
  templateUrl: './editor-trintadoisbits.component.html',
  styleUrls: ['./editor-trintadoisbits.component.css']
})
export class EditorTrintadoisbitsComponent implements OnInit {

  URL = environment.URL;

  @Input()
  questao;
  @Input()
  assunto;
  @Input()
  processandoSubmissao;

  @Output()
  onSubmitInicio: EventEmitter<any>;
  @Output()
  onSubmit: EventEmitter<any>;
  @Output()
  onServidorError: EventEmitter<any>;
  @Output()
  onError: EventEmitter<any>;


  usuario;
  editorCodigo;
  submissao:Submissao;

  constructor(private http: HttpClient, 
    private interpretadorPython: InterpretadorPythonService,
    private messageService: MessageService, public login: LoginService, public dialogService: DialogService,
    private gamification: GamificationFacade) {
    this.usuario = this.login.getUsuarioLogado();
    this.editorCodigo = Editor.getInstance();
    this.onSubmit = new EventEmitter();
    this.onServidorError = new EventEmitter();
    this.onError = new EventEmitter();
    this.onSubmitInicio = new EventEmitter();

  }

  ngOnInit(): void {

  }

  async executar() {
    // this.pausaIde = true; // TODO: esse código está comentado, pois a função de pausar a IDE durante o envio não está funcionando.

    this.submissao = this.prepararSubmissao();

    if (this.submissao.validar()) {
      // this.submissao.analisarErros(); // TODO: esse código está comentado, pois a função de analisar os erros do estudante está com bugs.

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

      /*
      Verificação antes da submissão do código para identificar erros.
      Não está sendo utilizada, pois está com problemas.
      Potencial para uso. */
      /*
      if (this.submissao.hasErrors()) {
        
        this.onError.emit(this.submissao);
      } else {*/
      const tipoExecucao = Editor.getTipoExecucao(this.questao);

      const json = this.submissao.construirJson(this.questao, tipoExecucao);

      const resultado = await this.interpretadorPython.runPythonCodeAndCompare(
        json.submissao,
        json.questao
      );

      this.onSubmitInicio.emit();

      this.submissao.processarRespostaServidor(resultado);

      if (this.submissao.isFinalizada()) {

        this.gamification.aumentarPontuacao(
          this.login.getUsuarioLogado(),
          this.questao,
          new PontuacaoQuestaoProgramacao()
        );
      }

      this.onSubmit.emit(this.submissao);

      /* this.http
        .post<any>(url, json, httpOptions)
        .pipe(timeout(30000))
        .subscribe({
          next: (resposta) => {
            this.submissao.processarRespostaServidor(resposta)
            if (this.submissao.isFinalizada()) {

              this.gamification.aumentarPontuacao(
                this.login.getUsuarioLogado(),
                this.questao,
                new PontuacaoQuestaoProgramacao()
              );
            }
            this.onSubmit.emit(this.submissao);
          },
          error: (erro) => {
            //this.destacarErros(this.submissao); TODO;

            if (erro.status == 0) {
              this.onServidorError.emit(erro);
            } else {
              this.onError.emit({ erro: erro, submissao: this.submissao });
            }


          },
          complete: () => {

          },
        }); */
    } else {
      this.processandoSubmissao = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não é possível executar o código, pois ele está vazio.',
      });
    }
  }

  /**
   * Constrói uma submissão que será salva no banco de dados.
   */
  prepararSubmissao() {
    this.editorCodigo.codigo.next(this.editorCodigo.instanciaMonaco.getValue());
    const submissao = new Submissao(
      null,
      this.editorCodigo.instanciaMonaco.getValue(),
      this.usuario,
      this.assunto,
      this.questao
    );
    return submissao;
  }

}
