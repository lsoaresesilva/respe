import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FirebaseConfiguracao } from 'src/environments/firebase';
import { LoginModule } from './login-module/login.module';
import { MainComponent } from './geral-module/main/main.component';
import { AnalyticsModule } from './analytics-module/analytics.module';
import { EditorModule } from './editor-module/editor.module';
import { GeralModuleModule } from './geral-module/geral-module.module';
import { JuizModule } from './juiz/juiz.module';
import { DocumentModule } from './model/firestore/document.module';
import { SelecionarPlanejamentoComponent } from './planejamento-module/selecionar-planejamento/selecionar-planejamento.component';
import { CadastroPlanejamentoComponent } from './planejamento-module/cadastro-planejamento/cadastro-planejamento.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SelecionarPlanejamentoComponent,
    CadastroPlanejamentoComponent,

  ],
  imports: [
    DocumentModule,
    GeralModuleModule,
    EditorModule,
    AnalyticsModule,
    LoginModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    InputTextareaModule,
    DropdownModule,

    AngularFireModule.initializeApp(FirebaseConfiguracao),
    AngularFirestoreModule,
    InputTextModule,
    MenubarModule,
    TableModule,
    SliderModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
