import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizarTurmaComponent } from './visualizar-turma/visualizar-turma.component';
import { CsclModule } from '../cscl/cscl.module';
import { ButtonModule } from 'primeng/button';
import { CadastrarEstudantesComponent } from './cadastrar-estudantes/cadastrar-estudantes.component';
import { CadastrarTurmaComponent } from './cadastrar-turma/cadastrar-turma.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ListarEstudantesComponent } from './listar-estudantes/listar-estudantes.component';
import { TableModule } from 'primeng/table';
import { SrlModule } from '../srl/srl.module';
import { ListarTurmaComponent } from './listar-turma/listar-turma.component';
import { ListarTurmaProfessorComponent } from './listar-turma-professor/listar-turma-professor.component';
import { ListarProfessoresComponent } from './listar-professores/listar-professores.component';
import { EnvioMaterialComponent } from './envio-material/envio-material.component';
import { ListarMateriaisComponent } from './listar-materiais/listar-materiais.component';
import { FirebaseConfiguracao } from '../../environments/firebase';
import { AngularFireModule } from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FileUploadModule} from 'primeng/fileupload';
import { BrowserModule } from '@angular/platform-browser';
import {FieldsetModule} from 'primeng/fieldset';
import { EnviarMaterialComponent } from './enviar-material/enviar-material.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [EnviarMaterialComponent, ListarProfessoresComponent, ListarTurmaComponent, ListarTurmaProfessorComponent, ListarTurmaComponent, VisualizarTurmaComponent, CadastrarEstudantesComponent, CadastrarTurmaComponent, ListarEstudantesComponent, EnvioMaterialComponent, ListarMateriaisComponent],



  imports: [
    CsclModule,
    CommonModule,
    ButtonModule,
    FormsModule,
    AutoCompleteModule,
    ToastModule,
    InputTextModule,
    TableModule,
    SrlModule,
    ContextMenuModule,
    FileUploadModule,
    BrowserModule,
    AngularFireModule.initializeApp(FirebaseConfiguracao),
    AngularFireStorageModule,
    FieldsetModule,
    FileUploadModule,
    TableModule,
    CardModule,
    DropdownModule,
    DialogModule

  ],
  exports:[VisualizarTurmaComponent, ListarEstudantesComponent]
})
export class TurmaModule { }
