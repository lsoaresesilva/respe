
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



@NgModule({
  declarations: [
    AppComponent,
    MainComponent

  ],
  imports: [
    SrlModule,
    CsclModule,
    DocumentModule,
    GeralModuleModule,
    JuizModule,
    AnalyticsModule,
    LoginModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FirebaseConfiguracao),
    AngularFirestoreModule,
    InputTextModule,
    MenubarModule,//  
    JuizModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
