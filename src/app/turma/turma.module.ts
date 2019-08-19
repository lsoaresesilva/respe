import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarTurmaComponent } from './visualizar-turma/visualizar-turma.component';
import { CsclModule } from '../cscl/cscl.module';
import { ButtonModule } from 'primeng/button';
import { CadastrarEstudantesComponent } from './cadastrar-estudantes/cadastrar-estudantes.component';
import { CadastrarTurmaComponent } from './cadastrar-turma/cadastrar-turma.component';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule, InputTextModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [VisualizarTurmaComponent, CadastrarEstudantesComponent, CadastrarTurmaComponent],
  imports: [
    CsclModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    AutoCompleteModule,
    ToastModule,
    InputTextModule,
  ],
  exports:[VisualizarTurmaComponent]
})
export class TurmaModule { }
