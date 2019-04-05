import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanejamentoService } from './planejamento.service';
import { SelfInstructionComponent } from './self-instruction/self-instruction.component';
import { AutoreflexaoComponent } from './autoreflexao/autoreflexao.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [SelfInstructionComponent, AutoreflexaoComponent],
  imports: [
    CommonModule,
    InputTextareaModule,
    ButtonModule,
  ],
  providers:[PlanejamentoService]

})
export class SrlModule { }
