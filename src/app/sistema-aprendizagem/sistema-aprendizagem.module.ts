import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarVideosComponent } from './listar-videos/listar-videos.component';
import { TableModule } from 'primeng/table';
import { VisualizarVideoComponent } from './visualizar-video/visualizar-video.component';
import { AuthGuard } from '../guards/auth.guard';
import { PageTrack } from '../guards/pageTrack.guard';
import { RouterModule, Routes } from '@angular/router';
import { ListarMateriaisSequenciaComponent } from './listar-materiais-sequencia/listar-materiais-sequencia.component';
import { TimelineModule } from 'primeng/timeline';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { VisualizarTextoComponent } from './visualizar-texto/visualizar-texto.component';
import { JuizModule } from '../juiz/juiz.module';
import { CompartilhadoModule } from '../shared/shared.module';


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
  {
    path: 'visualizacao-texto/:assuntoId/:textoId',
    component: VisualizarTextoComponent,
    canActivate: [AuthGuard, PageTrack]
  },
];

@NgModule({
  declarations: [ListarVideosComponent, VisualizarVideoComponent, ListarMateriaisSequenciaComponent, VisualizarTextoComponent],
  imports: [
    CommonModule,
    CompartilhadoModule,
    /* JuizModule, */
    TableModule,
    FormsModule,
    RouterModule.forChild(routes),
    TimelineModule,
    KnobModule
  ],
  exports:[ListarMateriaisSequenciaComponent]
})
export class SistemaAprendizagemModule { }
