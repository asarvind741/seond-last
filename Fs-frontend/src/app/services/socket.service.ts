import * as io from 'socket.io-client'
import * as env from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class SocketService {
    socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect(env.environment.API_URL)
        console.log('called cons twice');
    }
    onLogin(data: any) {
        console.log(data, 'data', this.socket);
        this.socket.emit('start', data);
        console.log(this.socket.id, 'this.socket.id');

    }

    onNewNotification() {

        return Observable.create(observer => {
            this.socket.on('notification', msg => {
                console.log('new notification called', observer, msg, this.socket.id);
                observer.next(msg);
            });
        });
    }

}