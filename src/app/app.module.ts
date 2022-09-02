import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { AnalyticsModule } from './analytics-module/analytics.module';
import { GeralModuleModule } from './geral-module/geral-module.module';
import { JuizModule } from './juiz/juiz.module';
import { SrlModule } from './srl/srl.module';
import { DocumentModule } from './model/firestore/document.module';
import { TurmaModule } from './turma/turma.module';
import { ExperimentoModule } from './experimento/experimento.module';

import { SharedPipesModule } from './pipes/shared-pipes.module';
import { GameBasedLearningModule } from './game-based-learning/game-based-learning.module';
import { ParsonProblemModule } from './parson-problem/parson-problem.module';
import { GamificationModule } from './gamification/gamification.module';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { AdminModule } from './admin/admin.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { CsclModule } from './cscl/cscl.module';

import { LivroModule } from './livro/livro.module';
import { SistemaAprendizagemModule } from './sistema-aprendizagem/sistema-aprendizagem.module'; */

import { LoginModule } from './login-module/login.module';/*
import { MainComponent } from './geral-module/main/main.component'; */

import { AuthGuard } from './guards/auth.guard';

import { BrowserModule } from '@angular/platform-browser';
import { TurmaGuard } from './guards/acessoTurma.guard';
import { MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';

import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocumentModule } from './model/firestore/document.module';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [AppComponent /* , MainComponent */],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ProgressSpinnerModule,
        LoginModule,
        ToastModule,
        DocumentModule,
        AppRoutingModule
    ],
    providers: [AuthGuard, TurmaGuard, MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
