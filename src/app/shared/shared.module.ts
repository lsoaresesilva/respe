import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';

import { ToastModule } from 'primeng/toast';

import { VisualizarQuestaoComponent } from './visualizar-questao/visualizar-questao.component';

@NgModule({
  declarations: [VisualizarQuestaoComponent],
  imports: [CommonModule, FieldsetModule, TableModule, ToastModule],
  exports: [VisualizarQuestaoComponent],
})
export class SharedModule {}
