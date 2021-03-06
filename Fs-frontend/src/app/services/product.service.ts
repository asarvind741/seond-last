import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class ProductService {
    userId: any;
    constructor(private httpClient: HttpClient) {
        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    }

    getProducts(){
        return this.httpClient.get(`${environment.API_URL}/product`);
    }

    getProduct(id){
        return this.httpClient.get(`${environment.API_URL}/product/${id}`)
    }

    addProduct(product){
        console.log("product", product);
        product.createdBy = this.userId;
        return this.httpClient.post(`${environment.API_URL}/product/create`, product);
    }

    updateProduct(id, data){
        console.log("data", data)
        data.id = id;
        return this.httpClient.post(`${environment.API_URL}/product/edit`, data)
    }

    

    modifyStatus(id){
        return this.httpClient.post(`${environment.API_URL}/product/status-modify`, {id: id})
    }

    deleteProduct(id){
        return this.httpClient.post(`${environment.API_URL}/product/delete`, {id: id})
    }

}