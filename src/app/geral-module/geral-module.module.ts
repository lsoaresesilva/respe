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
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {BlockUIModule} from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockableContainerComponent } from './blockable-container/blockable-container.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [

      {
        path: 'juiz',
        loadChildren: () => import('../juiz/juiz.module').then(m => m.JuizModule),
        /* component: ListarAssuntosComponent, */
         canActivate: [AuthGuard],
        outlet: 'principal'
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
        /* component: ListarAssuntosComponent, */
         canActivate: [AuthGuard],
        outlet: 'principal'
      },
      {
        path: 'aprendizado',
        loadChildren: () => import('../sistema-aprendizagem/sistema-aprendizagem.module').then(m => m.SistemaAprendizagemModule),
        /* component: ListarAssuntosComponent, */
        canActivate: [AuthGuard],
        outlet: 'principal'
      },
      {
        path: 'cscl',
        loadChildren: () => import('../cscl/cscl.module').then(m => m.CsclModule),
        /* component: ListarAssuntosComponent, */
        canActivate: [AuthGuard],
        outlet: 'principal'
      },
      {
        path: 'gamification',
        loadChildren: () => import('../gamification/gamification.module').then(m => m.GamificationModule),
        /* component: ListarAssuntosComponent, */
        canActivate: [AuthGuard],
        outlet: 'principal'
      },
      {
        path: 'srl',
        loadChildren: () => import('../srl/srl.module').then(m => m.SrlModule),
        /* component: ListarAssuntosComponent, */
        canActivate: [AuthGuard],
        outlet: 'principal'
      },
      {
        path: 'turma',
        loadChildren: () => import('../turma/turma.module').then(m => m.TurmaModule),
        /* component: ListarAssuntosComponent, */
        canActivate: [AuthGuard],
        outlet: 'principal'
      },
      {
        path: 'experimento',
        loadChildren: () => import('../experimento/experimento.module').then(m => m.ExperimentoModule),
        /* component: ListarAssuntosComponent, */
        canActivate: [AuthGuard],
        outlet: 'principal'
      },
    ], 
    
  },
  
];

@NgModule({
  declarations: [HomeComponent, MainComponent, BlockableContainerComponent],
  imports: [
    BlockUIModule,
    ProgressSpinnerModule,
    ScrollPanelModule,
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
