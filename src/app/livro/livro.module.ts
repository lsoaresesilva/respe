import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubsecaoComponent } from './subsecao/subsecao.component';
import { VisualizacaoTextoComponent } from './visualizacao-texto/visualizacao-texto.component';
import { MarkedPipe } from './marked.pipe';
import { JuizModule } from '../juiz/juiz.module';

@NgModule({
  declarations: [SubsecaoComponent, VisualizacaoTextoComponent, MarkedPipe],
  imports: [
    CommonModule,
    JuizModule
  ]
})
export class LivroModule { }
