import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanejamentoService } from './planejamento.service';
import { SelfInstructionComponent } from './self-instruction/self-instruction.component';

@NgModule({
  declarations: [SelfInstructionComponent],
  imports: [
    CommonModule
  ],
  providers:[PlanejamentoService]

})
export class SrlModule { }
