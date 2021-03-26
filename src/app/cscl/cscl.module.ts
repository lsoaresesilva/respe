import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import { BoxComentarioComponent } from './box-comentario/box-comentario.component';
import { BoxNovoComentarioComponent } from './box-novo-comentario/box-novo-comentario.component';
import { ComentariosCodigoComponent } from './comentarios-codigo/comentarios-codigo';
import { VisualizarConteudoComponent } from './visualizar-conteudo/visualizar-conteudo.component';
import { ConteudoProgramacaoComponent } from './conteudo-programacao/conteudo-programacao.component';
import { SanitizeHtmlDirective } from '../pipes/sanitize.directive';
import { VisualizarSubmissaoQuestaoComponent } from './visualizar-submissao-questao/visualizar-submissao-questao.component';
import { TableModule } from 'primeng/table';
import { ListarEstudantesSubmissaoComponent } from './listar-estudantes-submissao/listar-estudantes-submissao.component';
import { ListarPostagensComponent } from './listar-postagens/listar-postagens.component';
import { CadastrarPostagemComponent } from './cadastrar-postagem/cadastrar-postagem.component';
import { VisualizarPostagemComponent } from './visualizar-postagem/visualizar-postagem.component';

import { DataViewModule } from 'primeng/dataview';

import { JuizModule } from '../juiz/juiz.module';
import {CalendarModule} from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { CriacaoGrupoComponent } from './criacao-grupo/criacao-grupo.component';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';

import {MultiSelectModule} from 'primeng/multiselect';
import { ListarAtividadesGrupoComponent } from './listar-atividades-grupo/listar-atividades-grupo.component';
import { ListarAtividadesGrupoProfessorComponent } from './listar-atividades-grupo-professor/listar-atividades-grupo-professor.component';
import { VisualizarAtividadeGrupoProfessorComponent } from './visualizar-atividade-grupo-professor/visualizar-atividade-grupo-professor.component';
import { VisualizarSolucoesAtividadeGrupoComponent } from './visualizar-solucoes-atividade-grupo/visualizar-solucoes-atividade-grupo.component';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { EditorColaborativoComponent } from './editor-colaborativo/editor-colaborativo.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
 

@NgModule({
  declarations: [ComentariosCodigoComponent, BoxComentarioComponent, 
    BoxNovoComentarioComponent, VisualizarConteudoComponent, SanitizeHtmlDirective, ConteudoProgramacaoComponent, 
    VisualizarSubmissaoQuestaoComponent, ListarEstudantesSubmissaoComponent, ListarPostagensComponent, CadastrarPostagemComponent, 
    VisualizarPostagemComponent, CriacaoGrupoComponent, ListarAtividadesGrupoComponent, ListarAtividadesGrupoProfessorComponent, VisualizarAtividadeGrupoProfessorComponent, VisualizarSolucoesAtividadeGrupoComponent, EditorColaborativoComponent],

  imports: [
    CalendarModule,
    MultiSelectModule,
    AutoCompleteModule,
    DropdownModule,
    FormsModule,
    CodemirrorModule,
    CommonModule,
    InputTextareaModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    FormsModule,
    OverlayPanelModule,
    AccordionModule,
    TableModule,
    ToastModule,
    DataViewModule,
    CardModule,
    HighlightModule

  ],

  exports: [EditorColaborativoComponent, ListarAtividadesGrupoComponent, ListarPostagensComponent, ComentariosCodigoComponent, VisualizarConteudoComponent, VisualizarSubmissaoQuestaoComponent, ListarEstudantesSubmissaoComponent],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          python: () => import('highlight.js/lib/languages/python')
        }
      }
    }
  ],

})
export class CsclModule { }
