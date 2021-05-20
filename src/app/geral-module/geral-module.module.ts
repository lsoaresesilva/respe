import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { HomeComponent } from './home/home.component';
import { ExperimentoModule } from '../experimento/experimento.module';
import { ApresentacaoService } from './apresentacao.service';
import { StartupService } from './startup.service';
import { SrlModule } from '../srl/srl.module';
import { GamificationModule } from '../gamification/gamification.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MenubarModule, ExperimentoModule, SrlModule, GamificationModule],
  providers: [ApresentacaoService, StartupService]
})
export class GeralModuleModule {}
