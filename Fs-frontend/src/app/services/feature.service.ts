import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class FeatureService {
userId: any;
    constructor(private httpClient: HttpClient) {
        this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    }

    getFeatureListByRole(role){
        return this.httpClient.get(`${environment.API_URL}/features/role/${role}`);

    }

    getFeatures() {
        return this.httpClient.get(`${environment.API_URL}/features/`);
    }

    getFeature(id) {
        return this.httpClient.get(`${environment.API_URL}/feature/${id}`)
    }

    addFeature(feature) {
        let role = feature.role[0];
        const name = role.itemName;
        delete feature.role[0]
        feature.role = name;
        feature.createdBy = this.userId;
        return this.httpClient.post(`${environment.API_URL}/features/create`, feature);
    }

    updateFeature(id, feature) {
        feature.id = id;
        let role = feature.role[0];
        const name = role.itemName;
        delete feature.role[0]
        feature.role = name;
        return this.httpClient.post(`${environment.API_URL}/features/edit`, feature)
    }

    modifyStatus(id) {
        return this.httpClient.post(`${environment.API_URL}/features/status-modify`, { id: id })
    }


    deleteFeature(id) {
        return this.httpClient.post(`${environment.API_URL}/features/delete`, { id: id })
    }


}