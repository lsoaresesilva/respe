import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarEstudantesComponent } from './login-module/cadastrar-estudantes/cadastrar-estudantes.component';
import { LoginComponent } from './login-module/login/login.component';
import { PreencherFrequenciaComponent } from './login-module/preencher-frequencia/preencher-frequencia.component';

const routes: Routes = [
 /*  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [

      { path: 'subsecao', component: SubsecaoComponent, outlet: 'principal' },


      // ADMIN

      {
        path: 'atualizar-questao-fechada/:assuntoId/:questaoId',
        component: CadastrarQuestoesFechadasComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },

      {
        path: 'cadastro-questao/:assuntoId/:questaoId',
        component: CadastrarQuestoesComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },
      {
        path: 'cadastro-questao-fechada/:assuntoId',
        component: CadastrarQuestoesFechadasComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },

      {
        path: 'cadastro-questao-parson/:assuntoId',
        component: CadastrarParsonComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },

      {
        path: 'atualizacao-questao-parson/:assuntoId/:questaoId',
        component: CadastrarParsonComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },

      // FIM ADMIN

      // Turma
      {
        path: 'estatisticas-experimento/:codigoTurma',
        component: EstatisticasExperimentoComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },

      // Analytics
      {
        path: 'analytics-turma/:turmaId',
        component: AnalyticsTurmaComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },

      {
        path: 'exportar-dados/:turmaId',
        component: ExportarDadosAnalyticsComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },



      // Juiz










       // Sistema aprendizagem




      // CSCL



      {
        path: 'listar-postagens/:codigoTurma',
        component: ListarPostagensComponent,
        canActivate: [AuthGuard, PageTrack],
        outlet: 'principal',
      },












      {
        path: 'visualizar-documentacao-projeto/:atividadeGrupoId/:grupoId/:assuntoId/:questaoId',
        component: EditorDocumentacaoProjetoComponent,
        canActivate: [AuthGuard, PageTrack],
        outlet: 'principal',
      },













      // SRL






      {
        path: 'editor-game',
        component: EditorComponent,
        outlet: 'principal',

      },
      { path: 'comentario-codigo/:id', component: ComentariosCodigoComponent, outlet: 'principal' },
      { path: 'visualizarConteudo', component: VisualizarConteudoComponent, outlet: 'principal' },

      {
        path: 'srl-autoreflexao/:id',
        component: AutoReflexaoComponent,
        canActivate: [AuthGuard, ExperimentoGuard],
        outlet: 'principal',
      },






    // Turma


      {
        path: 'atualizacao-questao/:assuntoId/:questaoId',
        component: CadastrarQuestoesComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },
      {
        path: 'atualizacao-questao-fechada/:assuntoId/:questaoId',
        component: CadastrarQuestoesFechadasComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },
      {
        path: 'atualizacao-assunto/:id',
        component: CadastrarAssuntosComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },
      {
        path: 'listagem-questoes',
        component: ListarQuestoesComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },


      {
        path: 'atualizacao-estudante/:id',
        component: CadastrarEstudantesComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },
      {
        path: 'listagem-estudantes',
        component: ListarEstudantesComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },

      {
        path: 'cadastro-estudante/:codigoTurma',
        component: CadastrarEstudantesComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },
      {
        path: 'cadastro-turma',
        component: CadastrarTurmaComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },
      {
        path: 'pre-teste',
        component: PreTesteComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'atualizacao-turma/:id',
        component: CadastrarTurmaComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },





      {
        path: 'atualizacao-questao-fechada/:id',
        component: CadastrarQuestoesFechadasComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'cadastro-questao-fechada',
        component: CadastrarQuestoesFechadasComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },

      {
        path: 'listagem-questoes-fechadas',
        component: ListarQuestoesFechadasComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'escolher-questao/:assuntoId',
        component: EscolherQuestaoComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },



      {
        path: 'estudantes-questao/:assuntoId/:questaoId',
        component: ListarEstudantesSubmissaoComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'codigo-similar',
        component: RespostaSimilarQuestaoProgramacaoComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'exibir-codigo/:questaoId',
        component: ExibirSolucaoComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },



      {
        path: 'envio-material/:turmaId',
        component: EnvioMaterialComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'listar-materiais/:turmaId',
        component: ListarMateriaisComponent,
        canActivate: [AuthGuard, PageTrack],
        outlet: 'principal',
      },
      {
        path: 'visualizacao-turma/:turmaId',
        component: VisualizarTurmaComponent,
        canActivate: [AuthGuard, PageTrack],
        outlet: 'principal',
      },
      // {path:"home", component: HomeComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    ],
  }, */

  { path: '', component: LoginComponent },
  { path: 'geral', loadChildren: () => import('./geral-module/geral-module.module').then(m => m.GeralModuleModule) },
  { path: 'cadastro-estudante', component: CadastrarEstudantesComponent },
  {
    path: 'preencher-frequencia/:codigoTurma/:frequenciaId',
    component: PreencherFrequenciaComponent
  },
 /*


  { path: 'cadastro-estudante/:email/:nome', component: CadastrarEstudantesComponent }, */
  /* { path: '**', component: PaginaNaoEncontradaComponent }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
