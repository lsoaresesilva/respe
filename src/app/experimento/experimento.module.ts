import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreTesteComponent } from './pre-teste/pre-teste.component';
import { QuestaoComponent } from './questao/questao.component';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule, RadioButtonModule } from 'primeng/primeng';
import {DialogModule} from 'primeng/dialog';
import { QuestionarioAutorregulacaoComponent } from './questionario-autorregulacao/questionario-autorregulacao.component';
import { FormsModule } from '@angular/forms';
import {ScrollPanelModule} from 'primeng/scrollpanel';

@NgModule({
  declarations: [PreTesteComponent, QuestaoComponent, QuestionarioAutorregulacaoComponent],
  imports: [
    CommonModule,
    ButtonModule,
    FieldsetModule,
    RadioButtonModule,
    DialogModule,
    FormsModule,
    ScrollPanelModule
  ],
  exports: [QuestionarioAutorregulacaoComponent]
})
export class ExperimentoModule { }
