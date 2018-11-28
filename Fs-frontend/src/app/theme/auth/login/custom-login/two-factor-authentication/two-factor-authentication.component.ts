import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../../../services/auth.service';
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
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.currentLoggingUserSubject.subscribe((user) => {
      this.user = user;
    })
  }

  verifyUser(){
    this.authService.authenticateUser(this.otp, this.user)
    .subscribe((response: HttpResponse<any>) => {
      if(response.status === 206){
        this.authService.saveUser(response['data']);
        this.router.navigate(['../dashboard/default'], {relativeTo: this.activatedRoute});
      }
      else if(response.status === 200){
        this.authService.saveUser(response['data']);
        this.router.navigate(['../dashboard/default'], { relativeTo: this.activatedRoute})
      }
    })
  }

}
