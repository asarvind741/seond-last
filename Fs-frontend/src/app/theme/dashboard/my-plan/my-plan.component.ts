import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { CompanyService } from '../../../services/company.service';
import { AuthenticationService } from '../../../services/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-my-plan',
  templateUrl: './my-plan.component.html',
  styleUrls: ['./my-plan.component.scss']
})
export class MyPlanComponent implements OnInit {

  compnayId: String;
  currentUser: any;
  myPlan: any;
  currentPlanFeatures: any;
  errorMessage: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private authService: AuthenticationService   
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(this.authService.getCurrentUser());
    if(this.currentUser){
      this.compnayId = this.currentUser.company;
    }
    this.companyService.getUserPlan(this.compnayId)
    .subscribe((response: HttpResponse<any>) => {
      if(response.status === 200){
        this.myPlan = response['data'];
        this.currentPlanFeatures = this.myPlan.features._id.feature;
        console.log("current plan", this.currentPlanFeatures);
      }
    }, (error: HttpErrorResponse) => {
      console.log("error", error);
      this.errorMessage = error.error.message;
      this.openUnscuccessSwal();
    })
  }

  openUnscuccessSwal() {
    swal({
      title: 'Cancelled!',
      text: this.errorMessage,
      type: 'error'
    }).catch(swal.noop);
  }

  changePlan(){
    this.router.navigate(['./change'], {relativeTo: this.activatedRoute})
  }

}
