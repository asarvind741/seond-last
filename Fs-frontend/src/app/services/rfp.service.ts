import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RfpService {
    Image: File;
    headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'multipart/form-data');
    }

    getRfp() {
        return this.httpClient.get(`${environment.API_URL}/rfp/`);
    }

    addRfp(rfps) {
        return this.httpClient.post(`${environment.API_URL}/rfp/create`, rfps);
    }

    updateRfp(id, data) {
        console.log("data", id, "data2", data)
        data.id = id;
        return this.httpClient.post(`${environment.API_URL}/rfp/edit`, data)
    }

    modifyStatus(id) {
        return this.httpClient.post(`${environment.API_URL}/rfp/status-modify`, { id: id })
    }


    deleteRfp(id) {
        return this.httpClient.post(`${environment.API_URL}/rfp/delete`, { id: id })
    }

    uploadDoc(file) {
        this.Image = file;
        let formData = new FormData();
        formData.append('image', this.Image);
        let body = formData;
        return this.httpClient.post(`${environment.API_URL}/image`, body)
    }

}
