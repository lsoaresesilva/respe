import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { VisualizarTestesComponent } from './visualizar-testes/visualizar-testes.component';
import { TableModule, ContextMenuRow } from 'primeng/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SpinnerModule } from 'primeng/spinner';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import {TooltipModule} from 'primeng/tooltip';
import { ListarQuestoesComponent } from './listar-questoes/listar-questoes.component';
import { MessageService, SharedModule } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AnalyticsModule } from '../analytics-module/analytics.module';
import { ResponderQuestaoProgramacao } from './editor/responder-questao-programacao/responder-questao-programacao.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import {TimelineModule} from 'primeng/timeline';
import { ContextMenuModule } from 'primeng/contextmenu';
import {KnobModule} from 'primeng/knob';


import { VisualizarExecucacao } from './vizualizar-execucao/vizualizar-execucao.component';

import { RadioButtonModule } from 'primeng/radiobutton';
import { ListarAssuntosComponent } from './listar-assuntos/listar-assuntos.component';
import { VisualizarAssuntoComponent } from './visualizar-assunto/visualizar-assunto.component';
import { ListarPedidosAjudaComponent } from './listar-pedidos-ajuda/listar-pedidos-ajuda.component';
import { VisualizarPedidoAjudaComponent } from './visualizar-pedido-ajuda/visualizar-pedido-ajuda.component';
import { LoginService } from '../login-module/login.service';
import { EditorService } from './editor.service';

import { CadastrarAlternativasComponent } from '../admin/cadastrar-alternativas/cadastrar-alternativas.component';
import { VisualizarQuestaoFechadaComponent } from './visualizar-questao-fechada/visualizar-questao-fechada.component';
import { ListarQuestoesFechadasComponent } from './listar-questoes-fechadas/listar-questoes-fechadas.component';
import { EscolherQuestaoComponent } from './escolher-questao/escolher-questao.component';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CsclModule } from '../cscl/cscl.module';
import { PanelModule } from 'primeng/panel';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { EditorProgramacaoComponent } from './editor/editor-programacao/editor-programacao.component';
import { ResponderQuestaoProgramacaoLiteComponent } from './editor/responder-questao-programacao-lite/responder-questao-programacao-lite.component';
import { ConsoleComponent } from './editor/console/console.component';
import { BreadcrumbAssuntoComponent } from './breadcrumb-assunto/breadcrumb-assunto.component';
import { ApresentacaoEntradasTestcaseComponent } from './apresentacao-entradas-testcase/apresentacao-entradas-testcase.component';
import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';
import {SkeletonModule} from 'primeng/skeleton';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { SrlModule } from '../srl/srl.module';
import { ListarQuestoesSequenciaComponent } from './listar-questoes-sequencia/listar-questoes-sequencia.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChatModule } from '../chat/chat.module';
import { BtnAvancarQuestaoComponent } from './btn-avancar-questao/btn-avancar-questao.component';
import { ExibirSolucaoComponent } from '../srl/monitoramento/exibir-solucao/exibir-solucao.component';

import {SplitButtonModule} from 'primeng/splitbutton';
import { EditorPadraoComponent } from './editor/editor-padrao/editor-padrao.component';
import { ConsolePadraoComponent } from './editor/console-padrao/console-padrao.component';
import { EditorTrintadoisbitsComponent } from './editor/editor-trintadoisbits/editor-trintadoisbits.component';
import { ConsoleErroComponent } from './editor/console-erro/console-erro.component';
import { IdeComponent } from './editor/ide/ide.component';
import { DadosQuestaoComponent } from './dados-questao/dados-questao.component';
import {TerminalModule, TerminalService} from 'primeng/terminal';
import { EditorIndependenteComponent } from './editor/editor-independente/editor-independente.component';
import { ContainerEditorProgramacaoComponent } from './editor/container-editor-programacao/container-editor-programacao.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../geral-module/main/main.component';
import { AuthGuard } from '../guards/auth.guard';
import { PageTrack } from '../guards/pageTrack.guard';
import { VisualizarParsonComponent } from './visualizar-parson/visualizar-parson.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { MonitorService } from '../chatbot/monitor.service';
import { BlockUIModule } from 'primeng/blockui';
import { ResponderQuestaoProgramacaoRegexComponent } from './editor/responder-questao-programacao-regex/responder-questao-programacao-regex.component';

export const routes: Routes = [
  {
    path: 'listar-assuntos',
    component: ListarAssuntosComponent,
    canActivate: [AuthGuard, PageTrack]
  },
  

  {
    path: 'visualizar-assunto/:id',
    component: VisualizarAssuntoComponent,
    canActivate: [AuthGuard, PageTrack]
  },
  {
    path: 'visualizacao-questao-fechada/:id',
    component: VisualizarQuestaoFechadaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'visualizacao-questao-fechada/:assuntoId/:questaoId',
    component: VisualizarQuestaoFechadaComponent,
    canActivate: [AuthGuard, PageTrack]
  },

  {
    path: 'visualizar-questao-parson/:assuntoId/:questaoId',
    component: VisualizarParsonComponent,
    canActivate: [AuthGuard, PageTrack]
  },
  {
    path: 'editor/:assuntoId/:questaoId',
    component: ResponderQuestaoProgramacao,
    canActivate: [AuthGuard, PageTrack]
  },
  {
    path: 'editor-regex/:assuntoId/:questaoId',
    component: ResponderQuestaoProgramacaoRegexComponent,
    canActivate: [AuthGuard, PageTrack]
  },
  {
    path: 'editor-programacao',
    component: EditorIndependenteComponent,
    canActivate: [AuthGuard, PageTrack]
  },


  {
    path: 'atividade-grupo/:atividadeGrupoId/:grupoId/:assuntoId/:questaoId',
    component: ResponderQuestaoProgramacao,
    canActivate: [AuthGuard, PageTrack]
  },
  {
    path: 'responder-questao-correcao/:assuntoId/:questaoCorrecaoId',
    component: ResponderQuestaoProgramacao,
    canActivate: [AuthGuard, PageTrack]
  },

  
];

@NgModule({
  declarations: [
    
    VisualizarParsonComponent,
    BreadcrumbAssuntoComponent, 
    DadosQuestaoComponent,
    VisualizarTestesComponent,
    
    ListarQuestoesComponent,
    ResponderQuestaoProgramacao,
    ResponderQuestaoProgramacao,
    VisualizarExecucacao,
    ListarAssuntosComponent,
    VisualizarAssuntoComponent,
    
    
    ListarQuestoesFechadasComponent,
    VisualizarQuestaoFechadaComponent,
    ListarPedidosAjudaComponent,
    VisualizarPedidoAjudaComponent,
    EscolherQuestaoComponent,
    EditorProgramacaoComponent,
    ResponderQuestaoProgramacaoLiteComponent,
    ConsoleComponent,
    ApresentacaoEntradasTestcaseComponent,
    ListarQuestoesSequenciaComponent,
    BtnAvancarQuestaoComponent,
    EditorPadraoComponent,
    ConsolePadraoComponent,
    EditorTrintadoisbitsComponent,
    ConsoleErroComponent,
    IdeComponent,
    EditorIndependenteComponent,
    ContainerEditorProgramacaoComponent,
    ResponderQuestaoProgramacaoRegexComponent
  ],

  imports: [
    SrlModule,
    ChatModule,
    /* CsclModule, */
    RouterModule.forChild(routes),
    CommonModule,
    SplitButtonModule,
    SkeletonModule,
    TerminalModule,
    TimelineModule,
    BlockUIModule,
    TooltipModule,
    DynamicDialogModule,
    KnobModule,
    TableModule,
    PanelModule,
    ButtonModule,
    FormsModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    SpinnerModule,
    CodeHighlighterModule,
    InputTextareaModule,
    ContextMenuModule,
    HttpClientModule,
    ProgressSpinnerModule,
    AnalyticsModule,
    AutoCompleteModule,
    ToastModule,
    InputTextModule,
    CardModule,
    RadioButtonModule,
    DialogModule,
    DragDropModule,
    FieldsetModule,
    InputMaskModule,
    ConfirmDialogModule,
    ScrollPanelModule,
    SharedPipesModule,
    ProgressBarModule,
    SharedModule
  ],
  exports: [
    VisualizarTestesComponent,
   
    ListarQuestoesComponent,
    ListarAssuntosComponent,
    VisualizarAssuntoComponent,
    ListarQuestoesFechadasComponent,
    VisualizarQuestaoFechadaComponent,
    ResponderQuestaoProgramacaoLiteComponent,
    BtnAvancarQuestaoComponent,
    BreadcrumbAssuntoComponent, 
    DadosQuestaoComponent
  ],
  entryComponents: [
    ExibirSolucaoComponent
],
  providers: [MessageService, MonitorService, LoginService, EditorService, ConfirmationService, DialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class JuizModule {}
