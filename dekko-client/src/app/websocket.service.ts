import {Injectable} from "@angular/core";

import * as Stomp from 'stompjs';
import * as SockJs from 'sockjs-client';

@Injectable()
export class WebSocketService {

    constructor() { }

    socket = new SockJs(`http://localhost:8090/socket`);
    stompClient = Stomp.over(this.socket);

    subscribe(topic: string, callback: any): void{
        let isConnected: boolean = this.stompClient.connected;
        if(isConnected){
            this.subscribeToTopic(topic, callback);
            return;
        }
        
        this.stompClient.connect({}, (frames: any)=>{
            this.subscribeToTopic(topic, callback);
        });
    }

    private subscribeToTopic(topic: string, callback: any){
        this.stompClient.subscribe(topic, (message: any) =>{
            console.log('message : ', message);
            callback(message);
        })
    }


}
