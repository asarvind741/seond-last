import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class FilterService {
    userId: any;
    constructor(private httpClient: HttpClient) {
        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    }

    getFilters(){
        return this.httpClient.get(`${environment.API_URL}/filter/`);
    }

    getFilter(id){
        return this.httpClient.get(`${environment.API_URL}/filter/${id}`)
    }

    addFilter(filter){
        filter.createdBy = this.userId;
        return this.httpClient.post(`${environment.API_URL}/filter/create`, filter);
    }

    updateFilter(id, data){
        data.id = id;
        return this.httpClient.post(`${environment.API_URL}/filter/edit`, data)
    }

    modifyStatus(id){
        return this.httpClient.post(`${environment.API_URL}/filter/status-modify`, {id: id})
    }

    deleteFilter(id){
        return this.httpClient.post(`${environment.API_URL}/filter/delete`, {id: id})
    }


}