import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../../../../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  token: String;
  isUserVerified: Boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params['token'];
    });

    this.authService.activateUser(this.token).subscribe((response: HttpResponse<any>) => {
      console.log("sssssss", response)
      if(response.status == 200){
        this.isUserVerified = true;
        // this.toastrService.success('Thanks for registration. Please check your email for activating your account', 'Successful',
        // { timeOut: 10000, positionClass: 'toast-top-full-width', closeButton: true, toastClass: 'toast' });
        // this.router.navigate(['../../../login'], { relativeTo: this.activatedRoute});
      }
     
    })
  }

  loginScreen(){
    if(this.isUserVerified){
      this.router.navigate(['../../../login'], { relativeTo: this.activatedRoute});
    }
  }

}
