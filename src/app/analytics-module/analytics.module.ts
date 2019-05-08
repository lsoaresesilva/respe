import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import {ChartModule} from 'primeng/chart';
import { ErrosProgramacaoComponent } from './erros-programacao/erros-programacao.component';

@NgModule({
  declarations: [ErrosProgramacaoComponent],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    ChartModule
  ],
  exports:[ErrosProgramacaoComponent]
})
export class AnalyticsModule { }
