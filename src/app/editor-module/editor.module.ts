import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorComponent } from './editor/editor.component';
import { ButtonModule } from 'primeng/button';

import { HttpClientModule } from '@angular/common/http';
import { JuizModule } from '../juiz/juiz.module';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    JuizModule,
    CommonModule,
    ButtonModule,
    HttpClientModule
  ]
})
export class EditorModule { }
