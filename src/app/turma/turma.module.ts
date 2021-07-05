import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarTurmaComponent } from './visualizar-turma/visualizar-turma.component';
import { CsclModule } from '../cscl/cscl.module';
import { ButtonModule } from 'primeng/button';
import { CadastrarTurmaComponent } from './cadastrar-turma/cadastrar-turma.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ListarEstudantesComponent } from './listar-estudantes/listar-estudantes.component';
import { TableModule } from 'primeng/table';
import { SrlModule } from '../srl/srl.module';
import { ListarTurmaComponent } from './listar-turma/listar-turma.component';
import { ListarProfessoresComponent } from './listar-professores/listar-professores.component';
import { EnvioMaterialComponent } from './envio-material/envio-material.component';
import { ListarMateriaisComponent } from './listar-materiais/listar-materiais.component';
import { FirebaseConfiguracao } from '../../environments/firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FileUploadModule } from 'primeng/fileupload';
import { FieldsetModule } from 'primeng/fieldset';
import { EnviarMaterialComponent } from './enviar-material/enviar-material.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AnalyticsModule } from '../analytics-module/analytics.module';
import { VisualizarPerfilEstudanteComponent } from './visualizar-perfil-estudante/visualizar-perfil-estudante.component';
import { EstatisticasExperimentoComponent } from './estatisticas-experimento/estatisticas-experimento.component';
import { ChartModule } from 'primeng/chart';
import { GrafoEstudantesComponent } from './grafo-estudantes/grafo-estudantes.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { ListarDiariosComponent } from './listar-diarios/listar-diarios.component';
import { RouterModule, Routes } from '@angular/router';
import { PageTrack } from '../guards/pageTrack.guard';
import { AuthGuard } from '../guards/auth.guard';
import { ProfessorGuard } from '../guards/professor.guard';


export const routes:Routes = [

  {
    path: 'minha-turma',
    component: VisualizarTurmaComponent,
    canActivate: [AuthGuard, PageTrack],
  },
  {
    path: 'visualizacao-turma/:codigoTurma',
    component: VisualizarTurmaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listar-turmas',
    component: ListarTurmaComponent,
    canActivate: [AuthGuard, ProfessorGuard]
  },
  {
    path: 'visualizar-turma/:codigoTurma',
    component: ListarEstudantesComponent,
    canActivate: [AuthGuard, ProfessorGuard]
  },

  {
    path: 'listagem-diarios-professor',
    component: ListarDiariosComponent,
    canActivate: [AuthGuard, ProfessorGuard],
  },

  {
    path: 'visualizacao-estudante/:id',
    component: VisualizarPerfilEstudanteComponent,
    canActivate: [AuthGuard]
  },
]

@NgModule({
  declarations: [
    EnviarMaterialComponent,
    ListarProfessoresComponent,
    ListarTurmaComponent,
    VisualizarTurmaComponent,
    CadastrarTurmaComponent,
    ListarEstudantesComponent,
    EnvioMaterialComponent,
    ListarMateriaisComponent,
    VisualizarPerfilEstudanteComponent,
    EstatisticasExperimentoComponent,
    GrafoEstudantesComponent,
    ListarDiariosComponent,
  ],

  imports: [
    RouterModule.forChild(routes),
    TableModule,
    ChartModule,
    AnalyticsModule,
    CsclModule,
    NgxGraphModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    AutoCompleteModule,
    ToastModule,
    InputTextModule,
    
    SrlModule,
    ContextMenuModule,
    FileUploadModule,
    AngularFireModule.initializeApp(FirebaseConfiguracao),
    AngularFireStorageModule,
    FieldsetModule,
    CardModule,
    DropdownModule,
    DialogModule,
  ],
  exports: [
    VisualizarTurmaComponent,
    ListarEstudantesComponent,
    VisualizarPerfilEstudanteComponent,
    EstatisticasExperimentoComponent,
  ],
})
export class TurmaModule {}
