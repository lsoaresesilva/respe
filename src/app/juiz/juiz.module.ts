import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarTestesComponent } from './visualizar-testes/visualizar-testes.component';

import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [VisualizarTestesComponent],
  imports: [
    CommonModule,
    TableModule
  ],
  exports:[
    VisualizarTestesComponent
  ]
})
export class JuizModule { }
