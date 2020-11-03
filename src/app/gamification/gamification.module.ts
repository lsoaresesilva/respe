import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressoProximoNivelComponent } from './progresso-proximo-nivel/progresso-proximo-nivel.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { GamificationFacade } from './gamification.service';
import { RankingComponent } from './ranking/ranking.component';
import {TableModule} from 'primeng/table';



@NgModule({
  declarations: [ProgressoProximoNivelComponent, RankingComponent],
  imports: [
    CommonModule,
    ProgressBarModule,
    TableModule
  ],
  exports:[ProgressoProximoNivelComponent, RankingComponent],
  providers:[GamificationFacade]
})
export class GamificationModule { }
