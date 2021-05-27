import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { config } from 'process';
import { SrlModule } from '../srl/srl.module';
import { MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CadastrarEstudantesComponent } from './cadastrar-estudantes/cadastrar-estudantes.component';
import { PreencherFrequenciaComponent } from './preencher-frequencia/preencher-frequencia.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [LoginComponent, CadastrarEstudantesComponent, PreencherFrequenciaComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule,
    DialogModule,
    DropdownModule,
    /* SrlModule, */
    MenubarModule,
  ],
  providers: [MessageService],
})
export class LoginModule {}
