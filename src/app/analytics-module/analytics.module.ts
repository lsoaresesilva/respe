import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ProgressoComponent } from './progresso/progresso.component';

import {ChartModule} from 'primeng/chart';
import { ErrosProgramacaoComponent } from './erros-programacao/erros-programacao.component';

@NgModule({
  declarations: [ProgressoComponent, ErrosProgramacaoComponent],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    ChartModule
  ],
  exports:[ErrosProgramacaoComponent]
})
export class AnalyticsModule { }
