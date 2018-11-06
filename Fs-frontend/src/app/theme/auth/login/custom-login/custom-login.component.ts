import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-custom-login',
  templateUrl: './custom-login.component.html',
  styleUrls: ['./custom-login.component.scss']
})
export class CustomLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
    ) { }

  ngOnInit() {

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
    this.authService.loginUser(user)
    .subscribe((response:HttpResponse<any>) => {
      if(response.status === 200){
        this.router.navigate(['../one-time-password'], { relativeTo: this.activatedRoute, queryParams: user});
      }
    })
   
  }

  loginLinkedIn(){
    console.log("ssssssssss")
  }

}
