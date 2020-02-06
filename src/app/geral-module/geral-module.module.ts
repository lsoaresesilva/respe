import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuEstudanteComponent } from './menu-estudante/menu-estudante.component';
import {MenubarModule} from 'primeng/menubar';
import { MenuAdmComponent } from './menu-adm/menu-adm.component';
import { MenuProfessorComponent } from './menu-professor/menu-professor.component';
import { HomeComponent } from './home/home.component';
import { ExperimentoModule } from '../experimento/experimento.module';
import { ApresentacaoService } from './apresentacao.service';


@NgModule({
  declarations: [MenuEstudanteComponent, MenuAdmComponent, MenuProfessorComponent, HomeComponent],
  imports: [
    CommonModule,
    MenubarModule,
    ExperimentoModule
  ],
  providers:[ApresentacaoService],
  exports :[MenuEstudanteComponent, MenuAdmComponent,  MenuProfessorComponent]
})
export class GeralModuleModule { }
