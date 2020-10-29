import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarParsonComponent } from './visualizar-parson/visualizar-parson.component';
import { CardModule } from 'primeng/card';
import { OrderListModule } from 'primeng/orderlist';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [VisualizarParsonComponent],
  imports: [CommonModule, CardModule, OrderListModule, DragDropModule, ButtonModule],
  exports: [VisualizarParsonComponent],
})
export class ParsonProblemModule {}
