import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarSubmissaoRecenteComponent } from './visualizar-submissao-recente/visualizar-submissao-recente.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'visualizar-submissao-recente/:usuarioId/:assuntoId/:questaoId',
    component: VisualizarSubmissaoRecenteComponent,
    canActivate: [AuthGuard]
  },

]

@NgModule({
  declarations: [VisualizarSubmissaoRecenteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProfessorModule { }
