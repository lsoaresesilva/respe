import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { VisualizarTestesComponent } from './visualizar-testes/visualizar-testes.component';
import { TableModule, ContextMenuRow } from 'primeng/table';
import { CadastrarQuestoesComponent } from './cadastrar-questoes/cadastrar-questoes.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SpinnerModule } from 'primeng/spinner';
import { CadastrarTesteCaseComponent } from './cadastrar-teste-case/cadastrar-teste-case.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ListarQuestoesComponent } from './listar-questoes/listar-questoes.component';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AnalyticsModule } from '../analytics-module/analytics.module';
import { ResponderQuestaoProgramacao } from './editor/responder-questao-programacao/responder-questao-programacao.component';
import { DadosQuestaoComponent } from './dados-questao/dados-questao.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import {TimelineModule} from 'primeng/timeline';
import { ContextMenuModule } from 'primeng/contextmenu';
import {KnobModule} from 'primeng/knob';


import { VisualizarExecucacao } from './vizualizar-execucao/vizualizar-execucao.component';

import { RadioButtonModule } from 'primeng/radiobutton';
import { CadastrarAssuntosComponent } from './cadastrar-assuntos/cadastrar-assuntos.component';
import { ListarAssuntosComponent } from './listar-assuntos/listar-assuntos.component';
import { VisualizarAssuntoComponent } from './visualizar-assunto/visualizar-assunto.component';
import { ListarPedidosAjudaComponent } from './listar-pedidos-ajuda/listar-pedidos-ajuda.component';
import { VisualizarPedidoAjudaComponent } from './visualizar-pedido-ajuda/visualizar-pedido-ajuda.component';
import { LoginService } from '../login-module/login.service';
import { EditorService } from './editor.service';

import { CadastrarAlternativasComponent } from './cadastrar-alternativas/cadastrar-alternativas.component';
import { CadastrarQuestoesFechadasComponent } from './cadastrar-questoes-fechadas/cadastrar-questoes-fechadas.component';
import { VisualizarQuestaoFechadaComponent } from './visualizar-questao-fechada/visualizar-questao-fechada.component';
import { ListarQuestoesFechadasComponent } from './listar-questoes-fechadas/listar-questoes-fechadas.component';
import { EscolherQuestaoComponent } from './escolher-questao/escolher-questao.component';

import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CsclModule } from '../cscl/cscl.module';
import { ListarTurmaProfessorComponent } from '../turma/listar-turma-professor/listar-turma-professor.component';
import { ListarProfessoresComponent } from '../turma/listar-professores/listar-professores.component';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { EditorProgramacaoComponent } from './editor/editor-programacao/editor-programacao.component';
import { ResponderQuestaoProgramacaoLiteComponent } from './editor/responder-questao-programacao-lite/responder-questao-programacao-lite.component';
import { ConsoleComponent } from './editor/console/console.component';
import { BreadcrumbAssuntoComponent } from './breadcrumb-assunto/breadcrumb-assunto.component';
import { ApresentacaoEntradasTestcaseComponent } from './apresentacao-entradas-testcase/apresentacao-entradas-testcase.component';
import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { SrlModule } from '../srl/srl.module';
import { ListarQuestoesSequenciaComponent } from './listar-questoes-sequencia/listar-questoes-sequencia.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChatModule } from '../chat/chat.module';

@NgModule({
  declarations: [
    VisualizarTestesComponent,
    CadastrarQuestoesComponent,
    CadastrarTesteCaseComponent,
    ListarQuestoesComponent,
    DadosQuestaoComponent,
    ResponderQuestaoProgramacao,
    ResponderQuestaoProgramacao,
    VisualizarExecucacao,
    ListarAssuntosComponent,
    VisualizarAssuntoComponent,
    CadastrarAssuntosComponent,
    CadastrarQuestoesFechadasComponent,
    ListarQuestoesFechadasComponent,
    VisualizarQuestaoFechadaComponent,
    CadastrarAlternativasComponent,
    ListarPedidosAjudaComponent,
    VisualizarPedidoAjudaComponent,
    EscolherQuestaoComponent,
    EditorProgramacaoComponent,
    ResponderQuestaoProgramacaoLiteComponent,
    ConsoleComponent,
    BreadcrumbAssuntoComponent,
    ApresentacaoEntradasTestcaseComponent,
    ListarQuestoesSequenciaComponent,
  ],

  imports: [
    SrlModule,
    ChatModule,
    CommonModule,
    TimelineModule,
    KnobModule,
    TableModule,
    PanelModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SpinnerModule,
    CodeHighlighterModule,
    InputTextareaModule,
    CheckboxModule,
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
    FieldsetModule,
    InputMaskModule,
    ConfirmDialogModule,
    ScrollPanelModule,
    SharedPipesModule,
    ProgressBarModule,
  ],
  exports: [
    VisualizarTestesComponent,
    DadosQuestaoComponent,
    CadastrarQuestoesComponent,
    ListarQuestoesComponent,
    CadastrarTesteCaseComponent,
    CadastrarAssuntosComponent,
    ListarAssuntosComponent,
    VisualizarAssuntoComponent,
    CadastrarQuestoesFechadasComponent,
    ListarQuestoesFechadasComponent,
    VisualizarQuestaoFechadaComponent,
    ResponderQuestaoProgramacaoLiteComponent,
  ],

  providers: [MessageService, LoginService, EditorService, ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class JuizModule {}
