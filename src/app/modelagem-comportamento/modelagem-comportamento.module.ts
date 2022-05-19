import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrafoEstudantesComponent } from './grafo-estudantes/grafo-estudantes.component';
import { MatrizTransicaoComponent } from './matriz-transicao/matriz-transicao.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';



@NgModule({
  declarations: [GrafoEstudantesComponent, MatrizTransicaoComponent],
  imports: [
    CommonModule,
    NgxGraphModule
  ],
  exports:[GrafoEstudantesComponent, MatrizTransicaoComponent]
})
export class ModelagemComportamentoModule { }
