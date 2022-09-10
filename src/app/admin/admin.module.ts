import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ExportarDadosComponent } from './exportar-dados/exportar-dados.component';
import { ChartModule } from 'primeng/chart';
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
import { CadastrarConceitosComponent } from './cadastrar-conceitos/cadastrar-conceitos.component';
import { SelecionarConceitosComponent } from './selecionar-conceitos/selecionar-conceitos.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ExportarDadosAnalyticsComponent } from '../analytics-module/exportar-dados-analytics/exportar-dados-analytics.component';
import { CadastrarParsonComponent } from './cadastrar-parson/cadastrar-parson.component';
import { DadosQuestaoBaseComponent } from './dados-questao-base/dados-questao-base.component';
import { CadastrarQuestaoRegexComponent } from './cadastrar-questao-regex/cadastrar-questao-regex.component';

export const routes: Routes = [
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
    path: 'exportar-dados/:turmaId',
    component: ExportarDadosAnalyticsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'atualizar-questao-fechada/:assuntoId/:questaoId',
    component: CadastrarQuestoesFechadasComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'cadastro-questao/:assuntoId',
    component: CadastrarQuestoesComponent,
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard, AdminGuard],
  },
  {
    path: 'cadastrar-questao-parson/:assuntoId',
    component: CadastrarParsonComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'atualizar-questao-parson/:assuntoId/:questaoId',
    component: CadastrarParsonComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'atualizar-questao/:assuntoId/:questaoId',
    component: CadastrarQuestoesComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'atualizar-questao-regex/:assuntoId/:questaoId',
    component: CadastrarQuestaoRegexComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'cadastrar-assunto',
    component: CadastrarAssuntosComponent,
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard, AdminGuard],
  },
  {
    path: 'cadastrar-conceito',
    component: CadastrarConceitosComponent,
    canActivate: [AuthGuard, AdminGuard],
    canLoad: [AuthGuard, AdminGuard],
  },
  {
    path: 'visualizar-mslq/:codigoTurma',
    component: VisualizarMslqComponent,
  },
  {
    path: 'exportar-dados',
    component: ExportarDadosComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
];

@NgModule({
  declarations: [
    ExportarDadosComponent,
    ListarAssuntosAdminComponent,
    VisualizarAssuntoAdminComponent,
    CadastrarQuestoesComponent,
    CadastrarTesteCaseComponent,
    CadastrarAssuntosComponent,
    CadastrarQuestoesFechadasComponent,
    CadastrarAlternativasComponent,
    VisualizarMslqComponent,
    CadastrarConceitosComponent,
    SelecionarConceitosComponent,
    CadastrarParsonComponent,
    DadosQuestaoBaseComponent,
    CadastrarQuestaoRegexComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BreadcrumbModule,
    TableModule,
    ChartModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    ContextMenuModule,
    ButtonModule,
    OrderListModule,
    CheckboxModule,
    DropdownModule,
    MultiSelectModule,
  ],
})
export class AdminModule {}
