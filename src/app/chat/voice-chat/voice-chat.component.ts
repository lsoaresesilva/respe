import { Component, Input, OnInit } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng"

@Component({
  selector: 'app-voice-chat',
  templateUrl: './voice-chat.component.html',
  styleUrls: ['./voice-chat.component.css']
})
export class VoiceChatComponent implements OnInit {

  client:IAgoraRTCClient;
  APPID;

  @Input()
  grupo;

  constructor() {
    this.APPID = "b0349b9646134aad89d0824ad07820e3";

   }

  ngOnInit(): void {

    this.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  }

  async entrarSala(){
    if(this.grupo != null){
      const uid = await this.client.join(this.APPID, this.grupo.id, "006b0349b9646134aad89d0824ad07820e3IACxPgORluS8j4fyin1/gWn+9vhEn2L+osui2OsMBMNzt2h7tDUAAAAAEADYCUcof1xiYAEAAQB+XGJg");
      let localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await this.client.publish([localAudioTrack]); 

    }
    
  }

}
