import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarTurmaComponent } from './visualizar-turma/visualizar-turma.component';
import { CsclModule } from '../cscl/cscl.module';
import { ButtonModule } from 'primeng/button';
import { EnviarMaterialComponent } from './enviar-material/enviar-material.component';
import {FileUploadModule} from 'primeng/fileupload';
import { ListarMateriaisComponent } from './listar-materiais/listar-materiais.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [VisualizarTurmaComponent, EnviarMaterialComponent, ListarMateriaisComponent],
  imports: [
    CsclModule,
    CommonModule,
    ButtonModule,
    FileUploadModule,
    TableModule,
    
  ],
  exports:[VisualizarTurmaComponent]
})
export class TurmaModule { }
