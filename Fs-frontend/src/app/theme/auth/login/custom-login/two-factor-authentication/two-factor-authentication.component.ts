import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-two-factor-authentication',
  templateUrl: './two-factor-authentication.component.html',
  styleUrls: ['./two-factor-authentication.component.scss']
})
export class TwoFactorAuthenticationComponent implements OnInit {
  otp: Number;
   user: Object;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
    .subscribe((params: Params) => {
      this.user = params;
      console.log("user iusssss", this.user)
    })
  }

  verifyUser(){
    this.authService.authenticateUser(this.otp, this.user)
    .subscribe((response: HttpResponse<any>) => {
      console.log("response isssssssssssssss", response)
      if(response.status === 206){
        this.router.navigate(['/']);
      }
      else if(response.status === 200){
        this.router.navigate(['/'])
      }
    })
  }

}
