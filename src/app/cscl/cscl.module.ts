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

@NgModule({
  declarations: [ComentariosCodigoComponent, BoxComentarioComponent, 
    BoxNovoComentarioComponent, VisualizarConteudoComponent, SanitizeHtmlDirective, ConteudoProgramacaoComponent, 
    VisualizarSubmissaoQuestaoComponent, ListarEstudantesSubmissaoComponent, ListarPostagensComponent, CadastrarPostagemComponent, 
    VisualizarPostagemComponent, CriacaoGrupoComponent, ListarAtividadesGrupoComponent, ListarAtividadesGrupoProfessorComponent],

  imports: [
    CalendarModule,
    MultiSelectModule,
    AutoCompleteModule,
    DropdownModule,
    JuizModule,
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
    CardModule

  ],

  exports: [ListarAtividadesGrupoComponent, ListarPostagensComponent, ComentariosCodigoComponent, VisualizarConteudoComponent, VisualizarSubmissaoQuestaoComponent, ListarEstudantesSubmissaoComponent]


})
export class CsclModule { }
