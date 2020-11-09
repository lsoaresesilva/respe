import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarParsonComponent } from './visualizar-parson/visualizar-parson.component';
import { CardModule } from 'primeng/card';
import { OrderListModule } from 'primeng/orderlist';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { CadastrarParsonComponent } from './cadastrar-parson/cadastrar-parson.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [VisualizarParsonComponent, CadastrarParsonComponent],
  imports: [
    CommonModule,
    CardModule,
    OrderListModule,
    DragDropModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    DropdownModule,
  ],
  exports: [VisualizarParsonComponent, CadastrarParsonComponent],
})
export class ParsonProblemModule {}
