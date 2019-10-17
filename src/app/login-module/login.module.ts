import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { UsuarioService } from './usuario.service';
import { FormsModule } from '@angular/forms';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule
    
  ],
  providers: [UsuarioService]
})
export class LoginModule { }
