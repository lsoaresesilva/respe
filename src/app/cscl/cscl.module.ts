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
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { CriarAtividadeGrupoComponent } from './criar-atividade-grupo/criar-atividade-grupo.component';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { MultiSelectModule } from 'primeng/multiselect';
import { ListarAtividadesGrupoComponent } from './listar-atividades-grupo/listar-atividades-grupo.component';
import { ListarAtividadesGrupoProfessorComponent } from './listar-atividades-grupo-professor/listar-atividades-grupo-professor.component';
import { VisualizarAtividadeGrupoProfessorComponent } from './visualizar-atividade-grupo-professor/visualizar-atividade-grupo-professor.component';
import { VisualizarSolucoesAtividadeGrupoComponent } from './visualizar-solucoes-atividade-grupo/visualizar-solucoes-atividade-grupo.component';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { EditorDocumentacaoProjetoComponent } from './editor-documentacao-projeto/editor-documentacao-projeto.component';
import { ModificarGrupoComponent } from './modificar-grupo/modificar-grupo.component';
import { CriarFrequenciaComponent } from './criar-frequencia/criar-frequencia.component';
import { VisualizarChatComponent } from './visualizar-chat/visualizar-chat.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { PageTrack } from '../guards/pageTrack.guard';
import { ProfessorGuard } from '../guards/professor.guard';
import { CriarGrupoComponent } from './criar-grupo/criar-grupo.component';

export const routes: Routes = [
  {
    path: 'listagem-atividades-grupo',
    component: ListarAtividadesGrupoComponent,
    canActivate: [AuthGuard, PageTrack],
  },
  {
    path: 'criar-atividade-grupo',
    component: CriarAtividadeGrupoComponent,
    canActivate: [AuthGuard, ProfessorGuard],
  },

  {
    path: 'criar-grupo/:atividadeGrupoId',
    component: CriarGrupoComponent,
    canActivate: [AuthGuard, ProfessorGuard],
  },

  {
    path: 'cadastrar-postagem/:codigoTurma',
    component: CadastrarPostagemComponent,
    canActivate: [AuthGuard, PageTrack],
  },

  {
    path: 'visualizar-postagem/:postagemId',
    component: VisualizarPostagemComponent,
    canActivate: [AuthGuard, PageTrack],
  },
  {
    path: 'listagem-atividades-grupo-professor',
    component: ListarAtividadesGrupoProfessorComponent,
    canActivate: [AuthGuard, ProfessorGuard]
  },
  {
    path: 'visualizacao-atividade-grupo-professor/:id',
    component: VisualizarAtividadeGrupoProfessorComponent,
    canActivate: [AuthGuard, ProfessorGuard]
  },
  {
    path: 'visualizacao-solucao-atividade-grupo/:atividadeGrupoId/:grupoId',
    component: VisualizarSolucoesAtividadeGrupoComponent,
    canActivate: [AuthGuard, PageTrack, ProfessorGuard]
  },
  {
    path: 'modificar-grupo/:atividadeGrupoId/:grupoId',
    component: ModificarGrupoComponent,
    canActivate: [AuthGuard, ProfessorGuard]
  },
  {
    path: 'criar-frequencia',
    component: CriarFrequenciaComponent,
    canActivate: [AuthGuard, ProfessorGuard]
  },
];

@NgModule({
  declarations: [
    ComentariosCodigoComponent,
    BoxComentarioComponent,
    BoxNovoComentarioComponent,
    VisualizarConteudoComponent,
    SanitizeHtmlDirective,
    ConteudoProgramacaoComponent,
    VisualizarSubmissaoQuestaoComponent,
    ListarEstudantesSubmissaoComponent,
    ListarPostagensComponent,
    CadastrarPostagemComponent,
    VisualizarPostagemComponent,
    CriarAtividadeGrupoComponent,
    ListarAtividadesGrupoComponent,
    ListarAtividadesGrupoProfessorComponent,
    VisualizarAtividadeGrupoProfessorComponent,
    VisualizarSolucoesAtividadeGrupoComponent,
    EditorDocumentacaoProjetoComponent,
    ModificarGrupoComponent,
    CriarFrequenciaComponent,
    VisualizarChatComponent,
    CriarAtividadeGrupoComponent,
    CriarGrupoComponent
  ],

  imports: [
    RouterModule.forChild(routes),
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
    HighlightModule,
  ],

  exports: [
    ListarAtividadesGrupoComponent,
    ListarPostagensComponent,
    ComentariosCodigoComponent,
    VisualizarConteudoComponent,
    VisualizarSubmissaoQuestaoComponent,
    ListarEstudantesSubmissaoComponent,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          python: () => import('highlight.js/lib/languages/python'),
        },
      },
    },
  ],
})
export class CsclModule {}
