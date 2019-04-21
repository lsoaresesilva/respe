import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InputTextareaModule} from 'primeng/inputtextarea';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AccordionModule} from 'primeng/accordion';

import { JuizModule } from '../juiz/juiz.module';
import { FormsModule } from '@angular/forms';
import { BoxComentarioComponent } from './box-comentario/box-comentario.component';
import { BoxNovoComentarioComponent } from './box-novo-comentario/box-novo-comentario.component';
import { ComentariosCodigoComponent } from './comentarios-codigo/comentarios-codigo';
import { VisualizarConteudoComponent } from './visualizar-conteudo/visualizar-conteudo.component';

@NgModule({
  declarations: [ComentariosCodigoComponent, BoxComentarioComponent, BoxNovoComentarioComponent, VisualizarConteudoComponent],
  imports: [
    CommonModule,
    InputTextareaModule,
    DialogModule,
    ButtonModule,
    JuizModule,
    FormsModule,
    OverlayPanelModule,
    AccordionModule
  ],
  exports:[ComentariosCodigoComponent, VisualizarConteudoComponent]
})
export class CsclModule { }
