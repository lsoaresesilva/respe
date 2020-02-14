import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExperimentoModule } from './experimento/experimento.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LivroModule } from './livro/livro.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { TypeofPipe } from './pipes/typeof.pipe';





@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    MainComponent
    

  ],
  imports: [
    JuizModule,
    LivroModule,
    TurmaModule,
    ExperimentoModule,
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
    BrowserAnimationsModule,
    AngularFireAuthModule,
    //AngularFireModule.initializeApp(environment.firebase),
    SharedPipesModule

   
  ],
  providers: [AuthGuard,TurmaGuard,MessageService],
  bootstrap: [AppComponent],
  exports:[EscapeHtmlPipe, TypeofPipe]
})
export class AppModule { }

