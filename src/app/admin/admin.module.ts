import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ExportarDadosComponent } from './exportar-dados/exportar-dados.component';
import {ChartModule} from 'primeng/chart';
import { ListarAssuntosAdminComponent } from './listar-assuntos-admin/listar-assuntos-admin.component';
import { VisualizarAssuntoAdminComponent } from './visualizar-assunto-admin/visualizar-assunto-admin.component';
import { CadastrarQuestoesComponent } from './cadastrar-questoes/cadastrar-questoes.component';
import { CadastrarTesteCaseComponent } from './cadastrar-teste-case/cadastrar-teste-case.component';
import { CadastrarAssuntosComponent } from './cadastrar-assuntos/cadastrar-assuntos.component';
import { CadastrarQuestoesFechadasComponent } from './cadastrar-questoes-fechadas/cadastrar-questoes-fechadas.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { CadastrarAlternativasComponent } from './cadastrar-alternativas/cadastrar-alternativas.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { VisualizarMslqComponent } from './visualizar-mslq/visualizar-mslq.component';

export const routes:Routes = [
  {
    path: 'listar-assuntos-admin',
    component: ListarAssuntosAdminComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'visualizar-assunto-admin/:id',
    component: VisualizarAssuntoAdminComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'cadastro-questao/:assuntoId',
    component: CadastrarQuestoesComponent,
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard, AdminGuard]
  },
  {
    path: 'cadastrar-assunto',
    component: CadastrarAssuntosComponent,
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard, AdminGuard]
  },
  {
    path: 'visualizar-mslq/:codigoTurma',
    component: VisualizarMslqComponent
  },
]

@NgModule({
  declarations: [ExportarDadosComponent, ListarAssuntosAdminComponent,
    VisualizarAssuntoAdminComponent,CadastrarQuestoesComponent,
    CadastrarTesteCaseComponent,CadastrarAssuntosComponent,
    CadastrarQuestoesFechadasComponent,CadastrarAlternativasComponent, VisualizarMslqComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TableModule,
    ChartModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    ContextMenuModule,
    ButtonModule,
    OrderListModule,
    CheckboxModule,
    DropdownModule
  ]
})
export class AdminModule {}
