import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class FirstInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>>{

        const authReq = req.clone({
            headers: req.headers.set('Content-type', 'application/json' )
        });

        return next.handle(authReq);
    }
}