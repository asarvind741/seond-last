import * as io from 'socket.io-client'
import * as env from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class SocketService {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect(env.environment.API_URL)
    }
    onLogin(data: any) {
        console.log(data, 'data');
        this.socket.emit('start', data);
    }
    onNewNotification() {
        return Observable.create(observer => {
            this.socket.on('notification', msg => {
                observer.next(msg);
            });
        });
    }

}