import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PlanService } from '../../../../services/plan.service';
import { HttpResponse } from '@angular/common/http';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { FeatureService } from '../../../../services/feature.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.scss']
})
export class AddSubscriptionComponent implements OnInit {
  newPlanForm: FormGroup;
  statuss: Array<String> = ['Active', 'Inactive'];
  featureModules: any;
  duration: Array<String> = ['Yearly', 'Half Yearly', 'Quaterly', 'Monthly'];
  role: Array<Object> = [
    { 'id': 0, 'itemName': 'Buyer' },
    { 'id': 1, 'itemName': 'Supplier' },
    { 'id': 2, 'itemName': 'Agent' },
    { 'id': 3, 'itemName': 'Reseller' }];
  modulesToInclude: Array<Object> = [
    { 'id': 0, 'itemName': 'First Module' },
    { 'id': 1, 'itemName': 'Second Module' },
    { 'id': 2, 'itemName': 'Third Module' },
    { 'id': 3, 'itemName': 'Fourth Module' }];
  selectedModules: any;
  selectedRoles: any;
  settings: any;
  settings1: any;
  showMessage: any;
  constructor(
    public activeModal: NgbActiveModal,
    private planService: PlanService,
    private featureService: FeatureService
  ) { }

  ngOnInit() {
    this.settings = {
      singleSelection: true,
      text: "Select Role",
      enableSearchFilter: true,

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
    // let features = new FormArray([]);
    this.newPlanForm = new FormGroup({
      'name': new FormControl(null),
      'duration': new FormControl(null),
      'price': new FormControl(null),
      'status': new FormControl(null),
      'description': new FormControl(null),
      'rolesAllowed': new FormControl([]),
      'moduleIncluded': new FormControl([]),
      'features': new FormControl()
      // 'features': features
    })
  }

  // addNewFeature() {
  //   const control = new FormControl('');
  //   (<FormArray>this.newPlanForm.get('features')).push(control);
  // }

  addNewPlan() {
    const modulesArrary = this.newPlanForm.value.moduleIncluded;
    const rolesArray = this.newPlanForm.value.rolesAllowed;
    if (modulesArrary.length > 0) {
      modulesArrary.forEach(module => {
        module.moduleName = module.itemName;
        delete module.itemName;
      });
    }

    if (rolesArray.length > 0) {
      rolesArray.forEach(role => {
        role.roleName = role.itemName;
        delete role.itemName;
      });
    }

    console.log(this.newPlanForm.value)


    this.planService.addPlan(this.newPlanForm.value).subscribe((response: HttpResponse<any>) => {
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
      text: 'Subscription created successfully!',
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

  if(item.itemName === "Buyer" || item.itemName === "Supplier" || item.itemName === "Agent" || item.itemName === "Reseller"){
    this.featureService.getFeatureListByRole(item.itemName)
    .subscribe((response: HttpResponse<any>) => {
      if(response.status === 200){
        this.featureModules = response['data'];
        console.log("featuere module", this.featureModules)
      }
    })

  }
  }
  OnItemDeSelect(item: any) {
    this.selectedRoles = undefined;
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }
}
