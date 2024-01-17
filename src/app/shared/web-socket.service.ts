import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import SockJS from 'sockjs-client/dist/sockjs.js';
import * as Stomp from 'stompjs';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    public subscribe(topic: string, subscriberId: number, callback: () => void) {
        const socket = new SockJS(`${environment.wsHost}ws`)
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe(topic, (response: any) => {
                if (response.body == subscriberId)
                    callback();
            });
        });
    }
}


