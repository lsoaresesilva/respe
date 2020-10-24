import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ChartModule } from 'primeng/chart';
import { DadosEstudanteComponent } from './dados-estudante/dados-estudante.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgessoGeralComponent } from './progesso-geral/progesso-geral.component';
import { ProgressoQuestoesAbertasComponent } from './progresso-questoes-abertas/progresso-questoes-abertas.component';
import { ProgressoQuestoesFechadasComponent } from './progresso-questoes-fechadas/progresso-questoes-fechadas.component';

@NgModule({
  declarations: [DadosEstudanteComponent, ProgessoGeralComponent, ProgressoQuestoesAbertasComponent, ProgressoQuestoesFechadasComponent],
  imports: [CommonModule, ProgressBarModule],
  exports: [DadosEstudanteComponent],
})
export class AnalyticsModule {}
