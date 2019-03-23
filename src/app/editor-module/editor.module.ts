import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorComponent } from './editor/editor.component';
import { ButtonModule } from 'primeng/button';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    ButtonModule,
    HttpClientModule
  ]
})
export class EditorModule { }
