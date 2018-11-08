import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-login',
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss']
})
export class CustomLoginComponent implements OnInit {

  loginForm: FormGroup;
  token:any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
    ) { }

  ngOnInit() {
   
    this.token = this.authService.getToken()
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  onSubmit(){
    const user = { email: this.loginForm.value.email, password: this.loginForm.value.password };
    this.authService.currentLoggingUserSubject.next(user);
    this.authService.loginUser(user)
    .subscribe((response:HttpResponse<any>) => {
      console.log("response", response)
      if(response.status === 200){
        this.router.navigate(['../one-time-password']);
      }
    })
   
  }

}
