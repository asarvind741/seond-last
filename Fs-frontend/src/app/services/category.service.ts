import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class CategoryService {

    constructor(private httpClient: HttpClient) {

    }

    getCategoryList(){
        return this.httpClient.get(`${environment.API_URL}/category/`);
    }
}