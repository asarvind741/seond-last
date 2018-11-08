import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-two-factor-authentication',
  templateUrl: './two-factor-authentication.component.html',
  styleUrls: ['./two-factor-authentication.component.scss']
})
export class TwoFactorAuthenticationComponent implements OnInit {
   otp: Number;
   user: Object;
   userSubscription: Subscription;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.currentLoggingUserSubject.subscribe((user) => {
      this.user = user;
    })
  }

  verifyUser(){
    this.authService.authenticateUser(this.otp, this.user)
    .subscribe((response: HttpResponse<any>) => {
      console.log(this.activatedRoute.parent)
      if(response.status === 206){
        this.authService.saveUser(response['data']);
        this.router.navigate(['../dashboard/dashboard/default'], {relativeTo: this.activatedRoute});
      }
      else if(response.status === 200){
        this.authService.saveUser(response['data']);
        this.router.navigate(['../dashboard/dashboard/default'], { relativeTo: this.activatedRoute})
      }
    })
  }

}
