import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import Editor from 'src/app/model/editor';

declare function carregarIde(
  readOnly,
  callback,
  instance,
  callbackOnEditorLoad,
  codigo
): any;

@Component({
  selector: 'app-container-editor-programacao',
  templateUrl: './container-editor-programacao.component.html',
  styleUrls: ['./container-editor-programacao.component.css']
})
export class ContainerEditorProgramacaoComponent implements OnInit, AfterViewInit, OnChanges {


  @Input()
  liteMode;
  @Input()
  erroAtivo; // Se existir um erro ativo, é guardado nessa variável

  @Output()
  onContainerReady;

  isEditorPronto;
  
  editorCodigo?: Editor;

  constructor() { 
    this.onContainerReady = new EventEmitter();
    this.editorCodigo = Editor.getInstance();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.erroAtivo != null){
      this.destacarErro();
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let _this = this;

    

    setTimeout(function () {
      carregarIde(
        false,
        function () {
          _this.isEditorPronto = true;
        },
        _this,
        _this.carregarEditor,
        _this.editorCodigo.codigo
      );
    }, 500);
  }

  carregarEditor(instance, editor) {
    instance.editorCodigo.instanciaMonaco = editor;
    instance.onContainerReady.emit();

    instance.editorCodigo.instanciaMonaco.onKeyDown(function (e) {
      let linhaAtual = editor.getPosition().lineNumber;
      if(instance.erroAtivo != null){
        if(instance.erroAtivo.linha == linhaAtual){
          instance.removerDestaquesErro()
        }
      }

    }); 
  }

  removerDestaquesErro(){
    Editor.getInstance().removerDecorations();
    Editor.getInstance().removerDisposableHover();
  }

  destacarErro(){
    Editor.getInstance().criarHover(this.erroAtivo);
    setTimeout(() => {
      Editor.getInstance().destacarLinha(this.erroAtivo.linha, "linhaErro")
    }, 1000);
    
  }

}
