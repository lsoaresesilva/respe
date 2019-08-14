import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarTurmaComponent } from './visualizar-turma/visualizar-turma.component';
import { CsclModule } from '../cscl/cscl.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [VisualizarTurmaComponent],
  imports: [
    CsclModule,
    CommonModule,
    ButtonModule
    
  ],
  exports:[VisualizarTurmaComponent]
})
export class TurmaModule { }
