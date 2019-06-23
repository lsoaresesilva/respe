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
import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';
import { ConteudoProgramacaoComponent } from './conteudo-programacao/conteudo-programacao.component';
import { SanitizeHtmlDirective } from '../pipes/sanitize.directive';
import { ListarSubmissaoQuestaoComponent } from './listar-submissao-questao/listar-submissao-questao.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ComentariosCodigoComponent, BoxComentarioComponent, BoxNovoComentarioComponent, VisualizarConteudoComponent, EscapeHtmlPipe, SanitizeHtmlDirective, ConteudoProgramacaoComponent, ListarSubmissaoQuestaoComponent],
  imports: [
    CommonModule,
    InputTextareaModule,
    DialogModule,
    ButtonModule,
    JuizModule,
    FormsModule,
    OverlayPanelModule,
    AccordionModule,
    TableModule
  ],

  exports:[ComentariosCodigoComponent, VisualizarConteudoComponent]
})
export class CsclModule { }
