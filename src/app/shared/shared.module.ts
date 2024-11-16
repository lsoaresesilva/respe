import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';

import { ToastModule } from 'primeng/toast';
import {BreadcrumbAssuntoComponent} from '../geral-module/breadcrumb-assunto/breadcrumb-assunto.component';
import { VisualizarQuestaoComponent } from './visualizar-questao/visualizar-questao.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VisualizarQuestaoComponent],
  imports: [CommonModule, FieldsetModule, TableModule, ToastModule, RouterModule],
  exports: [VisualizarQuestaoComponent],
})
export class CompartilhadoModule {}
