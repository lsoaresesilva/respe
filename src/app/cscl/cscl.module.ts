import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InputTextareaModule} from 'primeng/inputtextarea';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AccordionModule} from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import { BoxComentarioComponent } from './box-comentario/box-comentario.component';
import { BoxNovoComentarioComponent } from './box-novo-comentario/box-novo-comentario.component';
import { ComentariosCodigoComponent } from './comentarios-codigo/comentarios-codigo';
import { VisualizarConteudoComponent } from './visualizar-conteudo/visualizar-conteudo.component';
import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';
import { ConteudoProgramacaoComponent } from './conteudo-programacao/conteudo-programacao.component';
import { SanitizeHtmlDirective } from '../pipes/sanitize.directive';
import { ListarSubmissaoQuestaoComponent } from './listar-submissao-questao/listar-submissao-questao.component';
import { TableModule } from 'primeng/table';
import { ListarEstudantesSubmissaoComponent } from './listar-estudantes-submissao/listar-estudantes-submissao.component';
import { ListarPostagensComponent } from './listar-postagens/listar-postagens.component';
import { CadastrarPostagemComponent } from './cadastrar-postagem/cadastrar-postagem.component';
import { VisualizarPostagemComponent } from './visualizar-postagem/visualizar-postagem.component';
import { ToastModule } from 'primeng/toast';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { JuizModule } from '../juiz/juiz.module';

@NgModule({
  declarations: [ComentariosCodigoComponent, BoxComentarioComponent, BoxNovoComentarioComponent, VisualizarConteudoComponent, EscapeHtmlPipe, SanitizeHtmlDirective, ConteudoProgramacaoComponent, ListarSubmissaoQuestaoComponent,ListarEstudantesSubmissaoComponent, ListarPostagensComponent, CadastrarPostagemComponent, VisualizarPostagemComponent],
 
  imports: [
    JuizModule,
    CommonModule,
    InputTextareaModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    OverlayPanelModule,
    AccordionModule,
    TableModule,
    ToastModule,
    DataViewModule,
    CardModule
    
  ],

  exports:[ListarPostagensComponent, ComentariosCodigoComponent, VisualizarConteudoComponent,ListarSubmissaoQuestaoComponent,ListarEstudantesSubmissaoComponent]

 
})
export class CsclModule { }
