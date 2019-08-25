import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FirebaseConfiguracao } from 'src/environments/firebase';
import { LoginModule } from './login-module/login.module';
import { MainComponent } from './geral-module/main/main.component';
import { AnalyticsModule } from './analytics-module/analytics.module';
import { GeralModuleModule } from './geral-module/geral-module.module';
import { JuizModule } from './juiz/juiz.module';
import { SrlModule } from './srl/srl.module';
import { AuthGuard } from './guards/auth.guard';
import { CsclModule } from './cscl/cscl.module';
import { BrowserModule } from '@angular/platform-browser';
import { DocumentModule } from './model/firestore/document.module';
import { TurmaModule } from './turma/turma.module';
import { TurmaGuard } from './guards/acessoTurma.guard';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    

  ],
  imports: [
    TurmaModule,
    SrlModule,
    CsclModule,
    DocumentModule,
    GeralModuleModule,
    AnalyticsModule,
    LoginModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FirebaseConfiguracao),
    AngularFirestoreModule,
    InputTextModule,
    MenubarModule,
  ],
  providers: [AuthGuard,TurmaGuard,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

