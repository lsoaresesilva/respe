import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoramentoMotivacionalService } from './monitoramento-motivacional.service';
import { FelicitacoesComponent } from './felicitacoes/felicitacoes.component';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';


@NgModule({
  declarations: [FelicitacoesComponent],
  imports: [
    CommonModule,
    DynamicDialogModule
  ],
  providers:[MonitoramentoMotivacionalService, DialogService]
})
export class MotivacionalModule { }
