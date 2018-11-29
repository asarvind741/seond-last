import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class UserService {

    constructor(private httpClient: HttpClient) {

    }

    getUsers(){
        return this.httpClient.get(`${environment.API_URL}/user`);
    }

    getUser(id){
        return this.httpClient.get(`${environment.API_URL}/user/${id}`)
    }

    addUser(user){
        return this.httpClient.post(`${environment.API_URL}/user/add`, user);
    }

    updateUser(id, data){
        data.id = id;
        console.log("aaaaaaaaaaaa", data)
        // JSON.stringify(data);
        return this.httpClient.post(`${environment.API_URL}/user/update`, data)
    }

    

    modifyStatus(id){
        return this.httpClient.post(`${environment.API_URL}/user/modify-status`, {id: id})
    }

}