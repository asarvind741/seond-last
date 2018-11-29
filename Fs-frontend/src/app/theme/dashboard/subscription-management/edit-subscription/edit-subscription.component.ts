import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import {PlanService } from '../../../../services/plan.service';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.scss']
})
export class EditSubscriptionComponent implements OnInit {
  editPlanForm: FormGroup;
  showMessage: any;
  statuss: Array<String> = ['Active', 'Inactive'];
  duration: Array<String> = ['Yearly', 'Half Yearly', 'Quarterly', 'Monthly'];
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
      settings1: any;
      settings: any;

  @Input() currentPlan;
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

  createForm(){
    let name = this.currentPlan.name ? this.currentPlan.name : '';
    let duration = this.currentPlan.duration ? this.currentPlan.duration : 'Select One';
    let price = this.currentPlan.price ? this.currentPlan.price : '';
    let description = this.currentPlan.description ? this.currentPlan.description: '';
    let status = this.currentPlan.status ? this.currentPlan.status : null;
    let maxNumberOfMembers = this.currentPlan.maxNumberOfMembers ? this.currentPlan.maxNumberOfMembers : null;
    let rolesAllowed = this.currentPlan.rolesAllowed ? this.currentPlan.rolesAllowed : null;
    let moduleIncluded = this.currentPlan.moduleIncluded ? this.currentPlan.moduleIncluded : null;
    this.selectedRoles = rolesAllowed;
    this.selectedModules = moduleIncluded;
    
    this.editPlanForm = new FormGroup({
      'name': new FormControl(name),
      'duration': new FormControl(duration),
      'price': new FormControl(price),
      'description': new FormControl(description),
      'status': new FormControl(status),
      'maxNumberOfMembers': new FormControl(maxNumberOfMembers),
      'rolesAllowed': new FormControl(rolesAllowed),
      'moduleIncluded': new FormControl(moduleIncluded)
    })
  }

  editPlan(){
    this.planService.updatePlan(this.currentPlan._id, this.editPlanForm.value)
    .subscribe((response: HttpResponse<any>) => {
      if(response.status === 200){
        this.closeModal();
        this.openSuccessSwal();
      }
    }, (error) => {
      this.closeModal();
      this.showMessage = error.error['message']
      this.openUnscuccessSwal();
    })
    
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

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  cancelNewUserAddition(){
    this.editPlanForm.reset();
    this.closeModal();
  }

  clearModal(){
    this.editPlanForm.reset();
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
