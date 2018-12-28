import { Component, OnInit } from '@angular/core';

import { PlanService } from '../../../../services/plan.service';
import { AuthenticationService } from '../../../../services/auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-subscription-plan',
  templateUrl: './change-subscription-plan.component.html',
  styleUrls: ['./change-subscription-plan.component.scss']
})
export class ChangeSubscriptionPlanComponent implements OnInit {
  currentUser: any;
  userRole: String;
  plans: any = [];

  constructor(
    private planService: PlanService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(this.authService.getCurrentUser());
    if(this.currentUser){
      this.userRole = this.currentUser.role;
      if(this.userRole === "Buyer"){
        this.planService.getPlansByRole('Buyer')
        .subscribe((response: HttpResponse<any>) => {
          if(response.status === 200){
            this.plans = response['data']
          }
        })
      }
      else {
        this.planService.getPlansByRole('Supplier')
        .subscribe((response: HttpResponse<any>) => {
          if(response.status === 200){
            this.plans = response['data']
          }
        })
      }
    }
  }

}
