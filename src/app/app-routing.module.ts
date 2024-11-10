import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarEstudantesComponent } from './login-module/cadastrar-estudantes/cadastrar-estudantes.component';
import { LoginComponent } from './login-module/login/login.component';
import { PreencherFrequenciaComponent } from './login-module/preencher-frequencia/preencher-frequencia.component';

const routes: Routes = [
 
  { path: '', component: LoginComponent },
  { path: 'geral', loadChildren: () => import('./geral-module/geral-module.module').then(m => m.GeralModuleModule) },
  { path: 'cadastro-estudante', component: CadastrarEstudantesComponent },
  {
    path: 'preencher-frequencia/:codigoTurma/:frequenciaId',
    component: PreencherFrequenciaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
