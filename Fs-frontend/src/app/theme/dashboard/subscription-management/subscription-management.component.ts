import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { EditSubscriptionComponent } from './edit-subscription/edit-subscription.component';
import { PlanService } from '../../../services/plan.service';
import * as moment from 'moment';

@Component({
  selector: '<app-subscription-management></app-subscription-management>',
  templateUrl: './subscription-management.component.html',
  styleUrls: [
    './subscription-management.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class SubscriptionManagementComponent implements OnInit {
  deleting: Boolean;
  showMessage: any;

  constructor(
    private planService: PlanService,
    private modalService: NgbModal
  ) {
    this.getPlans();
  }
  search_input: string = null;
  editing = {};
  rows = [];
  temp_rows = [];
  ngOnInit() {

  }

  getPlans() {
    this.planService.getPlans()
      .subscribe(plans => {
        if (plans['data'].length > 0) {
          plans['data'].forEach(plan => {
            plan.createdBy = plan.createdBy.email;
          })
          this.rows = plans['data'];

          this.temp_rows = plans['data'];
        }
      })
  }

  updateValue(event, cell, row) {
    this.editing[row + '-' + cell] = false;
    this.temp_rows[row][cell] = event.target.value;
    this.rows = this.temp_rows;
    this.planService.updatePlan(this.rows[row]._id, this.rows[row])
      .subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.getPlans();
          this.openSuccessSwal();
        }
      }, (error) => {
        this.showMessage = error.error['message'];
        this.getPlans();
        this.openUnscuccessSwal()
      })
  }

  onSearchInputChange(val) {
    if (val) {
      val = val.toLowerCase();
      let data = this.temp_rows;
      data = data.filter(plan => {
        if (
          plan.name && plan.name.toLowerCase().indexOf(val) >= 0 ? true : false ||
          plan.duration && plan.duration.toLowerCase().indexOf(val) >= 0 ? true : false ||
          plan.status && plan.status.toLowerCase().indexOf(val) >= 0 ?  true : false ||
          plan.createdAt && moment(plan.createdAt).format("MMM DD, YYYY").toLowerCase().indexOf(val) >= 0 ? true : false ||
          plan.createdBy && plan.createdBy.toLowerCase().indexOf(val) >= 0 ? true: false ||
          plan.price && plan.price.toString().indexOf(val) >= 0 ? true : false ||
          plan.maxNumberOfMembers && plan.maxNumberOfMembers.toString().indexOf(val) >= 0 ? true : false
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

activateCouppon(name) {
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
          this.getPlans();
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

deleteSubscription(subscription){
  swal({
    title: 'Are you sure to delete subscription plan?',
    text: 'You not be able to revert this!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Not now!',
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger mr-sm'
  }).then((result) => {
    if (result.value) {
      this.planService.deleteSubscription(subscription._id).subscribe((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.getPlans();
          swal(
            'Activated!',
            'Your have deleted subscription plan successfully.',
            'success'
          );
        }
      });

    } else if (result.dismiss) {
      swal(
        'Cancelled',
        'delettion request cancelled.)',
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
        if (response.status === 200) {
          this.getPlans();
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

openFormModal() {
  const modalRef = this.modalService.open(AddSubscriptionComponent);
  modalRef.result.then((result) => {
    this.getPlans();
  }).catch((error) => {
    this.getPlans();
  });
}

openEditFormModal(plan) {
  const modalRef = this.modalService.open(EditSubscriptionComponent);
  modalRef.componentInstance.currentPlan = plan;
  modalRef.result.then((result) => {
    this.getPlans();
  })
    .catch((error) => {
      this.getPlans();
    });
}
}
