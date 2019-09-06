import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfInstructionComponent } from './self-instruction/self-instruction.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CadastroPlanejamentoComponent } from './cadastro-planejamento/cadastro-planejamento.component';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';

import { AutoReflexaoComponent } from './auto-reflexao/auto-reflexao.component';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';


import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { RiscoEstudanteComponent } from '../analytics-module/risco-estudante/risco-estudante.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { ListarPlanejamentosComponent } from './listar-planejamentos/listar-planejamentos.component';
import { VisualizarPlanejamentoComponent } from './vizualizar-planejamento/visualizar-planejamento.component';
import { RouterModule } from '@angular/router';
import { CheckboxModule, InputTextModule, AccordionModule, RadioButtonModule } from 'primeng/primeng';
import {FieldsetModule} from 'primeng/fieldset';
import { RespostaSimilarQuestaoProgramacaoComponent } from './resposta-similar-questao-programacao/resposta-similar-questao-programacao.component';
import {TreeTableModule} from 'primeng/treetable';
import { ExibirSolucaoComponent } from './exibir-solucao/exibir-solucao.component';
import {} from 'primeng/radiobutton';
import { JuizModule } from '../juiz/juiz.module';


@NgModule({
  declarations: [
    SelfInstructionComponent,
    CadastroPlanejamentoComponent,
    AutoReflexaoComponent,
    PaginaNaoEncontradaComponent,
    RiscoEstudanteComponent,
    ListarPlanejamentosComponent,
    VisualizarPlanejamentoComponent,
    RespostaSimilarQuestaoProgramacaoComponent,
    ExibirSolucaoComponent
  ],
  imports: [
    JuizModule,
    CommonModule,
    CheckboxModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ProgressBarModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    ToastModule,
    SliderModule,
    TabViewModule,
    ButtonModule,
    ToastModule,
    RouterModule,
    AccordionModule,
    InputTextModule,
    FieldsetModule,
    TreeTableModule,
    RadioButtonModule,
    
    
    
    
    
    

    
  ],
  providers:[],
  exports:[RiscoEstudanteComponent]

})
export class SrlModule { }