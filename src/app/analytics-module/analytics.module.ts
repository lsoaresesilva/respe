import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgessoGeralComponent } from './progesso-geral/progesso-geral.component';
import { ProgressoQuestoesAbertasComponent } from './progresso-questoes-abertas/progresso-questoes-abertas.component';
import { ProgressoQuestoesFechadasComponent } from './progresso-questoes-fechadas/progresso-questoes-fechadas.component';
import { PercentualVisualizacaoQuestoesComponent } from './percentual-visualizacao-questoes/percentual-visualizacao-questoes.component';
import { TotalErrosComponent } from './total-erros/total-erros.component';
import { MediaSubmissoesAcertoComponent } from './media-submissoes-acerto/media-submissoes-acerto.component';
import { TotalExecucoesComponent } from './total-execucoes/total-execucoes.component';
import { TempoOnlineComponent } from './tempo-online/tempo-online.component';
import { TentativaQuestoesComponent } from './tentativa-questoes/tentativa-questoes.component';
import { TableModule } from 'primeng/table';
import { SrlModule } from '../srl/srl.module';
import { ExportarDadosAnalyticsComponent } from './exportar-dados-analytics/exportar-dados-analytics.component';
import { DadosAnalyticsComponent } from './dados-analytics/dados-analytics.component';
import { AnalyticsTurmaComponent } from './analytics-turma/analytics-turma.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CardErrosProgramacaoDoughnutComponent } from './card-erros-programacao-doughnut/card-erros-programacao-doughnut.component';
import { CardErrosProgramacaoPizzaComponent } from './card-erros-programacao-pizza/card-erros-programacao-pizza.component';
import { CardHistoricoErrosComponent } from './card-historico-erros/card-historico-erros.component';
import { RiscoEstudanteComponent } from './card-risco-estudante/card-risco-estudante.component';
import { DesempenhoAssuntosComponent } from './desempenho-assuntos/desempenho-assuntos.component';
import { GraficoPizzaErrosConceitos } from './grafico-pizza-erros-conceitos/grafico-pizza-erros-conceitos.component';

@NgModule({
  declarations: [
    DadosAnalyticsComponent,
    ProgessoGeralComponent,
    ProgressoQuestoesAbertasComponent,
    ProgressoQuestoesFechadasComponent,
    PercentualVisualizacaoQuestoesComponent,
    TotalErrosComponent,
    MediaSubmissoesAcertoComponent,
    TotalExecucoesComponent,
    TempoOnlineComponent,
    TentativaQuestoesComponent,
    ExportarDadosAnalyticsComponent,
    AnalyticsTurmaComponent,
    GraficoPizzaErrosConceitos,
CardErrosProgramacaoPizzaComponent,
CardHistoricoErrosComponent,
RiscoEstudanteComponent,
CardErrosProgramacaoDoughnutComponent,
DesempenhoAssuntosComponent,
  ],
  imports: [FormsModule, CommonModule, ProgressBarModule, TableModule, DropdownModule, CardModule, ChartModule],
  exports: [DadosAnalyticsComponent, AnalyticsTurmaComponent, ExportarDadosAnalyticsComponent, DesempenhoAssuntosComponent],
})
export class AnalyticsModule {}
