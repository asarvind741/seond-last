import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './auth.service';


@Injectable()

export class AuthGuardService implements CanActivate {
    constructor(
        private authService: AuthenticationService,
        private router: Router
        ){}

    canActivate(
        next: ActivatedRouteSnapshot, 
        state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
            if(this.authService.isLoggedIn){
                return true;
            }
            else {
                this.router.navigate(['/']);
                return false;
            }
        
    }

    canLoad(
        next: ActivatedRouteSnapshot, 
        state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean {
            if(this.authService.isLoggedIn){
                return true;
            }
            else {
                this.router.navigate(['/']);
                return false;
            }
        
    }

    can

}