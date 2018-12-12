import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class CategoryService {

    userId: any;
    constructor(private httpClient: HttpClient) {
        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    }

    getCategoryList(){
        return this.httpClient.get(`${environment.API_URL}/category/`);
    }

    getCategories(){
        return this.httpClient.get(`${environment.API_URL}/category/all`);
    }

    addCateogory(filter){
        filter.createdBy = this.userId;
        return this.httpClient.post(`${environment.API_URL}/category/create`, filter);
    }

    updateCategory(id, data){
        data.id = id;
        return this.httpClient.post(`${environment.API_URL}/category/edit`, data)
    }

    modifyStatus(id){
        return this.httpClient.post(`${environment.API_URL}/category/status-modify`, {id: id})
    }

    deleteCateogory(id){
        return this.httpClient.post(`${environment.API_URL}/category/delete`, {id: id})
    }

    getCategoryFilterList(){
        return this.httpClient.get(`${environment.API_URL}/filter/category-filters`)
    }
}