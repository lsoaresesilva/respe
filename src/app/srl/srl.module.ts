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
import {CardModule} from 'primeng/card';


import { PaginaNaoEncontradaComponent } from '../geral-module/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { RiscoEstudanteComponent } from './monitoramento/card-risco-estudante/card-risco-estudante.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { ListarPlanejamentosComponent } from './planejamento/listar-planejamentos/listar-planejamentos.component';
import { VisualizarPlanejamentoComponent } from './planejamento/vizualizar-planejamento/visualizar-planejamento.component';
import { RouterModule } from '@angular/router';
import { CheckboxModule, InputTextModule, AccordionModule, RadioButtonModule, ChartModule, ContextMenuModule, MessageService } from 'primeng/primeng';
import {FieldsetModule} from 'primeng/fieldset';
import { RespostaSimilarQuestaoProgramacaoComponent } from './monitoramento/resposta-similar-questao-programacao/resposta-similar-questao-programacao.component';
import {TreeTableModule} from 'primeng/treetable';
import { ExibirSolucaoComponent } from './monitoramento/exibir-solucao/exibir-solucao.component';
import {} from 'primeng/radiobutton';
import { JuizModule } from '../juiz/juiz.module';
import { MonitorarPlanejamentoComponent } from './monitoramento/monitorar-planejamento/monitorar-planejamento.component';
import { AcompanharDesempenhoComponent } from './monitoramento/acompanhar-desempenho/acompanhar-desempenho.component';
import { PercentualErrorQuotientComponent } from './monitoramento/percentual-error-quotient/percentual-error-quotient.component';
import { CardDesempenhoComponent } from './monitoramento/card-desempenho/card-desempenho.component';
import { CardErrosProgramacaoPizzaComponent } from './monitoramento/card-erros-programacao-pizza/card-erros-programacao-pizza.component';
import { CardHistoricoErrosComponent } from './monitoramento/card-historico-erros/card-historico-erros.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { TipsRegulacaoComponent } from './monitoramento/tips-regulacao/tips-regulacao.component';

import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { AnaliseDesempenhoEstudanteComponent } from './monitoramento/analise-desempenho-estudante/analise-desempenho-estudante.component';
import { DesempenhoAssuntosComponent } from './monitoramento/desempenho-assuntos/desempenho-assuntos.component';

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
    PercentualErrorQuotientComponent,
    CardDesempenhoComponent,
    CardErrosProgramacaoPizzaComponent,
    CardHistoricoErrosComponent,
    TipsRegulacaoComponent,
    AnaliseDesempenhoEstudanteComponent,
    DesempenhoAssuntosComponent,
  ],
  imports: [
    MessagesModule,
    MessageModule,
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
    DialogModule,
    CardModule,
    ContextMenuModule,
    SharedPipesModule
  ],
  providers:[MessageService],
  exports:[RiscoEstudanteComponent, PercentualErrorQuotientComponent, TipsRegulacaoComponent, DesempenhoAssuntosComponent]

})
export class SrlModule { }