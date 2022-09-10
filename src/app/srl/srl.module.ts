import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfInstructionComponent } from './planejamento/self-instruction/self-instruction.component';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';

import { PaginaNaoEncontradaComponent } from '../geral-module/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { RiscoEstudanteComponent } from './monitoramento/learning-dashboard/card-risco-estudante/card-risco-estudante.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { RouterModule, Routes } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { RespostaSimilarQuestaoProgramacaoComponent } from './monitoramento/resposta-similar-questao-programacao/resposta-similar-questao-programacao.component';
import { TreeTableModule } from 'primeng/treetable';
import { ExibirSolucaoComponent } from './monitoramento/exibir-solucao/exibir-solucao.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { JuizModule } from '../juiz/juiz.module';
import { MonitorarAssuntoComponent } from './monitoramento/monitorar-assunto/monitorar-assunto.component';
import { AcompanharDesempenhoComponent } from './monitoramento/learning-dashboard/acompanhar-desempenho/acompanhar-desempenho.component';
import { PercentualErrorQuotientComponent } from './monitoramento/percentual-error-quotient/percentual-error-quotient.component';
import { CardDesempenhoComponent } from './monitoramento/card-desempenho/card-desempenho.component';
import { CardErrosProgramacaoPizzaComponent } from './monitoramento/learning-dashboard/card-erros-programacao-pizza/card-erros-programacao-pizza.component';
import { CardHistoricoErrosComponent } from './monitoramento/learning-dashboard/card-historico-erros/card-historico-erros.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TipsRegulacaoComponent } from './monitoramento/tips-regulacao/tips-regulacao.component';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { AnaliseDesempenhoEstudanteComponent } from './monitoramento/learning-dashboard/analise-desempenho-estudante/analise-desempenho-estudante.component';
import { DesempenhoAssuntosComponent } from './monitoramento/learning-dashboard/desempenho-assuntos/desempenho-assuntos.component';
import { DiarioComponent } from './monitoramento/diario/diario.component';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputTextModule } from 'primeng/inputtext';
import { CompartilhadoModule } from '../shared/shared.module';
import { AnalisarObjetivosService } from './analisar-objetivos.service';
import { RastrearTempoOnlineService } from './rastrear-tempo-online.service';
import { CardErrosProgramacaoDoughnutComponent } from './monitoramento/learning-dashboard/card-erros-programacao-doughnut/card-erros-programacao-doughnut.component';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { RevisaoCodigoComponent } from './reflexao/revisao-codigo/revisao-codigo.component';
import { ListagemDiarioComponent } from './monitoramento/listagem-diario/listagem-diario.component';
import { VisualizacaoDiarioComponent } from './monitoramento/visualizacao-diario/visualizacao-diario.component';
import { DiarioProgramacaoComponent } from './monitoramento/diario-programacao/diario-programacao.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AuthGuard } from '../guards/auth.guard';
import { ExperimentoGuard } from '../guards/experimento.guard';
import { PageTrack } from '../guards/pageTrack.guard';
import { SelfInstructionColetivoComponent } from './planejamento/self-instruction-coletivo/self-instruction-coletivo.component';
import { ChatModule } from '../chat/chat.module';
import {DividerModule} from 'primeng/divider';
import { GraficoPizzaErrosConceitos } from './monitoramento/learning-dashboard/grafico-pizza-erros-conceitos/grafico-pizza-erros-conceitos.component';

export const routes:Routes = [
  {
    path: 'index',
    component: AcompanharDesempenhoComponent,
    canActivate: [AuthGuard, ExperimentoGuard, PageTrack],
  },
  {
    path: 'meu-desempenho',
    component: AcompanharDesempenhoComponent,
    canActivate: [AuthGuard, ExperimentoGuard, PageTrack],
  },
  {
    path: 'listagem-diarios',
    component: ListagemDiarioComponent,
    canActivate: [AuthGuard, ExperimentoGuard, PageTrack],
  },
  {
    path: 'self-instruction/:assuntoId/:questaoId',
    component: SelfInstructionComponent,
    canActivate: [AuthGuard, ExperimentoGuard, PageTrack]
  },
  {
    path: 'self-instruction-editor/:assuntoId/:questaoId',
    component: SelfInstructionComponent,
    canActivate: [AuthGuard, ExperimentoGuard, PageTrack]
  },
  {
    path: 'entrar-grupo/:atividadeGrupoId/:assuntoId/:questaoId',
    component: SelfInstructionColetivoComponent,
    canActivate: [AuthGuard, PageTrack]
  },
]

@NgModule({
  declarations: [
    SelfInstructionComponent,
    PaginaNaoEncontradaComponent,
    RiscoEstudanteComponent,
    RespostaSimilarQuestaoProgramacaoComponent,
    ExibirSolucaoComponent,
    MonitorarAssuntoComponent,
    AcompanharDesempenhoComponent,
    PercentualErrorQuotientComponent,
    CardDesempenhoComponent,
    CardErrosProgramacaoPizzaComponent,
    CardHistoricoErrosComponent,
    TipsRegulacaoComponent,
    AnaliseDesempenhoEstudanteComponent,
    DesempenhoAssuntosComponent,
    DiarioComponent,
    CardErrosProgramacaoDoughnutComponent,
    RevisaoCodigoComponent,
    ListagemDiarioComponent,
    VisualizacaoDiarioComponent,
    DiarioProgramacaoComponent,
    SelfInstructionColetivoComponent,
    GraficoPizzaErrosConceitos
  ],
  imports: [
    ChatModule,
    CommonModule,
    AccordionModule,
    RouterModule.forChild(routes),
    CompartilhadoModule,
    DynamicDialogModule,
    CodeHighlighterModule,
    MessagesModule,
    MessageModule,
    CheckboxModule,
    FormsModule,
    ProgressBarModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    DividerModule,
    ToastModule,
    SliderModule,
    TabViewModule,
    InputTextModule,
    FieldsetModule,
    TreeTableModule,
    RadioButtonModule,
    ChartModule,
    DialogModule,
    CardModule,
    ContextMenuModule,
    SharedPipesModule,
  ],
  providers: [MessageService, AnalisarObjetivosService, RastrearTempoOnlineService, DialogService],
  exports: [
    DiarioComponent,
    RiscoEstudanteComponent,
    PercentualErrorQuotientComponent,
    TipsRegulacaoComponent,
    DesempenhoAssuntosComponent,
    MonitorarAssuntoComponent,
    CardErrosProgramacaoPizzaComponent,
    RevisaoCodigoComponent,
    GraficoPizzaErrosConceitos
  ],
})
export class SrlModule {}
