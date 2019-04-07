import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanejamentoService } from './planejamento.service';
import { SelfInstructionComponent } from './self-instruction/self-instruction.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [SelfInstructionComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers:[PlanejamentoService]

})
export class SrlModule { }
