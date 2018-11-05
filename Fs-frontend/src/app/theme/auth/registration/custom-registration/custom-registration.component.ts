import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-basic-reg',
  templateUrl: './custom-registration.component.html',
  styleUrls: ['./custom-registration.component.scss']
})
export class CustomRegistrationComponent implements OnInit {

  signupForm: FormGroup;

constructor(private authService: AuthService){

}

ngOnInit(){

  this.createSignupForm();

}

createSignupForm(){
  this.signupForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })
}

onSubmit(){
  // console.log("this form value", this.signupForm.value)
  this.authService.signupUser(this.signupForm.value).subscribe((response: HttpResponse<any>) => {
    console.log("response is", response)
  })
}

}
