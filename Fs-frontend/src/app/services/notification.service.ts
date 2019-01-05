import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class NotificationService {
    constructor(private httpClient: HttpClient) {
    }
    getNotifications(id) {
        return this.httpClient.get(`${environment.API_URL}/notification/${id}`);
    }
    readMsg(id) {
        return this.httpClient.get(`${environment.API_URL}/notification/update/${id}`);
    }
}