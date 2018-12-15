import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RfpService {

  constructor(private httpClient: HttpClient) {
  }

  getRfp(){
      return this.httpClient.get(`${environment.API_URL}/rfp/`);
  }

  addRfp(rfps){
      console.log("rfp value", rfps, this.httpClient.post(`${environment.API_URL}/rfp/create`, rfps));
      return this.httpClient.post(`${environment.API_URL}/rfp/create`, rfps);
  }

  updateRfp(id, data){
      console.log("data", id, "data2", data)
      data.id = id;
      return this.httpClient.post(`${environment.API_URL}/rfp/edit`, data)
  }

  modifyStatus(id){
      return this.httpClient.post(`${environment.API_URL}/rfp/status-modify`, {id: id})
  }

  
  deleteRfp(id){
      return this.httpClient.post(`${environment.API_URL}/rfp/delete`, { id: id})
  }

  
}
