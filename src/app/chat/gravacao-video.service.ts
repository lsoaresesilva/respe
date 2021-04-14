import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient } from 'agora-rtc-sdk-ng';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginService } from '../login-module/login.service';

@Injectable({
  providedIn: 'root',
})
export class GravacaoVideoService {
  customerKey;
  customerSecret;
  APPID;
  encodedCredential;
  hostname = 'https://api.agora.io';
  URL = environment.URL;
  client: IAgoraRTCClient;
  token;
  accessKey;
  secretKey;

  constructor(private http: HttpClient, private login: LoginService) {
    this.customerKey = '4aec77bf9b8543ea96d3c797f90540ee';
    this.customerSecret = 'adcb8ab089c3487885b6fb5f4cfa388c';
    this.APPID = 'b0349b9646134aad89d0824ad07820e3';
    let plainCredential = this.customerKey + ':' + this.customerSecret;
    this.encodedCredential = btoa(plainCredential);
  }

  inicializar() {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  }

  criarHeaderAutorizacao() {
    let authorizationField = 'Basic ' + this.encodedCredential;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: authorizationField,
        'Content-Type': 'application/json',
      }),
    };

    return httpOptions;
  }

  obterToken(nomeCanal, estudante) {
    if (nomeCanal != null && estudante != null && estudante.pk() != null) {
      const url = this.URL + 'token/';
      let appCertificate = '3bb78775146547fc9b764ae7c8b048fb';
      /* let uid = [...estudante.pk()].map(l=>{
        return l.charCodeAt(0);
      }).slice(0, 5).join(""); */
      let uid = 0;

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

      const json = {
        appId: this.APPID,
        appCertificate: appCertificate,
        nomeCanal: nomeCanal,
        uid: uid,
      };

      return new Observable<any>((observer) => {
        this.http.post(url, json, httpOptions).subscribe(
          (resposta) => {
            observer.next(resposta);
            observer.complete();
          },
          (err) => {
            observer.error(err);
          }
        );
      });
    }
  }

  async entrarSala(grupo) {
    if (grupo != null) {
      let dadosAcesso = await this.obterToken(grupo.id, this.login.getUsuarioLogado()).toPromise();
      if(dadosAcesso["token"] != null){
        this.token = dadosAcesso["token"];
      }

      if(dadosAcesso["accessKey"] != null){
        this.accessKey = dadosAcesso["accessKey"];
      }

      if(dadosAcesso["secretKey"] != null){
        this.secretKey = dadosAcesso["secretKey"];
      }

      let uid = await this.client.join(this.APPID, grupo.id, this.token);

      let localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await this.client.publish([localAudioTrack]);
      this.receberDadosUsuariosConectados(uid);
      return uid;
    }
  }

  receberDadosNovoUsuario() {
    this.client.on('user-published', async (user, type) => {
      await this.client.subscribe(user, type);

      if (type === 'audio') {
        // Get `RemoteAudioTrack` in the `user` object.
        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
      }
    });
  }

  receberDadosUsuariosConectados(uid) {
    this.client.remoteUsers.forEach(async (user) => {
      if (user.uid != uid) {
        await this.client.subscribe(user, 'audio');

        const remoteAudioTrack = user.audioTrack;
        // Play the audio track. No need to pass any DOM element.
        remoteAudioTrack.play();
      }
    });
  }

  obterRecurso(nomeCanal) {
    let caminho = '/v1/apps/' + this.APPID + '/cloud_recording/acquire';
    return new Observable<any>((observer) => {
      this.http
        .post(
          this.hostname + caminho,
          {
            cname: nomeCanal,
            uid: '12345',
            clientRequest: {
              resourceExpiredHour: 24,
            },
          },
          this.criarHeaderAutorizacao()
        )
        .subscribe(
          (resourceId) => {
            observer.next(resourceId);
            observer.complete();
          },
          (err) => {
            observer.error(err);
          }
        );
    });
  }

  iniciar(appid, resourceId, nomeCanal, token, mode = 'mix') {
    let caminho =
      '/v1/apps/' +
      appid +
      '/cloud_recording/resourceid/' +
      resourceId +
      '/mode/' +
      mode +
      '/start';
    let nomeCanalSemTraco = nomeCanal.split('-').join('');
    return new Observable<any>((observer) => {
      this.http
        .post(
          this.hostname + caminho,
          {
            cname: nomeCanal,
            uid: '12345',
            clientRequest: {
              token: token,
              recordingConfig: {
                maxIdleTime: 30,
                streamTypes: 0,
                audioProfile: 1,
                channelType: 0,
                videoStreamType: 1,

                subscribeUidGroup: 1,
              },
              recordingFileConfig: {
                avFileType: ['hls'],
              },
              storageConfig: {
                accessKey: this.accessKey,
                region: 1,
                bucket: '32bits',
                secretKey: this.secretKey,
                vendor: 1,
                fileNamePrefix: [nomeCanalSemTraco],
              },
            },
          },
          this.criarHeaderAutorizacao()
        )
        .subscribe(
          (resourceId) => {
            observer.next(resourceId);
            observer.complete();
          },
          (err) => {
            observer.error(err);
          }
        );
    });
  }

  gravar(nomeCanal) {
    return new Observable((observer) => {
      if (this.client.remoteUsers.length == 1) {
        this.obterRecurso(nomeCanal)
          .pipe(retry(10))
          .subscribe(
            (resposta) => {
              if (resposta.resourceId != null) {
                this.iniciar(
                  this.APPID,
                  resposta.resourceId,
                  nomeCanal,
                  this.token
                )
                  .pipe(retry(10))
                  .subscribe(
                    (respostaGravacao) => {
                      observer.next(respostaGravacao);
                      observer.complete();
                    },
                    (err) => {
                      this.desfazerConexao().then(() => {
                        observer.error();
                      });
                    }
                  );
              }
            },
            (err) => {
              this.desfazerConexao().then(() => {});
            }
          );
      }
    });
  }

  async desfazerConexao() {
    await this.client.unpublish();
    await this.client.leave();
  }
}
