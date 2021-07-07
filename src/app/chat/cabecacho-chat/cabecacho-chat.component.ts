import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-cabecacho-chat',
  templateUrl: './cabecacho-chat.component.html',
  styleUrls: ['./cabecacho-chat.component.css']
})
export class CabecachoChatComponent implements OnChanges {

  @Input()
  grupo;

  participantes;

  constructor(private chat:ChatService) { 

    this.participantes = new BehaviorSubject([]);

    

  }

  ngOnChanges(): void {

    if(this.grupo != null){
      this.grupo.getEstudantes().subscribe(estudantes=>{
        let p = []
        estudantes.forEach(estudante => {
          if(estudante.nome != null){
            p.push({isConectado:false, nome:estudante.nome.substring(0,10), id:estudante.pk()});
          }
          
        });

        this.participantes.next(p);
        
      })

      this.chat.estudantesOnline.subscribe(estudantes=>{
        let novoArray = [];
        this.participantes.getValue().forEach(estudante => {

          // Reseta todos os status para offline
          estudantes.forEach(e => {
            estudante.isConectado = false;
          });

          // Depois atualiza a partir do dado real.
          // TODO: ver como fazer em apenas uma consulta
          estudantes.forEach(e => {
            if(estudante.id == e){
              estudante.isConectado = true;
            }
          });

          novoArray.push(estudante);
        });

        this.participantes.next(novoArray)
      }) 
    }
  }

}
