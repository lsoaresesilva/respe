import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { HomeComponent } from './home/home.component';
import { ExperimentoModule } from '../experimento/experimento.module';
import { ApresentacaoService } from './apresentacao.service';
import { StartupService } from './startup.service';
import { SrlModule } from '../srl/srl.module';
import { GamificationModule } from '../gamification/gamification.module';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { PageTrack } from '../guards/pageTrack.guard';
import { ListarAssuntosComponent } from '../juiz/listar-assuntos/listar-assuntos.component';
import { ChatbotModule } from '../chatbot/chatbot.module';
import {ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    /* canActivate: [AuthGuard], */
    children: [
      /* 
      {
        path: 'listagem-assuntos',
        component: ListarAssuntosComponent,
        canActivate: [AuthGuard, PageTrack],
        outlet: 'principal',
      },*/
      {
        path: 'juiz',
        loadChildren: () => import('../juiz/juiz.module').then(m => m.JuizModule),
        /* component: ListarAssuntosComponent, */
        /* canActivate: [AuthGuard, PageTrack], */
        outlet: 'principal'
      },
      {
        path: 'aprendizado',
        loadChildren: () => import('../sistema-aprendizagem/sistema-aprendizagem.module').then(m => m.SistemaAprendizagemModule),
        /* component: ListarAssuntosComponent, */
        /* canActivate: [AuthGuard, PageTrack], */
        outlet: 'principal'
      },
    ], 
    
  },
  
];

@NgModule({
  declarations: [HomeComponent, MainComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    MenubarModule,
    ExperimentoModule,
    SrlModule,
    ChatbotModule,
    ButtonModule,
    GamificationModule,
    RouterModule.forChild(routes)
  ],
  providers: [ApresentacaoService, StartupService],
  exports: [MainComponent],
})
export class GeralModuleModule {}
