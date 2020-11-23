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

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    CardModule,
    ToastModule,
    ButtonModule,
    SrlModule,
    MenubarModule,
  ],
  providers: [MessageService],
})
export class LoginModule {}
