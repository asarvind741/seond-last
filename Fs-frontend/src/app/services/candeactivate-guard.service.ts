import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
  }

@Injectable()

export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {

    canDeactivate(
        component: CanComponentDeactivate,
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}