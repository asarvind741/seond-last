import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class CouponService {

    constructor(private httpClient: HttpClient) {
    }

    getCoupons(){
        return this.httpClient.get(`${environment.API_URL}/coupon/`);
    }

    getCoupon(id){
        return this.httpClient.get(`${environment.API_URL}/coupon/${id}`)
    }

    addCoupon(coupon){
        console.log("coupon value", coupon, this.httpClient.post(`${environment.API_URL}/coupon/create`, coupon));
        return this.httpClient.post(`${environment.API_URL}/coupon/create`, coupon);
    }

    updateCoupon(id, data){
        console.log("data", id, "data2", data)
        data.id = id;
        return this.httpClient.post(`${environment.API_URL}/coupon/edit`, data)
    }

    modifyStatus(id){
        return this.httpClient.post(`${environment.API_URL}/coupon/status-modify`, {id: id})
    }


}