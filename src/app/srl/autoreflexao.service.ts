import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { respostaAutoreflexao } from '../model/respostaAutoreflexao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoreflexaoService {

  static autoreflexao_srl: respostaAutoreflexao[];

  constructor() {
    AutoreflexaoService.autoreflexao_srl = [];
  }

  salvar(autoreflexao_srl: respostaAutoreflexao) {
    AutoreflexaoService.autoreflexao_srl.push(autoreflexao_srl);
    return true;
  }

}
