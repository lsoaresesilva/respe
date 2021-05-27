import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarEstudantesComponent } from './login-module/cadastrar-estudantes/cadastrar-estudantes.component';
import { LoginComponent } from './login-module/login/login.component';
/* import { MainComponent } from './geral-module/main/main.component';
import { AutoReflexaoComponent } from './srl/auto-reflexao/auto-reflexao.component';
import { AuthGuard } from './guards/auth.guard';
import { PaginaNaoEncontradaComponent } from './geral-module/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ResponderQuestaoProgramacao } from './juiz/editor/responder-questao-programacao/responder-questao-programacao.component';
import { ComentariosCodigoComponent } from './cscl/comentarios-codigo/comentarios-codigo';
import { VisualizarConteudoComponent } from './cscl/visualizar-conteudo/visualizar-conteudo.component';
import { CadastrarQuestoesComponent } from './juiz/cadastrar-questoes/cadastrar-questoes.component';
import { CadastrarTesteCaseComponent } from './juiz/cadastrar-teste-case/cadastrar-teste-case.component';
import { ListarQuestoesComponent } from './juiz/listar-questoes/listar-questoes.component';
import { ListarEstudantesComponent } from './turma/listar-estudantes/listar-estudantes.component';
import { CadastrarTurmaComponent } from './turma/cadastrar-turma/cadastrar-turma.component';
import { ListarTurmaComponent } from './turma/listar-turma/listar-turma.component';
import { CadastrarAssuntosComponent } from './juiz/cadastrar-assuntos/cadastrar-assuntos.component';
import { ListarAssuntosComponent } from './juiz/listar-assuntos/listar-assuntos.component';
import { VisualizarAssuntoComponent } from './juiz/visualizar-assunto/visualizar-assunto.component';
import { CadastrarQuestoesFechadasComponent } from './juiz/cadastrar-questoes-fechadas/cadastrar-questoes-fechadas.component';
import { VisualizarQuestaoFechadaComponent } from './juiz/visualizar-questao-fechada/visualizar-questao-fechada.component';
import { ListarQuestoesFechadasComponent } from './juiz/listar-questoes-fechadas/listar-questoes-fechadas.component';
import { EscolherQuestaoComponent } from './juiz/escolher-questao/escolher-questao.component';
import { CadastrarAlternativasComponent } from './juiz/cadastrar-alternativas/cadastrar-alternativas.component';

import { VisualizarQuestaoComponent } from './shared/visualizar-questao/visualizar-questao.component';
import { SelfInstructionComponent } from './srl/planejamento/self-instruction/self-instruction.component';
import { VisualizarSubmissaoQuestaoComponent } from './cscl/visualizar-submissao-questao/visualizar-submissao-questao.component';
import { ListarEstudantesSubmissaoComponent } from './cscl/listar-estudantes-submissao/listar-estudantes-submissao.component';
import { RespostaSimilarQuestaoProgramacaoComponent } from './srl/monitoramento/resposta-similar-questao-programacao/resposta-similar-questao-programacao.component';
import { ExibirSolucaoComponent } from './srl/monitoramento/exibir-solucao/exibir-solucao.component';
import { VisualizarTurmaComponent } from './turma/visualizar-turma/visualizar-turma.component';
import { CadastrarPostagemComponent } from './cscl/cadastrar-postagem/cadastrar-postagem.component';
import { ListarPostagensComponent } from './cscl/listar-postagens/listar-postagens.component';
import { VisualizarPostagemComponent } from './cscl/visualizar-postagem/visualizar-postagem.component';
import { TurmaGuard } from './guards/acessoTurma.guard';
import { VisualizarPerfilEstudanteComponent } from './turma/visualizar-perfil-estudante/visualizar-perfil-estudante.component';
import { CadastrarEstudantesComponent } from './login-module/cadastrar-estudantes/cadastrar-estudantes.component';
import { AcompanharDesempenhoComponent } from './srl/monitoramento/acompanhar-desempenho/acompanhar-desempenho.component';
import { EnvioMaterialComponent } from './turma/envio-material/envio-material.component';
import { PreTesteComponent } from './experimento/pre-teste/pre-teste.component';
import { EnviarMaterialComponent } from './turma/enviar-material/enviar-material.component';
import { ListarMateriaisComponent } from './turma/listar-materiais/listar-materiais.component';
import { SubsecaoComponent } from './livro/subsecao/subsecao.component';
import { ExperimentoGuard } from './guards/experimento.guard';
import { AdminGuard } from './guards/admin.guard';
import { ProfessorGuard } from './guards/professor.guard';
import { EditorComponent } from './game-based-learning/editor/editor.component';
import { PageTrack } from './guards/pageTrack.guard';
import { VisualizarParsonComponent } from './parson-problem/visualizar-parson/visualizar-parson.component';
import { RankingComponent } from './gamification/ranking/ranking.component';
import { ListarAssuntosAdminComponent } from './admin/listar-assuntos-admin/listar-assuntos-admin.component';
import { VisualizarAssuntoAdminComponent } from './admin/visualizar-assunto-admin/visualizar-assunto-admin.component';
import { AnalyticsTurmaComponent } from './analytics-module/analytics-turma/analytics-turma.component';
import { CadastrarParsonComponent } from './parson-problem/cadastrar-parson/cadastrar-parson.component';
import { EstatisticasExperimentoComponent } from './turma/estatisticas-experimento/estatisticas-experimento.component';
import { CriacaoGrupoComponent } from './cscl/criacao-grupo/criacao-grupo.component';
import { ListarAtividadesGrupoComponent } from './cscl/listar-atividades-grupo/listar-atividades-grupo.component';
import { EditorProgramacaoComponent } from './juiz/editor/editor-programacao/editor-programacao.component';
import { ListagemDiarioComponent } from './srl/monitoramento/listagem-diario/listagem-diario.component';
import { VisualizacaoDiarioComponent } from './srl/monitoramento/visualizacao-diario/visualizacao-diario.component';
import { ListarAtividadesGrupoProfessorComponent } from './cscl/listar-atividades-grupo-professor/listar-atividades-grupo-professor.component';
import { VisualizarAtividadeGrupoProfessorComponent } from './cscl/visualizar-atividade-grupo-professor/visualizar-atividade-grupo-professor.component';
import { VisualizarSolucoesAtividadeGrupoComponent } from './cscl/visualizar-solucoes-atividade-grupo/visualizar-solucoes-atividade-grupo.component';
import { ExportarDadosComponent } from './admin/exportar-dados/exportar-dados.component';
import { ListarDiariosComponent } from './turma/listar-diarios/listar-diarios.component';
import { ExportarDadosAnalyticsComponent } from './analytics-module/exportar-dados-analytics/exportar-dados-analytics.component';
import { EditorDocumentacaoProjetoComponent } from './cscl/editor-documentacao-projeto/editor-documentacao-projeto.component';
import { ListarVideosComponent } from './sistema-aprendizagem/listar-videos/listar-videos.component';
import { VisualizarVideoComponent } from './sistema-aprendizagem/visualizar-video/visualizar-video.component';
import { EditorIndependenteComponent } from './juiz/editor/editor-independente/editor-independente.component';
import { ModificarGrupoComponent } from './cscl/modificar-grupo/modificar-grupo.component';
import { CriarFrequenciaComponent } from './cscl/criar-frequencia/criar-frequencia.component';
import { PreencherFrequenciaComponent } from './login-module/preencher-frequencia/preencher-frequencia.component';
import { VisualizarChatComponent } from './cscl/visualizar-chat/visualizar-chat.component'; */

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

      {
        path: 'responder-questao-correcao/:assuntoId/:questaoCorrecaoId',
        component: ResponderQuestaoProgramacao,
        canActivate: [AuthGuard, PageTrack],
        outlet: 'principal',
      },

      {
        path: 'visualizar-parson',
        component: VisualizarParsonComponent,
        outlet: 'principal',
        canActivate: [AuthGuard, PageTrack],
      },

      
      

      

       // Sistema aprendizagem

       


      // CSCL

      
     
      {
        path: 'listar-postagens/:codigoTurma',
        component: ListarPostagensComponent,
        canActivate: [AuthGuard, PageTrack],
        outlet: 'principal',
      },
      

      {
        path: 'visualizar-chat/:atividadeGrupoId/:grupoId',
        component: VisualizarChatComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },

      

      {
        path: 'criar-frequencia',
        component: CriarFrequenciaComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },

      

      {
        path: 'modificar-grupo/:atividadeGrupoId/:grupoId',
        component: ModificarGrupoComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },

      {
        path: 'visualizar-documentacao-projeto/:atividadeGrupoId/:grupoId/:assuntoId/:questaoId',
        component: EditorDocumentacaoProjetoComponent,
        canActivate: [AuthGuard, PageTrack],
        outlet: 'principal',
      },

      

      {
        path: 'listagem-atividades-grupo-professor',
        component: ListarAtividadesGrupoProfessorComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },

      {
        path: 'visualizacao-atividade-grupo-professor/:id',
        component: VisualizarAtividadeGrupoProfessorComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },

      {
        path: 'visualizacao-solucao-atividade-grupo/:atividadeGrupoId/:grupoId',
        component: VisualizarSolucoesAtividadeGrupoComponent,
        canActivate: [AuthGuard, PageTrack, ProfessorGuard],
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
     

      
      
      {
        path: 'self-instruction-editor/:assuntoId/:questaoId',
        component: SelfInstructionComponent,
        canActivate: [AuthGuard, ExperimentoGuard, PageTrack],
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
        path: 'listagem-estudantes/:codigoTurma',
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
        path: 'exportar-dados',
        component: ExportarDadosComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },
      
      {
        path: 'listagem-diarios-professor',
        component: ListarDiariosComponent,
        outlet: 'principal',
        canActivate: [AuthGuard, ProfessorGuard],
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
        path: 'visualizar-submissao-questao/:submissaoId/:isAtividadeGrupo',
        component: VisualizarSubmissaoQuestaoComponent,
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
        path: 'visualizacao-estudante/:id',
        component: VisualizarPerfilEstudanteComponent,
        canActivate: [AuthGuard, PageTrack],
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
 /*  {
    path: 'preencher-frequencia/:codigoTurma/:frequenciaId',
    component: PreencherFrequenciaComponent
  },

  
  { path: 'cadastro-estudante/:email/:nome', component: CadastrarEstudantesComponent }, */
  /* { path: '**', component: PaginaNaoEncontradaComponent }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
