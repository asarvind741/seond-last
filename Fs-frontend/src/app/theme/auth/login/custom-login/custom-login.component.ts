import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import {
  AuthService,
  SocialUser,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from 'ng4-social-login';
import { AuthenticationService } from '../../../../services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-custom-login',
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss']
})
export class CustomLoginComponent implements OnInit {

  loginForm: FormGroup;
  token: any;
  isLoggedIn: boolean;
  socialUser: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private toastrService: ToastrService,
    private socialAuthService: AuthService
  ) { }

  ngOnInit() {

    this.token = this.authService.getToken();
    if (this.token) {
      this.router.navigate(['/dashboard/default'])
    }
    this.createLoginForm();

  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    const user = { email: this.loginForm.value.email, password: this.loginForm.value.password };
    this.authService.currentLoggingUserSubject.next(user);
    this.authService.loginUser(user)
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.router.navigate(['../one-time-password']);
        }
      }, (error) => {
        const err = error.error.message;
        this.toastrService.error(err, 'Error');
      })

  }

  signInWithLinkedIn() {
    this.socialAuthService.signIn(LinkedinLoginProvider.PROVIDER_ID)
      .then(userData => {
        console.log("use", userData)
        this.socialUser = userData;
        this.authService.socialLogin(this.socialUser.token, this.socialUser.provider, this.socialUser.email, this.socialUser.name)
          .subscribe((response: HttpResponse<any>) => {
            console.log("response is", response)
            if (response.status == 200) {
              this.authService.saveUser(response['data']);
              this.router.navigate(['/dashboard//default']);
            }
            else if (response.status == 206) {
              this.authService.saveUser(response['data']);
              this.router.navigate(['./dashboard/default']);
            }
          }, (error) => {
            const err = error.error.message;
            this.toastrService.error(err, 'Error');
          })
      })
      .catch(error => {
        console.log("error occured")
      })

  }

}
