import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ProgressoComponent } from './progresso/progresso.component';

import {ChartModule} from 'primeng/chart';

@NgModule({
  declarations: [ProgressoComponent],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    ChartModule
  ]
})
export class AnalyticsModule { }
