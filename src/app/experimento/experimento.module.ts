import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreTesteComponent } from './pre-teste/pre-teste.component';
import { QuestaoComponent } from './questao/questao.component';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule, RadioButtonModule } from 'primeng/primeng';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [PreTesteComponent, QuestaoComponent],
  imports: [
    CommonModule,
    ButtonModule,
    FieldsetModule,
    RadioButtonModule,
    DialogModule
  ],
  exports: [PreTesteComponent]
})
export class ExperimentoModule { }
