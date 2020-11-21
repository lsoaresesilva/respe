import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoramentoMotivacionalService } from './monitoramento-motivacional.service';
import { ConfirmationService } from 'primeng/api';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[MonitoramentoMotivacionalService, ConfirmationService]
})
export class MotivacionalModule { }
