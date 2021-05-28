import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarVideosComponent } from './listar-videos/listar-videos.component';
import { TableModule } from 'primeng/table';
import { VisualizarVideoComponent } from './visualizar-video/visualizar-video.component';
import { AuthGuard } from '../guards/auth.guard';
import { PageTrack } from '../guards/pageTrack.guard';
import { RouterModule, Routes } from '@angular/router';



export const routes: Routes = [
  {
    path: 'listar-videos',
    component: ListarVideosComponent,
    canActivate: [AuthGuard, PageTrack]
  },

  {
    path: 'visualizacao-video/:videoId',
    component: VisualizarVideoComponent,
    canActivate: [AuthGuard, PageTrack]
  },
];

@NgModule({
  declarations: [ListarVideosComponent, VisualizarVideoComponent],
  imports: [
    CommonModule,
    TableModule,
    RouterModule.forChild(routes)
  ]
})
export class SistemaAprendizagemModule { }
