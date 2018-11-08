import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-basic-reg',
  templateUrl: './custom-registration.component.html',
  styleUrls: ['./custom-registration.component.scss']
})
export class CustomRegistrationComponent implements OnInit {

  signupForm: FormGroup;
  regitered:Boolean = false;
  message:String = '';

constructor(
  private authService: AuthService){

}

ngOnInit(){

  this.createSignupForm();

}

createSignupForm(){
  this.signupForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    mobile: new FormControl(null, 
      [Validators.required, 
      Validators.maxLength(10), 
      Validators.minLength(10),
      Validators.pattern('[0-9]+')
    ]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
}

onSubmit(){
  // console.log("this form value", this.signupForm.value)
  this.authService.signupUser(this.signupForm.value).subscribe((response: HttpResponse<any>) => {
    if(response.status === 200){
      this.regitered = true;
      this.message = "Thank you for registering. Please check your email to verify your account";
      
    }
    else {
      this.regitered = false;
    }
  })
}

}
