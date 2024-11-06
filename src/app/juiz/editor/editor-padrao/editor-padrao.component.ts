import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/login-module/login.service';
import Editor from 'src/app/model/editor';
import Submissao from 'src/app/model/submissao';
declare var Sk: any;

declare function carregarIdePadrao(instance, callbackOnEditorLoad, codigo): any;

@Component({
  selector: 'app-editor-padrao',
  templateUrl: './editor-padrao.component.html',
  styleUrls: ['./editor-padrao.component.css'],
})
export class EditorPadraoComponent implements OnInit, AfterViewInit {

  @Input()
  questao;
  @Input()
  assunto;

  editorCodigo:Editor;
  usuario;
  
  @Output()
  onSubmit: EventEmitter<any>;
  @Output()
  onSubmitInicio: EventEmitter<any>;
  @Output()
  onError: EventEmitter<any>;

  submissao;

  constructor(public login: LoginService, ) {
    this.editorCodigo = Editor.getInstance();
    this.usuario = this.login.getUsuarioLogado();
    this.onSubmit = new EventEmitter();
    this.onSubmitInicio = new EventEmitter();
    this.onError = new EventEmitter();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
  }

  onEditorInicializado(editor){

  }

  executar() {
    this.onSubmitInicio.emit();
    let _this = this;
    let output = ""
    function builtinRead(x) {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined)
        throw "File not found: '" + x + "'";
      return Sk.builtinFiles['files'][x];
    }


    function prepararSaida(saida){
      
      if(saida != ""){
        output += saida+"\n";
      }
      
    }

    this.editorCodigo.codigo.next(this.editorCodigo.instanciaMonaco.getValue());

    if(this.questao != null && this.assunto != null){
      this.submissao = this.prepararSubmissao();
    }
    
    //var mypre = document.getElementById("output");
    //mypre.innerHTML = '';
    Sk.pre = 'output';
    Sk.configure({ output: prepararSaida, read: builtinRead });
    /* (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas'; */
    var myPromise = Sk.misceval.asyncToPromise(()=>{
      return Sk.importMainWithBody('<stdin>', false, this.editorCodigo.codigo.value, true);
    });

    myPromise.then(
      function (mod) {
        if(_this.questao != null && _this.assunto != null){
          _this.submissao.saida = output; 
          _this.onSubmit.emit(_this.submissao);
        }else{
          _this.onSubmit.emit(output);
        }
      
      },
      function (err) {
        if(_this.questao != null && _this.assunto != null){
          _this.onError.emit({erro:err.toString(), submissao:_this.submissao});
        }else{
          _this.onError.emit(err.toString());
        }

        
      }
    );
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
