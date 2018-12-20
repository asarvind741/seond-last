import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SearchHistoryService {

    constructor(private httpClient: HttpClient) {
    }

    saveVisitedUrl(url, id) {
        console.log("url", url)
        const data = { url: url, id: id}
        return this.httpClient.post(`${environment.API_URL}/history/url`, data);
    }

    getSearchHistoryOfUser(){
        const id = JSON.parse(localStorage.getItem('currentUser'))._id;
        return this.httpClient.get(`${environment.API_URL}/history/${id}`);
    }

}
