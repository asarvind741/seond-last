import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})


export class CompanyService implements OnInit  {

    constructor(
        private httpClient: HttpClient
    ){

    }

    ngOnInit(){

    }

    getCompany(companyId){
        return this.httpClient.get(`${environment.API_URL}/company/${companyId}`)
    }

    updateCompany(userId, data) {
        data.id = userId;
        console.log("daaaaaaaaaaaaaa", data)
        return this.httpClient.post(`${environment.API_URL}/company/edit`, data);
    }
}