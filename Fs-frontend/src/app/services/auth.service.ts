import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment } from '../../environments/environment';
import { CustomRegistrationModule } from '../theme/auth/registration/custom-registration/custom-registration.module';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})



export class AuthService {

    // private tokenSubject = new Subject<any>();
     public currentLoggingUserSubject = new BehaviorSubject<any>([]);

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

    // getToken():Observable<any>{
       
    //     let token = localStorage.setItem('token', '1234')
    //    this.tokenSubject.next(token);
    //    return this.tokenSubject.asObservable();

    // }

    getToken(){
        return localStorage.getItem('token');
    }

    saveUser(user){
        localStorage.setItem('token', user.token);
        localStorage.setItem('currentUser', JSON.stringify(user))
    }

    clearToken(){
        localStorage.clear();
    }

    logoutUser(){
        localStorage.clear();
    }

    get isLoggedIn(){
        if(localStorage.getItem('token'))
        return true
        else
        return false
    }

}