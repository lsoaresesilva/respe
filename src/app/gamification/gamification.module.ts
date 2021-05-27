import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressoProximoNivelComponent } from './progresso-proximo-nivel/progresso-proximo-nivel.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { GamificationFacade } from './gamification.service';
import { RankingComponent } from './ranking/ranking.component';
import {TableModule} from 'primeng/table';
import { AuthGuard } from '../guards/auth.guard';
import { PageTrack } from '../guards/pageTrack.guard';
import { RouterModule, Routes } from '@angular/router';

export const routes:Routes = [
  {
    path: 'ranking',
    component: RankingComponent,
    canActivate: [AuthGuard, PageTrack]
  },
]

@NgModule({
  declarations: [ProgressoProximoNivelComponent, RankingComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ProgressBarModule,
    TableModule
  ],
  exports:[ProgressoProximoNivelComponent, RankingComponent],
  providers:[GamificationFacade]
})
export class GamificationModule { }
