import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubsecaoComponent } from './subsecao/subsecao.component';
import { VisualizacaoTextoComponent } from './visualizacao-texto/visualizacao-texto.component';
import { MarkedPipe } from './marked.pipe';
import { JuizModule } from '../juiz/juiz.module';
import { NavegadorSubsecaoComponent } from './navegador-subsecao/navegador-subsecao.component';
import { SumarioSubsecoesComponent } from './sumario-subsecoes/sumario-subsecoes.component';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { MenuLivroComponent } from './menu-livro/menu-livro.component';
/* import { PanelMenuModule } from 'primeng/primeng'; */
import { VisualizarLivroComponent } from './visualizar-livro/visualizar-livro.component';

import {PanelMenuModule} from 'primeng/panelmenu';

@NgModule({
  declarations: [MenuLivroComponent, SubsecaoComponent, VisualizacaoTextoComponent, MarkedPipe, NavegadorSubsecaoComponent, SumarioSubsecoesComponent, VisualizarLivroComponent],
  imports: [
    CommonModule,
    JuizModule,
    PanelMenuModule,
    SharedPipesModule
  ],
  exports:[VisualizarLivroComponent],
  providers:[]
})
export class LivroModule { }
