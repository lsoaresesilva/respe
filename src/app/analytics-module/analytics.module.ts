import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import {ChartModule} from 'primeng/chart';
import { ErrosProgramacaoComponent } from '../srl/monitoramento/erros-programacao/erros-programacao.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    ChartModule
  ],
  exports:[]
})
export class AnalyticsModule { }
