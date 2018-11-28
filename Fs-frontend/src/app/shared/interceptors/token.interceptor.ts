import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { OnInit, Injectable } from '@angular/core';

@Injectable()


export class TokenIterceptor implements HttpInterceptor, OnInit {
    token: String;
    constructor(){
    
    }

    ngOnInit(){
        this.token = localStorage.getItem('token');
        console.log("token", this.token)
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const apiReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${this.token}`)
        })

        return next.handle(apiReq);
    }
}