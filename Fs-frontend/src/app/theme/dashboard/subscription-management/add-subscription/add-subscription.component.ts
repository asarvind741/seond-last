import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanService } from '../../../../services/plan.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
})
export class AddSubscriptionComponent implements OnInit {
  newPlanForm: FormGroup;
  statuss: Array<String> = ['Active', 'Inactive'];
  duration: Array<String> = ['Yearly', 'Half Yearly', 'Quaterly', 'Monthly'];
  role: Array<Object> = [
    {'id': 1, 'itemName': 'Buyer' }, 
    {'id': 2, 'itemName': 'Supplier' }, 
    {'id': 3, 'itemName': 'Agent' }, 
    {'id': 4, 'itemName': 'Reseller' }];
    modulesToInclude: Array<Object> = [
      {'id': 1, 'itemName': 'First Module' }, 
      {'id': 2, 'itemName': 'Second Module' }, 
      {'id': 3, 'itemName': 'Third Module' }, 
      {'id': 4, 'itemName': 'Fourth Module' }];
  selectedModules: any;
  selectedRoles: any;
  settings:any;
  settings1: any;
  showMessage: any;
  constructor(
    public activeModal: NgbActiveModal,
    private planService: PlanService
  ) { }

  ngOnInit() {
    this.settings = {
      singleSelection: false,
      text: "Select Roles",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 3
    };

    this.settings1 = {
      singleSelection: false,
      text: "Select Modules",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 3
    };


    this.createForm();
  }

  createForm() {
    this.newPlanForm = new FormGroup({
      'name': new FormControl(null),
      'duration': new FormControl(null),
      'price': new FormControl(null),
      'status': new FormControl(null),
      'description': new FormControl(null),
      'maxNumberOfMembers': new FormControl(null),
      'rolesAllowed': new FormControl([]),
      'moduleIncluded': new FormControl([])
    })
  }

  addNewPlan() {
    console.log(this.newPlanForm.value)
    this.planService.addPlan(this.newPlanForm.value).subscribe((response: HttpResponse<any>) => {
        console.log("responseaaaaa", response);
        if (response.status === 200) {
          this.closeModal();
          this.openSuccessSwal();
        }
        else if (response.status !== 200) {
          this.closeModal();
          this.showMessage = response['date'];
          this.openUnscuccessSwal();
        }
      }, (error) => {
       
        this.closeModal();
        this.showMessage = error.error['message']
        this.openUnscuccessSwal();
      })

  }

  onSelectValue(event) {
    
  }


  openSuccessSwal() {
    swal({
      title: 'Successful!',
      text: 'User created successfully!',
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

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  cancelNewUserAddition() {
    this.newPlanForm.reset();
    this.closeModal();
  }

  clearModal() {
    this.newPlanForm.reset();
  }

  onItemSelect(item: any) {
  }
  OnItemDeSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }
}
