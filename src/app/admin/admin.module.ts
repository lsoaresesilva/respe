import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarAssuntosAdminComponent } from './listar-assuntos-admin/listar-assuntos-admin.component';
import { VisualizarAssuntoAdminComponent } from './visualizar-assunto-admin/visualizar-assunto-admin.component';
import { TableModule } from 'primeng/table';

import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ExportarDadosComponent } from './exportar-dados/exportar-dados.component';

@NgModule({
  declarations: [ListarAssuntosAdminComponent, VisualizarAssuntoAdminComponent, ExportarDadosComponent],
  imports: [
    CommonModule,
    TableModule,
    ToastModule,
    FormsModule,
    ContextMenuModule,
    ButtonModule,
    OrderListModule,
  ],
  exports: [ListarAssuntosAdminComponent, VisualizarAssuntoAdminComponent],
})
export class AdminModule {}
