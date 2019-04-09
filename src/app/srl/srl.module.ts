import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule } from 'primeng/accordion';

import { SelfInstructionComponent } from './self-instruction/self-instruction.component';
import { SelecionarPlanejamentoComponent } from './selecionar-planejamento/selecionar-planejamento.component';
import { CadastroPlanejamentoComponent } from './cadastro-planejamento/cadastro-planejamento.component';

import { PlanejamentoService } from './planejamento.service';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    SelfInstructionComponent,
    SelecionarPlanejamentoComponent,
    CadastroPlanejamentoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    InputTextareaModule,
    DropdownModule,

    TableModule,
    SliderModule,
    AccordionModule,
  ],
  providers:[PlanejamentoService, MessageService]

})
export class SrlModule { }
