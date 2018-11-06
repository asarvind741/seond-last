import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment } from '../../environments/environment';
import { CustomRegistrationModule } from '../theme/auth/registration/custom-registration/custom-registration.module';


@Injectable({
    providedIn: 'root',
})



export class AuthService {

    constructor(private httpClient: HttpClient){

    }

    signupUser(userData){
        return this.httpClient.post(`${environment.API_URL}/user/sign-up`, userData)
    }

    activateUser(token) {
        const sendToken = { 'token': token}
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-type': 'application/json' })
        }
        return this.httpClient.post(`${environment.API_URL}/user/verify`, sendToken)
    }

    loginUser(user){
        return this.httpClient.post(`${environment.API_URL}/user/send-otp`, user)
    }

    authenticateUser(oneTimePassword, user){
        const otpVerify = { 'email': user.email, 'password': user.password, 'otp': oneTimePassword}
        return this.httpClient.post(`${environment.API_URL}/user/sign-in`, otpVerify)
    }

}