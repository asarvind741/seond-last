import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class PlanService {
    userId: any;
    

    constructor(private httpClient: HttpClient) {
        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    }

    getPlans(){
        return this.httpClient.get(`${environment.API_URL}/plan/`);
    }

    getPlan(id){
        return this.httpClient.get(`${environment.API_URL}/plan/${id}`)
    }

    addPlan(plan){
        plan.createdBy = this.userId;
        console.log("plan value", plan, this.httpClient.post(`${environment.API_URL}/plan/create`, plan));
        return this.httpClient.post(`${environment.API_URL}/plan/create`, plan);
    }

    updatePlan(id, data){
        console.log("data", id, "data2", data)
        data.id = id;
        return this.httpClient.post(`${environment.API_URL}/plan/edit`, data)
    }

    modifyStatus(id){
        return this.httpClient.post(`${environment.API_URL}/plan/status-modify`, {id: id})
    }


}