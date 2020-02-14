import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubsecaoComponent } from './subsecao/subsecao.component';
import { VisualizacaoTextoComponent } from './visualizacao-texto/visualizacao-texto.component';
import { MarkedPipe } from './marked.pipe';
import { JuizModule } from '../juiz/juiz.module';
import { NavegadorSubsecaoComponent } from './navegador-subsecao/navegador-subsecao.component';
import { SumarioSubsecoesComponent } from './sumario-subsecoes/sumario-subsecoes.component';
import { TypeofPipe } from '../pipes/typeof.pipe';
import { SharedPipesModule } from '../pipes/shared-pipes.module';

@NgModule({
  declarations: [SubsecaoComponent, VisualizacaoTextoComponent, MarkedPipe, NavegadorSubsecaoComponent, SumarioSubsecoesComponent],
  imports: [
    CommonModule,
    JuizModule,
    SharedPipesModule
  ],
  providers:[]
})
export class LivroModule { }
