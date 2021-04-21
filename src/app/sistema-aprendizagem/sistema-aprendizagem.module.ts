import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarVideosComponent } from './listar-videos/listar-videos.component';
import { TableModule } from 'primeng/table';
import { VisualizarVideoComponent } from './visualizar-video/visualizar-video.component';



@NgModule({
  declarations: [ListarVideosComponent, VisualizarVideoComponent],
  imports: [
    CommonModule,
    TableModule
  ]
})
export class SistemaAprendizagemModule { }
