import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { VisualizarTestesComponent } from './visualizar-testes/visualizar-testes.component';
import {TableModule, ContextMenuRow} from 'primeng/table';
import { CadastrarQuestoesComponent } from './cadastrar-questoes/cadastrar-questoes.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {SpinnerModule} from 'primeng/spinner';
import { CadastrarTesteCaseComponent } from './cadastrar-teste-case/cadastrar-teste-case.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {CheckboxModule} from 'primeng/checkbox';
import { ListarQuestoesComponent } from './listar-questoes/listar-questoes.component';
import {MessageService} from 'primeng/api';
import { ContextMenuModule, ContextMenu, MenuItem, MenuModule } from 'primeng/primeng';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [VisualizarTestesComponent, CadastrarQuestoesComponent, CadastrarTesteCaseComponent, ListarQuestoesComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    InputTextareaModule,
    CheckboxModule,
    ContextMenuModule,
    HttpClientModule,
    
    
    
  ],
  exports:[
    VisualizarTestesComponent,
   
  ],

  providers: [MessageService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class JuizModule { }
