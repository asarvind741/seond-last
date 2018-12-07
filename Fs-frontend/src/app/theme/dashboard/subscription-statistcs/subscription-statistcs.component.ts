import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { PlanService } from '../../../services/plan.service';
import * as moment from 'moment';

@Component({
  selector: '<app-subscription-statistcs></app-subscription-statistcs>',
  templateUrl: './subscription-statistcs.component.html',
  styleUrls: [
    './subscription-statistcs.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class SubscriptionStatistcsComponent implements OnInit {
  deleting: Boolean;
  showMessage: any;

  constructor(
    private planService: PlanService
  ) {
    this.getUserPlans();
  }
  search_input: string = null;
  editing = {};
  rows = [];
  temp_rows = [];
  ngOnInit() {

  }

  getUserPlans() {
    this.planService.getUserPlans()
      .subscribe(plans => {
        console.log("plans are", plans)
        this.rows = plans['data'];
        
        this.temp_rows = plans['data'];
      })
  }

  updateValue(event, cell, row) {
    this.editing[row + '-' + cell] = false;
    this.temp_rows[row][cell] = event.target.value;
    this.rows = this.temp_rows;
   this.planService.updatePlan(this.rows[row]._id,this.rows[row])
   .subscribe((response: HttpResponse<any>) => {
     if(response.status === 200){
       this.getUserPlans();
       this.openSuccessSwal();
     }
   }, (error) => {
     this.showMessage = error.error['message'];
     this.getUserPlans();
     this.openUnscuccessSwal()
   })
  }

  onSearchInputChange(val) {
    if (val) {
      val = val.toLowerCase();
      let data = this.rows;
      data = data.filter(plan => {
        if (
          plan.name ? plan.name.toLowerCase().indexOf(val) >= 0 : null ||
          plan.duration ? plan.duration.toLowerCase().indexOf(val) >= 0 : null ||
          plan.status ? plan.status.toLowerCase().indexOf(val) >= 0 : null ||
          plan.createdAt ? moment(plan.createdAt).format("MMM DD, YYYY").toLowerCase().indexOf(val) >= 0 : null
        )
          return true;
      });
      this.rows = data;
    } else this.rows = this.temp_rows;
  }

  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'Plan updated successfully!',
      type: 'success'
    }).catch(swal.noop);
  }

  openUnscuccessSwal() {
    swal({
      title: 'Cancelled!',
      text: this.showMessage,
      type: 'error'
    }).catch(swal.noop);
  }

  activateCouppon(name){
    swal({
      title: 'Are you sure?',
      text: 'You not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, activate it!',
      cancelButtonText: 'Not now!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then((result) => {
      if (result.value) {
        this.planService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.getUserPlans();
            swal(
              'Activated!',
              'Your have activated plan successfully.',
              'success'
            );
          }
        });

      } else if (result.dismiss) {
        swal(
          'Cancelled',
          'Activation request cancelled.)',
          'error'
        );
      }
    });
  }

  openSuccessCancelSwal(name) {
    this.deleting = true;
    swal({
      title: 'Are you sure?',
      text: 'You not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deactivate it!',
      cancelButtonText: 'Not now!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then((result) => {
      if (result.value) {
        this.planService.modifyStatus(name._id).subscribe((response: HttpResponse<any>) => {
          console.log(response)
          if (response.status === 200) {
            this.getUserPlans();
            swal(
              'Deactivated!',
              'Your have deactivated coupon successfully.',
              'success'
            );
          }
        });

      } else if (result.dismiss) {
        swal(
          'Cancelled',
          'Deactivation request cancelled.)',
          'error'
        );
      }
    });
    this.deleting = false;

  }

}
