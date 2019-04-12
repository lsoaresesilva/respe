import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarTestesComponent } from './visualizar-testes/visualizar-testes.component';

import {TableModule} from 'primeng/table';
import { DadosQuestaoComponent } from './dados-questao/dados-questao.component';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { EditorComponent } from './editor/editor.component';

import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { AnalyticsModule } from '../analytics-module/analytics.module';

@NgModule({
  declarations: [VisualizarTestesComponent, DadosQuestaoComponent, EditorComponent],
  imports: [
    CommonModule,
    TableModule,
    CommonModule,
    ButtonModule,
    HttpClientModule,
    ProgressSpinnerModule,
    AnalyticsModule
  ],
  exports:[
    VisualizarTestesComponent,

  ]
})
export class JuizModule { }
