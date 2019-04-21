import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarTestesComponent } from './visualizar-testes/visualizar-testes.component';

import {TableModule} from 'primeng/table';
import { DadosQuestaoComponent } from './dados-questao/dados-questao.component';
import { ButtonModule } from 'primeng/button';


import { HttpClientModule } from '@angular/common/http';

import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { AnalyticsModule } from '../analytics-module/analytics.module';
import { SrlModule } from '../srl/srl.module';
import { EditorProgramacaoComponent } from './editor-programacao/editor-programacao.component';

@NgModule({
  declarations: [VisualizarTestesComponent, DadosQuestaoComponent, EditorProgramacaoComponent, EditorProgramacaoComponent],
  imports: [
    CommonModule,
    TableModule,
    CommonModule,
    ButtonModule,
    HttpClientModule,
    ProgressSpinnerModule,
    AnalyticsModule,
    SrlModule
  ],
  exports:[
    VisualizarTestesComponent,
    DadosQuestaoComponent
  ]
})
export class JuizModule { }
