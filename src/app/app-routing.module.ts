import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login-module/login/login.component';
import { MainComponent } from './geral-module/main/main.component';
import { CadastroPlanejamentoComponent } from './srl/planejamento/cadastro-planejamento/cadastro-planejamento.component';
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
import { ListarPlanejamentosComponent } from './srl/planejamento/listar-planejamentos/listar-planejamentos.component';
import { VisualizarPlanejamentoComponent } from './srl/planejamento/vizualizar-planejamento/visualizar-planejamento.component';
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
import { CadastrarEstudantesComponent } from './turma/cadastrar-estudantes/cadastrar-estudantes.component';
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

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'editor/:assuntoId/:questaoId',
        component: ResponderQuestaoProgramacao,
        canActivate: [AuthGuard, PageTrack],
        outlet: 'principal',
      },
      { path: 'subsecao', component: SubsecaoComponent, outlet: 'principal' },
      {
        path: 'visualizar-parson',
        component: VisualizarParsonComponent,
        outlet: 'principal',
        canActivate: [AuthGuard],
      },

      /* ADMIN */
      {
        path: 'listar-assuntos-admin',
        component: ListarAssuntosAdminComponent,
        outlet: 'principal',
        canActivate: [AuthGuard],
      },
      {
        path: 'visualizar-assunto-admin/:id',
        component: VisualizarAssuntoAdminComponent,
        outlet: 'principal',
        canActivate: [AuthGuard],
      },
      {
        path: 'atualizar-questao-fechada/:assuntoId/:questaoId',
        component: CadastrarQuestoesFechadasComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },

      /* FIM ADMIN */

      /* Turma */
      {
        path: 'estatisticas-experimento/:codigoTurma',
        component: EstatisticasExperimentoComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },

      /* ANALYTICS */
      {
        path: 'analytics-turma/:turmaId',
        component: AnalyticsTurmaComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },

      /* JUIZ */

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
        path: 'visualizar-questao-parson/:assuntoId/:questaoId',
        component: VisualizarParsonComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },

      {
        path: 'atualizacao-questao-parson/:assuntoId/:questaoId',
        component: CadastrarParsonComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },

      /* CSCL */

      {
        path: 'criar-grupo',
        component: CriacaoGrupoComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },

      {
        path: 'listagem-atividades-grupo',
        component: ListarAtividadesGrupoComponent,
        canActivate: [AuthGuard, PageTrack],
        outlet: 'principal',
      },

      {
        path: 'entrar-grupo/:salaId/:assuntoId/:questaoId',
        component: ResponderQuestaoProgramacao,
        canActivate: [AuthGuard, PageTrack],
        outlet: 'principal',
      },

      /** SRL */

      {
        path: 'index',
        component: AcompanharDesempenhoComponent,
        outlet: 'principal',
        canActivate: [AuthGuard, ExperimentoGuard, PageTrack],
      },

      /** Monitoramento */
      {
        path: 'listagem-diarios',
        component: ListagemDiarioComponent,
        outlet: 'principal',
        canActivate: [AuthGuard, ExperimentoGuard, PageTrack],
      },
      {
        path: 'visualizacao-diario/:id',
        component: VisualizacaoDiarioComponent,
        outlet: 'principal',
        canActivate: [AuthGuard, ExperimentoGuard, PageTrack],
      },
      {
        path: 'meu-desempenho',
        component: AcompanharDesempenhoComponent,
        outlet: 'principal',
        canActivate: [AuthGuard, ExperimentoGuard, PageTrack],
      },
      {
        path: 'editor-game',
        component: EditorComponent,
        outlet: 'principal',
        /* canActivate: [AuthGuard, ExperimentoGuard], */
      },
      { path: 'comentario-codigo/:id', component: ComentariosCodigoComponent, outlet: 'principal' },
      { path: 'visualizarConteudo', component: VisualizarConteudoComponent, outlet: 'principal' },
      {
        path: 'visualizacao-planejamento/:id',
        component: VisualizarPlanejamentoComponent,
        canActivate: [AuthGuard, ExperimentoGuard],
        outlet: 'principal',
      },
      {
        path: 'cadastro-planejamento',
        component: CadastroPlanejamentoComponent,
        canActivate: [AuthGuard, ExperimentoGuard, PageTrack],
        outlet: 'principal',
      },
      {
        path: 'listagem-planejamento',
        component: ListarPlanejamentosComponent,
        canActivate: [AuthGuard, ExperimentoGuard],
        outlet: 'principal',
      },
      {
        path: 'srl-autoreflexao/:id',
        component: AutoReflexaoComponent,
        canActivate: [AuthGuard, ExperimentoGuard],
        outlet: 'principal',
      },
      {
        path: 'cadastro-questao/:assuntoId',
        component: CadastrarQuestoesComponent,
        canActivate: [AuthGuard, AdminGuard],
        canLoad: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },

      {
        path: 'atualizacao-planejamento/:id',
        component: CadastroPlanejamentoComponent,
        canActivate: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },
      {
        path: 'cadastro-assunto',
        component: CadastrarAssuntosComponent,
        canActivate: [AuthGuard, AdminGuard],
        canLoad: [AuthGuard, AdminGuard],
        outlet: 'principal',
      },
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
        path: 'listagem-assuntos',
        component: ListarAssuntosComponent,
        canActivate: [AuthGuard, PageTrack],
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
        path: 'listagem-turmas',
        component: ListarTurmaComponent,
        canActivate: [AuthGuard, ProfessorGuard],
        outlet: 'principal',
      },
      {
        path: 'visualizacao-questao/:assuntoId/:questaoId',
        component: VisualizarQuestaoComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'visualizacao-questao-fechada/:assuntoId/:questaoId',
        component: VisualizarQuestaoFechadaComponent,
        canActivate: [AuthGuard, PageTrack],
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
        path: 'visualizacao-questao-fechada/:id',
        component: VisualizarQuestaoFechadaComponent,
        canActivate: [AuthGuard],
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
        path: 'visualizar-submissao-questao/:submissaoId',
        component: VisualizarSubmissaoQuestaoComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'visualizacao-assunto/:id',
        component: VisualizarAssuntoComponent,
        canActivate: [AuthGuard, PageTrack],
        outlet: 'principal',
      },
      {
        path: 'ranking',
        component: RankingComponent,
        canActivate: [AuthGuard, PageTrack],
        outlet: 'principal',
      },
      {
        path: 'self-instruction/:assuntoId/:questaoId',
        component: SelfInstructionComponent,
        canActivate: [AuthGuard, ExperimentoGuard, PageTrack],
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
        path: 'visualizacao-turma/:turmaId',
        component: VisualizarTurmaComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'minha-turma',
        component: VisualizarTurmaComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'cadastrar-postagem/:turmaId/:postagemId',
        component: CadastrarPostagemComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'cadastrar-postagem/:turmaId',
        component: CadastrarPostagemComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'listar-postagens/:turmaId',
        component: ListarPostagensComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'visualizar-postagem/:postagemId/:turmaId',
        component: VisualizarPostagemComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'visualizacao-estudante/:id',
        component: VisualizarPerfilEstudanteComponent,
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
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      {
        path: 'visualizacao-turma/:turmaId',
        component: VisualizarTurmaComponent,
        canActivate: [AuthGuard],
        outlet: 'principal',
      },
      // {path:"home", component: HomeComponent, canActivate: [AuthGuard], canLoad: [AuthGuard], outlet:"principal"},
    ],
  },

  { path: '', component: LoginComponent },

  { path: 'cadastro-estudante', component: CadastrarEstudantesComponent },
  { path: 'cadastro-estudante/:email/:nome', component: CadastrarEstudantesComponent },
  { path: '**', component: PaginaNaoEncontradaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
