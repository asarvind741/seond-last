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

    getCategory(){
        return this.httpClient.get(`${environment.API_URL}/category/`);
    }

    getModules(){
        return this.httpClient.get(`${environment.API_URL}/module/`);
    }

    addModule(modules){
        console.log("module value", modules, this.httpClient.post(`${environment.API_URL}/module/create`, modules));
        return this.httpClient.post(`${environment.API_URL}/module/create`, modules);
    }

    updateModule(id, data){
        console.log("data", id, "data2", data)
        data.id = id;
        return this.httpClient.post(`${environment.API_URL}/module/edit`, data)
    }

    modifyStatus(id){
        return this.httpClient.post(`${environment.API_URL}/module/status-modify`, {id: id})
    }

    
    deleteModule(id){
        return this.httpClient.post(`${environment.API_URL}/module/delete`, { id: id})
    }
}