import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfInstructionComponent } from './planejamento/self-instruction/self-instruction.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CadastroPlanejamentoComponent } from './planejamento/cadastro-planejamento/cadastro-planejamento.component';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';

import { AutoReflexaoComponent } from './auto-reflexao/auto-reflexao.component';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import {DialogModule} from 'primeng/dialog';


import { PaginaNaoEncontradaComponent } from '../geral-module/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { RiscoEstudanteComponent } from './monitoramento/risco-estudante/risco-estudante.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { ListarPlanejamentosComponent } from './planejamento/listar-planejamentos/listar-planejamentos.component';
import { VisualizarPlanejamentoComponent } from './planejamento/vizualizar-planejamento/visualizar-planejamento.component';
import { RouterModule } from '@angular/router';
import { CheckboxModule, InputTextModule, AccordionModule, RadioButtonModule, ChartModule } from 'primeng/primeng';
import {FieldsetModule} from 'primeng/fieldset';
import { RespostaSimilarQuestaoProgramacaoComponent } from './monitoramento/resposta-similar-questao-programacao/resposta-similar-questao-programacao.component';
import {TreeTableModule} from 'primeng/treetable';
import { ExibirSolucaoComponent } from './monitoramento/exibir-solucao/exibir-solucao.component';
import {} from 'primeng/radiobutton';
import { JuizModule } from '../juiz/juiz.module';
import { MonitorarPlanejamentoComponent } from './monitoramento/monitorar-planejamento/monitorar-planejamento.component';
import { AcompanharDesempenhoComponent } from './monitoramento/acompanhar-desempenho/acompanhar-desempenho.component';
import { ErrosProgramacaoComponent } from './monitoramento/erros-programacao/erros-programacao.component';
import { PercentualErrorQuotientComponent } from './monitoramento/percentual-error-quotient/percentual-error-quotient.component';


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
    ExibirSolucaoComponent,
    MonitorarPlanejamentoComponent,
    AcompanharDesempenhoComponent,
    ErrosProgramacaoComponent,
    RiscoEstudanteComponent,
    PercentualErrorQuotientComponent
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
    ChartModule,
    DialogModule
    
    
    
    

    
  ],
  providers:[],
  exports:[RiscoEstudanteComponent, PercentualErrorQuotientComponent]

})
export class SrlModule { }