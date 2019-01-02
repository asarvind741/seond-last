import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AuthenticationService } from './auth.service';

@Injectable({
    providedIn: 'root',
})

export class UserService {

    constructor(
        private httpClient: HttpClient,
        private authService: AuthenticationService
    ) {
    }
    getUsers() {
        return this.httpClient.get(`${environment.API_URL}/user`);
    }
    getUser(id) {
        return this.httpClient.get(`${environment.API_URL}/user/${id}`)
    }
    addUser(user) {
        return this.httpClient.post(`${environment.API_URL}/user/add`, user);
    }
    updateUser(id, data) {
        data.id = id;
        return this.httpClient.post(`${environment.API_URL}/user/update`, data)
    }
    modifyStatus(id) {
        return this.httpClient.post(`${environment.API_URL}/user/modify-status`, { id: id })
    }
    deleteUser(id) {
        return this.httpClient.post(`${environment.API_URL}/user/delete`, { id: id })
    }

    addToWishList(productId) {
        let currentUserId = JSON.parse(this.authService.getCurrentUser())._id;
        let data = { userId: currentUserId, productId: productId };
        return this.httpClient.post(`${environment.API_URL}/user/add-to-wishList`, data)
    }

    getUserWishList(){
        let currentUserId = JSON.parse(this.authService.getCurrentUser())._id;
        return this.httpClient.get(`${environment.API_URL}/user/get-wishlist/${currentUserId}`)
    }

}