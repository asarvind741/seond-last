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

    getPlansByRole(role) {
        return this.httpClient.get(`${environment.API_URL}/plan/by-role/${role}`);
    }

    getUserPlans(){
        return this.httpClient.get(`${environment.API_URL}/plan/get-user-plans`)
    }

    getPlan(id){
        return this.httpClient.get(`${environment.API_URL}/plan/${id}`)
    }

    addPlan(plan){
        plan.createdBy = this.userId;
        return this.httpClient.post(`${environment.API_URL}/plan/create`, plan);
    }

    updatePlan(id, data){
        data.id = id;
        return this.httpClient.post(`${environment.API_URL}/plan/edit`, data)
    }

    modifyStatus(id){
        return this.httpClient.post(`${environment.API_URL}/plan/status-modify`, {id: id})
    }

    deleteSubscription(id){
        return this.httpClient.post(`${environment.API_URL}/plan/delete`, {id: id})
    }

    changePlan(companyId, subscriptionId){
        let data = {
            companyId: companyId,
            subscriptionId: subscriptionId
        }
        return this.httpClient.post(`${environment.API_URL}/company/plan/change`, data);
    }


}