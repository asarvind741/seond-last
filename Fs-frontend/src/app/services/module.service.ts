import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class ModuleService {

    constructor(private httpClient: HttpClient) {

    }

    getModuleList(){
        return this.httpClient.get(`${environment.API_URL}/module/`);
    }
}