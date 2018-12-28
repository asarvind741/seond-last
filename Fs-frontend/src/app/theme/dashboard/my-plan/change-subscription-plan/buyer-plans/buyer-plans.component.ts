import { Component, OnInit, Input } from '@angular/core';
import swal from 'sweetalert2';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { PlanService } from '../../../../../services/plan.service';


@Component({
  selector: 'app-buyer-plans',
  templateUrl: './buyer-plans.component.html',
  styleUrls: ['./buyer-plans.component.scss']
})
export class BuyerPlansComponent implements OnInit {

  @Input('userRole') userRole: any;
  @Input('plans') plans: any;
  @Input('currentUser') currentUser: any;
  showMessage: any;
  constructor(private planService: PlanService) { }

  ngOnInit() {
  }

  changePlan(name){
    let selectedPlan;
    this.plans.forEach(plan => {
      if(plan.name === name){
        selectedPlan = plan;
        this.planService.changePlan(this.currentUser.company, selectedPlan._id)
        .subscribe((response: HttpResponse<any>) => {
          console.log("response", response)
          if(response.status === 200){
            this.showMessage = "Plan changed succesfully";
            this.openSuccessSwal();
          }
          else {
            this.openUnscuccessSwal();
          }
        }, (error: HttpErrorResponse) => {
          this.openUnscuccessSwal();
        })
      }
    })
  }

  openUnscuccessSwal() {
    swal({
      title: 'Cancelled!',
      text: "Error Occured",
      type: 'error'
    }).catch(swal.noop);
  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: this.showMessage,
      type: 'success'
    }).catch(swal.noop);
  }
}
