import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestaoComponent } from './questao/questao.component';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { QuestionarioAutorregulacaoComponent } from './questionario-autorregulacao/questionario-autorregulacao.component';
import { FormsModule } from '@angular/forms';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { FieldsetModule } from 'primeng/fieldset';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AnaliseSelfInstructionComponent } from './analise-self-instruction/analise-self-instruction.component';
import { ExportComponent } from './export/export.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { TableModule } from 'primeng/table';

export const routes:Routes = [
  {
    path:'exportar-dados',
    component:ExportComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [QuestaoComponent, QuestionarioAutorregulacaoComponent, AnaliseSelfInstructionComponent, ExportComponent],
  imports: [
    RouterModule.forChild(routes),
    DialogModule,
    CommonModule,
    ButtonModule,
    FieldsetModule,
    RadioButtonModule,
    TableModule,
    FormsModule,
    ScrollPanelModule
  ],
  exports: [QuestionarioAutorregulacaoComponent, AnaliseSelfInstructionComponent]
})
export class ExperimentoModule { }
