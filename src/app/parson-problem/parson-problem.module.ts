import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarParsonComponent } from '../juiz/visualizar-parson/visualizar-parson.component';
import { CardModule } from 'primeng/card';
import { OrderListModule } from 'primeng/orderlist';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { CadastrarParsonComponent } from '../juiz/cadastrar-parson/cadastrar-parson.component';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { JuizModule } from '../juiz/juiz.module';

@NgModule({
  declarations: [],
  imports: [
    JuizModule,
    CommonModule,
    CardModule,
    FieldsetModule,
    OrderListModule,
    DragDropModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    DropdownModule
  ],
  exports: [],
})
export class ParsonProblemModule {}
