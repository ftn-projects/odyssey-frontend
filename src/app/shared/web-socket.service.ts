import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import * as Stomp from 'stompjs';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    public subscribe(topic: string, subscriberId: number, callback: () => void): any {
        const stompClient = Stomp.client(environment.wsHost);

        stompClient.connect({}, (response: any) => {
            stompClient.subscribe(topic, (response: any) => {
                if (response.body == subscriberId)
                    callback();
            });
        });

        return stompClient;
    }
}


