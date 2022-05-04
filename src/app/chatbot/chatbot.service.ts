import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ChatbotService {
  public latestMessageArr:Observable<any[]>;
  public messageUpdate = new EventEmitter();
  public senderID = Math.random()
    .toString(36)
    .substr(2);
  constructor(private http: HttpClient) { }

  // Faz conecção com o RASA (reinicia a conversa --> /restart)
  public initRasaChat(url, user): Observable<any> {
    const trackerEventsUrl = url + `/conversations/${user}/tracker/events`;
    return this.http
      .post(trackerEventsUrl, {
        event: 'restart'
      })
      .pipe(
        mergeMap(() =>
          this.http.post(trackerEventsUrl, {
            event: 'action',
            name: 'action_listen'
          })
        ),
      );
  }

  // Manda as mensagens ao RASA
  // url: para se conectar ao rasa
  // user: id do user (necessário para o rasa) (estou a fazer de forma aleatória no chat-widget.component.ts)
  // message: mensagem para mandar ao RASA
    // mensagem para o error '/EXTERNAL_ERROR_MESSAGE{"error_type":"Função", "error_message":"Faltou parêntesis"}'
      // x -> Função | Condicional | Variável | Repetição (model/errors/analise-pre-compilação/enum/tipoErro.ts)
      // y -> Mensagem simplificada (model/errors/analise-pre-compilação/enum/tipoErros(...).ts)
  public sendMessage(url, user, message){//: Observable<any[]> {
    if (typeof message !== 'string') {
      let error_type = message.contexto;
      let error_message = message.mensagem;
      message = `/EXTERNAL_ERROR_MESSAGE{"error_type":"${error_type}", "error_message":"${error_message}"}`
    }
    const rasaMessageUrl = url + "/webhooks/rest/webhook";
    this.latestMessageArr = this.http
      .post<any[]>(rasaMessageUrl, {
        message,
        sender: user,
      })
      .pipe(
        map((responseMessages: any[]) =>
          responseMessages.map(m => {
            // Verifica se a resposta contém botões
            if (m["buttons"] !== undefined) {
              // Botões vêem acompanhados de texto
              if (m["text"] !== undefined) {
                return {message: m["text"], buttons: m["buttons"], type: "buttons"}
              }
              // Apenas contém butões
              else {
                return {buttons: m["buttons"], type: "buttons"}
              }
            }

            else {
              // O text é simples txt, o <code> e <code_print> foi escrito simplesmente para simbolizar
              // Verificar se o texto contém código
              if (m["text"].includes("<code>")){
                return { message: m["text"].replace("<code>", ""), type: "code" }
              }
              // Verificar se o texto contém a resposta do código
              else if (m["text"].includes("<code_print>")) {
                return { message: m["text"].replace("<code_print>", ""), type: "print" }
              }
              return {message: m["text"], type: "text"}
            }
          })
        ),
    )
    this.messageUpdate.emit();
  }
}
