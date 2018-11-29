import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()


export class TokenIterceptor implements HttpInterceptor {
    constructor() {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('token');
        console.log("token==========>", token)
        const apiReq = req.clone({
            headers: req.headers.set('x-access-token', `${token}`)
        })

        return next.handle(apiReq);
    }
}