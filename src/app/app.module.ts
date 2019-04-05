import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoreflexaoComponent } from './srl/autoreflexao/autoreflexao.component';

import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FirebaseConfiguracao } from 'src/environments/firebase';
import { LoginModule } from './login-module/login.module';
import { SubmissoesService } from './analytics-module/submissoes.service';
import { MainComponent } from './geral-module/main/main.component';
import { AnalyticsModule } from './analytics-module/analytics.module';
import { EditorModule } from './editor-module/editor.module';
import { GeralModuleModule } from './geral-module/geral-module.module';
import { JuizModule } from './juiz/juiz.module';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AutoreflexaoComponent,
    
  ],
  imports: [
    JuizModule,
    GeralModuleModule,
    EditorModule,
    AnalyticsModule,
    LoginModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    AngularFireModule.initializeApp(FirebaseConfiguracao),
    AngularFirestoreModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    MenubarModule,
    
  ],
  providers: [SubmissoesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
