import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ChartModule } from 'primeng/chart';
import { DadosEstudanteComponent } from './dados-estudante/dados-estudante.component';
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
import { AnalyticsTurmaComponent } from './analytics-turma/analytics-turma.component';
import { TableModule } from 'primeng/table';
import { SrlModule } from '../srl/srl.module';

@NgModule({
  declarations: [
    DadosEstudanteComponent,
    ProgessoGeralComponent,
    ProgressoQuestoesAbertasComponent,
    ProgressoQuestoesFechadasComponent,
    PercentualVisualizacaoQuestoesComponent,
    TotalErrosComponent,
    MediaSubmissoesAcertoComponent,
    TotalExecucoesComponent,
    TempoOnlineComponent,
    TentativaQuestoesComponent,
    AnalyticsTurmaComponent,
  ],
  imports: [SrlModule, CommonModule, ProgressBarModule, TableModule],
  exports: [DadosEstudanteComponent, AnalyticsTurmaComponent],
})
export class AnalyticsModule {}
