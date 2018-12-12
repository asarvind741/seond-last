import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class ProductService {

    constructor(private httpClient: HttpClient) {

    }

    getProducts(){
        return this.httpClient.get(`${environment.API_URL}/product`);
    }

    getProduct(id){
        return this.httpClient.get(`${environment.API_URL}/product/${id}`)
    }

    addProduct(product){
        return this.httpClient.post(`${environment.API_URL}/product/create`, product);
    }

    updateProduct(id, data){
        data.id = id;
        console.log("daaaaaaaaaaaaaa", data)
        return this.httpClient.post(`${environment.API_URL}/product/edit`, data)
    }

    

    modifyStatus(id){
        return this.httpClient.post(`${environment.API_URL}/product/status-modify`, {id: id})
    }

    deleteProduct(id){
        return this.httpClient.post(`${environment.API_URL}/product/delete`, {id: id})
    }

}